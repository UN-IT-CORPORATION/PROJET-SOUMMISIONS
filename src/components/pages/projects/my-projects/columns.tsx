import React from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Project } from "@/mocks/projects"
import type { ColumnDef } from "@tanstack/react-table"
import { Link } from "@tanstack/react-router"
import type { TFunction } from "i18next"
import { ArrowUpDown, Eye, MoreVertical, Pencil, Trash2 } from "lucide-react"
import { DeleteConfirmationModal } from "@/components/common/DeleteConfirmationModal"

export const getProjectColumns = (t: TFunction): ColumnDef<Project>[] => [
    {
        accessorKey: "id",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="cursor-pointer -ml-4 hover:bg-gray-100"
            >
                ID
                <ArrowUpDown className="ml-2 h-3.5 w-3.5 text-gray-400" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="font-mono text-sm font-medium text-gray-600  px-2 py-1 rounded w-fit">
                {row.getValue("id")}
            </div>
        ),
    },
    {
        accessorKey: "name",
        id: "projectDetails",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="cursor-pointer -ml-4 hover:bg-gray-100"
            >
                {t("projects.columns.project_details") || "PROJETS"}
                <ArrowUpDown className="ml-2 h-3.5 w-3.5 text-gray-400" />
            </Button>
        ),
        cell: ({ row }) => {
            const project = row.original

            const typeColors: Record<string, string> = {
                "Commercial": "bg-blue-50 text-blue-700 border-blue-300",
                "Industriel léger": "bg-emerald-50 text-emerald-700 border-emerald-300",
                "Industriel lourd": "bg-red-50 text-red-700 border-red-300",
                "Industriel moyen": "bg-orange-50 text-orange-700 border-orange-300",
                "Multirésidentiel léger": "bg-purple-50 text-purple-700 border-purple-300",
                "Multirésidentiel lourd": "bg-indigo-50 text-indigo-700 border-indigo-300",
                "Résidentiel": "bg-cyan-50 text-cyan-700 border-cyan-300",
            }

            return (
                <div className="flex flex-col gap-2 py-1">
                    <Link
                        to="/projects/view/dashboard"
                        search={{ projectId: project.id }}
                        className="text-gray-900 font-medium text-lg cursor-pointer"
                    >
                        {project.name}
                    </Link>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                        <span className="font-medium">Période :</span>
                        <span>{new Date(project.submissionPeriod.start).toLocaleDateString()} - {new Date(project.submissionPeriod.end).toLocaleDateString()}</span>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium border w-fit ${typeColors[project.type] || "bg-gray-50 text-gray-700 border-gray-300"}`}>
                        {project.type}
                    </span>
                </div>
            )
        },
    },
    {
        accessorKey: "reference",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="cursor-pointer -ml-4 hover:bg-gray-100"
            >
                RÉFÉRENCE
                <ArrowUpDown className="ml-2 h-3.5 w-3.5 text-gray-400" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="font-mono text-sm font-medium text-gray-600">
                {row.getValue("reference")}
            </div>
        ),
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="cursor-pointer -ml-4 hover:bg-gray-100"
            >
                INITIÉ LE
                <ArrowUpDown className="ml-2 h-3.5 w-3.5 text-gray-400" />
            </Button>
        ),
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt"))
            return (
                <div className="text-sm text-gray-600">
                    {date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                </div>
            )
        },
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="cursor-pointer -ml-4 hover:bg-gray-100"
            >
                MODIFIÉ LE
                <ArrowUpDown className="ml-2 h-3.5 w-3.5 text-gray-400" />
            </Button>
        ),
        cell: ({ row }) => {
            const date = new Date(row.getValue("updatedAt"))
            return (
                <div className="text-sm text-gray-600">
                    {date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                </div>
            )
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="cursor-pointer -ml-4 hover:bg-gray-100"
            >
                STATUT
                <ArrowUpDown className="ml-2 h-3.5 w-3.5 text-gray-400" />
            </Button>
        ),
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            const statusConfig = {
                initiated: {
                    bg: "bg-blue-50",
                    text: "text-blue-700",
                    dot: "bg-blue-500",
                    border: "border-blue-300",
                    label: "Initié"
                },
                requested: {
                    bg: "bg-amber-50",
                    text: "text-amber-700",
                    dot: "bg-amber-500",
                    border: "border-amber-300",
                    label: "Demandé"
                },
            }

            const config = statusConfig[status as keyof typeof statusConfig]

            return (
                <div
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-medium border ${config?.bg} ${config?.text} ${config?.border}`}
                >
                    <span className={`h-1.5 w-1.5 rounded-full ${config?.dot}`} />
                    {config?.label}
                </div>
            )
        },
    },
    {
        id: "actions",
        header: () => <span className="text-xs font-semibold text-gray-500">ACTION</span>,
        enableHiding: false,
        cell: ({ row }) => {
            const project = row.original
            const [deleteModalOpen, setDeleteModalOpen] = React.useState(false)

            const handleDelete = () => {
                // TODO: Implement delete logic
                console.log("Deleting project:", project.id)
            }

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button 
                                variant="ghost" 
                                className="h-8 w-8 p-0 cursor-pointer hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4 text-gray-500" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{t("projects.actions.label")}</DropdownMenuLabel>
                            <DropdownMenuItem className="cursor-pointer" asChild>
                                <Link
                                    to="/projects/view/dashboard"
                                    search={{ projectId: project.id }}
                                >
                                    <Eye className="mr-2 h-4 w-4" />
                                    {t("projects.actions.dashboard", { defaultValue: "Tableau de bord" })}
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" asChild>
                                <Link
                                    to="/projects/add/step-1"
                                    search={{ projectId: project.id }}
                                >
                                    <Pencil className="mr-2 h-4 w-4" />
                                    {t("projects.actions.edit")}
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-red-600 cursor-pointer"
                                onClick={() => setDeleteModalOpen(true)}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                {t("projects.actions.delete")}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DeleteConfirmationModal
                        open={deleteModalOpen}
                        onOpenChange={setDeleteModalOpen}
                        onConfirm={handleDelete}
                        title="Supprimer le projet"
                        description="Êtes-vous sûr de vouloir supprimer ce projet ?"
                        itemName={project.name}
                    />
                </>
            )
        },
    },
]
