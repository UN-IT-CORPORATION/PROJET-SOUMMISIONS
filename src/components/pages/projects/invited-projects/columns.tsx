import React from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Project } from "@/mocks/projects"
import type { ColumnDef } from "@tanstack/react-table"
import { Link } from "@tanstack/react-router"
import type { TFunction } from "i18next"
import { SlideOver } from "@/components/common/SlideOver"
import { IntentionModal } from "./components/IntentionModal"
import { QuoteUploadForm } from "./components/QuoteUploadForm"
import { ArrowUpDown, Eye, MoreHorizontal, ThumbsUp, FilePlus } from "lucide-react"

function InvitedProjectActions({ project, t }: { project: Project; t: TFunction }) {
    const [intentionModalOpen, setIntentionModalOpen] = React.useState(false)
    const [quoteSlideOverOpen, setQuoteSlideOverOpen] = React.useState(false)

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{t("projects.actions.label")}</DropdownMenuLabel>
                    <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link
                            to="/projects/invited/view/initial-files"
                            search={{ projectId: project.id }}
                        >
                            <Eye className="mr-2 h-4 w-4" />
                            {t("projects.details.tabs.initial_files", { defaultValue: "Fichiers initiaux" })}
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => setIntentionModalOpen(true)}
                    >
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        Ajouter une intention
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => setQuoteSlideOverOpen(true)}
                    >
                        <FilePlus className="mr-2 h-4 w-4" />
                        Ajouter un devis
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <IntentionModal
                open={intentionModalOpen}
                onOpenChange={setIntentionModalOpen}
                onSubmit={(intention) => console.log("Intention submitted:", intention)}
            />

            <SlideOver
                open={quoteSlideOverOpen}
                onOpenChange={setQuoteSlideOverOpen}
                size="sm"
                title="Ajouter un devis"
                description="Uploadez votre devis pour ce projet."
                footer={
                    <div className="flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setQuoteSlideOverOpen(false)}
                            className="cursor-pointer"
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            form="quote-upload-form"
                            className="cursor-pointer"
                        >
                            Enregistrer
                        </Button>
                    </div>
                }
            >
                <QuoteUploadForm
                    onCancel={() => setQuoteSlideOverOpen(false)}
                    onSubmit={(file) => {
                        console.log("Quote uploaded:", file.name)
                        setQuoteSlideOverOpen(false)
                    }}
                />
            </SlideOver>
        </>
    )
}

export const getInvitedProjectColumns = (t: TFunction): ColumnDef<Project>[] => [
    {
        accessorKey: "id",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="cursor-pointer"
            >
                ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
    },
    {
        accessorKey: "name",
        id: "projectDetails",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="cursor-pointer"
            >
                {t("projects.columns.project_details") || "PROJETS"}
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const project = row.original

            const typeColors: Record<string, string> = {
                "Commercial": "bg-blue-50 text-blue-700 border border-blue-200",
                "Industriel léger": "bg-green-50 text-green-700 border border-green-200",
                "Industriel lourd": "bg-red-50 text-red-700 border border-red-200",
                "Industriel moyen": "bg-orange-50 text-orange-700 border border-orange-200",
                "Multirésidentiel léger": "bg-purple-50 text-purple-700 border border-purple-200",
                "Multirésidentiel lourd": "bg-indigo-50 text-indigo-700 border border-indigo-200",
                "Résidentiel": "bg-cyan-50 text-cyan-700 border border-cyan-200",
            }

            return (
                <div className="flex flex-col space-y-1">
                    <Link
                        to="/projects/invited/view/initial-files"
                        search={{ projectId: project.id }}
                        className="text-gray-900 font-bold hover:underline hover:underline-offset-2 cursor-pointer"
                    >
                        {project.name}
                    </Link>
                    <span className="text-xs text-muted-foreground">
                        Ref: {project.reference}
                    </span>
                    <span className="text-xs text-muted-foreground">
                        Période: {new Date(project.submissionPeriod.start).toLocaleDateString()} - {new Date(project.submissionPeriod.end).toLocaleDateString()}
                    </span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full w-fit ${typeColors[project.type] || "bg-gray-50 text-gray-700 border border-gray-200"}`}>
                        {project.type}
                    </span>
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
                className="cursor-pointer"
            >
                STATUT
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            const statusColors = {
                initiated: "bg-blue-100 text-blue-800",
                requested: "bg-yellow-100 text-yellow-800",
            }

            const statusLabels = {
                initiated: "Initié",
                requested: "Demandé",
            }

            return (
                <div
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${statusColors[status as keyof typeof statusColors]}`}
                >
                    {statusLabels[status as keyof typeof statusLabels]}
                </div>
            )
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="cursor-pointer"
            >
                INITIÉ LE
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt"))
            return <div>{date.toLocaleDateString()}</div>
        },
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="cursor-pointer"
            >
                MODIFIÉ LE
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const date = new Date(row.getValue("updatedAt"))
            return <div>{date.toLocaleDateString()}</div>
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => <InvitedProjectActions project={row.original} t={t} />,
    },
]
