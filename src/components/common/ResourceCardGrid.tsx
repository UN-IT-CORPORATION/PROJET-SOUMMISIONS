import React from "react"
import {
    Search,
    UploadCloud,
    MoreHorizontal,
    FileText,
    FileSpreadsheet,
    FileCode,
    FileImage,
    ExternalLink,
    Trash2,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeleteConfirmationModal } from "@/components/common/DeleteConfirmationModal"

type FileType = "pdf" | "excel" | "cad" | "image" | "other"

export interface ResourceCard {
    id: string
    name: string
    sizeLabel: string
    type: FileType
    addedAt: string
    fileName?: string
    division?: string
    projectName?: string
}

interface ResourceCardGridProps {
    resources: ResourceCard[]
    searchPlaceholder?: string
    filterLabel?: string
    projectFilterLabel?: string
    onUploadClick?: () => void
    onOpenResource?: (resource: ResourceCard) => void
    onDeleteResource?: (resource: ResourceCard) => void
    pageSizeOptions?: number[]
}

const fileTypeMetadata: Record<
    FileType,
    {
        label: string
        bgClass: string
        icon: React.ComponentType<{ className?: string }>
    }
> = {
    cad: { label: "REVIT / CAD", bgClass: "bg-blue-50 text-blue-600", icon: FileCode },
    pdf: { label: "PDF", bgClass: "bg-red-50 text-red-600", icon: FileText },
    excel: { label: "Excel (XLS/XLSX)", bgClass: "bg-green-50 text-green-600", icon: FileSpreadsheet },
    image: { label: "Images (PNG/JPG)", bgClass: "bg-amber-50 text-amber-600", icon: FileImage },
    other: { label: "Autres (ZIP/DOC)", bgClass: "bg-gray-100 text-gray-700", icon: FileText },
}

const filterTypeOrder: FileType[] = ["cad", "pdf", "excel", "image", "other"]

export function ResourceCardGrid({
    resources,
    searchPlaceholder = "Rechercher un document...",
    filterLabel = "Type de fichier",
    projectFilterLabel,
    onUploadClick,
    onOpenResource,
    onDeleteResource,
    pageSizeOptions = [6, 12, 24],
}: ResourceCardGridProps) {
    const [searchTerm, setSearchTerm] = React.useState("")
    const [fileType, setFileType] = React.useState<string>("all")
    const [projectFilter, setProjectFilter] = React.useState<string>("all")
    const [pageSize, setPageSize] = React.useState(pageSizeOptions[0] ?? 6)
    const [page, setPage] = React.useState(1)
    const [resourceToDelete, setResourceToDelete] = React.useState<ResourceCard | null>(null)

    const typeOptions = filterTypeOrder.filter((type) => resources.some((resource) => resource.type === type))

    const projectOptions = React.useMemo(() => {
        const projects = resources
            .map((resource) => resource.projectName)
            .filter((name): name is string => Boolean(name))
        return Array.from(new Set(projects)).sort()
    }, [resources])

    const filteredResources = React.useMemo(() => {
        return resources.filter((resource) => {
            const displayName = (resource.fileName ?? resource.name).toLowerCase()
            const matchSearch = displayName.includes(searchTerm.toLowerCase())
            const matchType = fileType === "all" ? true : resource.type === fileType
            const matchProject = projectFilter === "all" ? true : resource.projectName === projectFilter
            return matchSearch && matchType && matchProject
        })
    }, [resources, searchTerm, fileType, projectFilter])

    const totalPages = Math.max(1, Math.ceil(filteredResources.length / pageSize))
    const currentPage = Math.min(page, totalPages)
    const paginatedResources = React.useMemo(() => {
        const start = (currentPage - 1) * pageSize
        const end = start + pageSize
        return filteredResources.slice(start, end)
    }, [filteredResources, currentPage, pageSize])

    const paginationRange = React.useMemo<(number | "dots")[]>(() => {
        if (totalPages <= 1) return [1]

        const delta = 1
        const range: number[] = []

        for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
            if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - delta && pageNumber <= currentPage + delta)
            ) {
                range.push(pageNumber)
            }
        }

        const rangeWithDots: (number | "dots")[] = []
        let previous: number | undefined

        for (const pageNumber of range) {
            if (previous !== undefined) {
                if (pageNumber - previous === 2) {
                    rangeWithDots.push(previous + 1)
                } else if (pageNumber - previous > 2) {
                    rangeWithDots.push("dots")
                }
            }

            rangeWithDots.push(pageNumber)
            previous = pageNumber
        }

        return rangeWithDots
    }, [currentPage, totalPages])

    const goToPage = (pageNumber: number) => {
        const nextPage = Math.min(Math.max(pageNumber, 1), totalPages)
        setPage(nextPage)
    }

    React.useEffect(() => {
        setPage(1)
    }, [searchTerm, fileType, projectFilter, pageSize])

    const handleDeleteConfirm = () => {
        if (resourceToDelete && onDeleteResource) {
            onDeleteResource(resourceToDelete)
        }
        setResourceToDelete(null)
    }

    const handleOpenResource = (resource: ResourceCard) => {
        if (onOpenResource) {
            onOpenResource(resource)
        } else {
            console.info("Open resource", resource.id)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder={searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white pl-9 md:w-[307px] lg:w-[407px]"
                    />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Select value={fileType} onValueChange={setFileType}>
                        <SelectTrigger className="w-[180px] bg-white">
                            <SelectValue placeholder={filterLabel} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all" className="cursor-pointer">
                                Tous les types
                            </SelectItem>
                            {typeOptions.map((type) => (
                                <SelectItem key={type} value={type} className="cursor-pointer">
                                    {fileTypeMetadata[type]?.label ?? type}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {projectFilterLabel && projectOptions.length > 0 && (
                        <Select value={projectFilter} onValueChange={setProjectFilter}>
                            <SelectTrigger className="w-[220px] bg-white">
                                <SelectValue placeholder={projectFilterLabel} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all" className="cursor-pointer">
                                    Tous les projets
                                </SelectItem>
                                {projectOptions.map((project) => (
                                    <SelectItem key={project} value={project} className="cursor-pointer">
                                        {project}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                    {onUploadClick && (
                        <Button type="button" className="gap-2 cursor-pointer" onClick={onUploadClick}>
                            <UploadCloud className="h-4 w-4" />
                            Upload
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
                {paginatedResources.map((resource) => {
                    const meta = fileTypeMetadata[resource.type] ?? fileTypeMetadata.other
                    const Icon = meta.icon
                    const displayName = resource.fileName ?? resource.name

                    return (
                        <div
                            key={resource.id}
                            className="flex flex-col justify-between rounded-md border border-border bg-white shadow-sm transition hover:shadow-md"
                        >
                            <div className="flex items-start justify-between gap-3 p-4">
                                <div className="space-y-1">
                                    <p className="font-semibold text-gray-900 break-words">{displayName}</p>
                                    <p className="text-xs text-muted-foreground">{resource.sizeLabel}</p>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                            className="cursor-pointer gap-2"
                                            onClick={() => handleOpenResource(resource)}
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                            Ouvrir
                                        </DropdownMenuItem>
                                        {onDeleteResource && (
                                            <DropdownMenuItem
                                                className="text-red-600 cursor-pointer gap-2"
                                                onClick={() => setResourceToDelete(resource)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                Supprimer
                                            </DropdownMenuItem>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div className="flex flex-1 items-center justify-center">
                                <div className={`flex h-40 w-full items-center justify-center ${meta.bgClass}`}>
                                    <Icon className="h-12 w-12" />
                                </div>
                            </div>

                            <div className="text-sm text-muted-foreground p-4 space-y-1">
                                <p className="font-medium text-gray-900">Ajouté le {resource.addedAt}</p>
                                {resource.type !== "cad" && (
                                    <p className="text-xs text-muted-foreground">
                                        Division : {resource.division ?? "N/A"}
                                    </p>
                                )}
                            </div>
                        </div>
                    )
                })}
                {paginatedResources.length === 0 && (
                    <div className="col-span-full rounded-2xl border border-dashed border-border bg-white p-10 text-center text-sm text-muted-foreground">
                        Aucun document ne correspond à votre recherche.
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <p className="text-sm text-muted-foreground">
                    Affichage {(currentPage - 1) * pageSize + 1}-
                    {Math.min(currentPage * pageSize, filteredResources.length)} sur {filteredResources.length} documents
                </p>
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-6">
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">Lignes par pages</p>
                        <Select value={String(pageSize)} onValueChange={(value) => setPageSize(Number(value))}>
                            <SelectTrigger className="h-8 w-[90px] bg-white cursor-pointer">
                                <SelectValue placeholder={pageSize} />
                            </SelectTrigger>
                            <SelectContent>
                                {pageSizeOptions.map((option) => (
                                    <SelectItem key={option} value={String(option)} className="cursor-pointer">
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-white text-muted-foreground transition-colors hover:text-primary hover:border-primary disabled:cursor-not-allowed disabled:text-muted-foreground disabled:opacity-50 disabled:hover:border-border cursor-pointer"
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            aria-label="Page précédente"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        {paginationRange.map((item, index) =>
                            item === "dots" ? (
                                <span key={`dots-${index}`} className="px-2 text-sm font-medium text-muted-foreground">
                                    ...
                                </span>
                            ) : (
                                <button
                                    type="button"
                                    key={item}
                                    className={`flex h-8 w-8 items-center justify-center rounded-md border text-sm font-medium transition-colors cursor-pointer ${item === currentPage
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : "border-border bg-white text-muted-foreground hover:text-primary hover:border-primary"
                                        }`}
                                    onClick={() => goToPage(item)}
                                    aria-current={item === currentPage ? "page" : undefined}
                                >
                                    {item}
                                </button>
                            )
                        )}
                        <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-white text-muted-foreground transition-colors hover:text-primary hover:border-primary disabled:cursor-not-allowed disabled:text-muted-foreground disabled:opacity-50 disabled:hover:border-border cursor-pointer"
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            aria-label="Page suivante"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            <DeleteConfirmationModal
                open={Boolean(resourceToDelete)}
                onOpenChange={(open) => !open && setResourceToDelete(null)}
                onConfirm={handleDeleteConfirm}
                title="Supprimer le document"
                description={`Êtes-vous sûr de vouloir supprimer « ${resourceToDelete?.name ?? ""} » ?`}
                itemName={resourceToDelete?.name ?? ""}
            />
        </div>
    )
}


