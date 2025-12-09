import React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeleteConfirmationModal } from "@/components/common/DeleteConfirmationModal"
import { ArrowUpDown, MoreHorizontal, Repeat, Trash2, FileText } from "lucide-react"
import type { TFunction } from "i18next"
import type { Tender } from "@/mocks/tenders"

const statusColorMap: Record<
    Tender["status"],
    {
        label: string
        className: string
    }
> = {
    sent: { label: "Envoyé", className: "bg-green-50 text-green-700" },
    failed: { label: "Échec", className: "bg-red-50 text-red-700" },
}

export function getTenderColumns(
    onResend: (tender: Tender) => void,
    onDelete: (tender: Tender) => void,
    t: TFunction,
    onNameClick?: (tender: Tender) => void,
    onViewReports?: (tender: Tender) => void
) {
    const columns: ColumnDef<Tender>[] = [
        {
            accessorKey: "name",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="cursor-pointer"
                >
                    {t("projects.details.tenders.columns.name", { defaultValue: "Nom de l'appel" })}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <button
                    type="button"
                    onClick={() => onNameClick?.(row.original)}
                    className="font-semibold text-gray-900 transition hover:text-gray-900 hover:underline hover:underline-offset-2 text-left cursor-pointer"
                >
                    {row.original.name}
                </button>
            ),
        },
        {
            accessorKey: "date",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="cursor-pointer"
                >
                    {t("projects.details.tenders.columns.date", { defaultValue: "Date" })}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <span className="text-sm text-gray-700">{row.original.date}</span>,
        },
        {
            accessorKey: "status",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="cursor-pointer"
                >
                    {t("projects.details.tenders.columns.status", { defaultValue: "Statut" })}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const meta = statusColorMap[row.original.status]
                return (
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${meta.className}`}>
                        {meta.label}
                    </span>
                )
            },
        },
        {
            accessorKey: "intervenantCount",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="cursor-pointer"
                >
                    {t("projects.details.tenders.columns.intervenants", { defaultValue: "Intervenants" })}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <span className="text-sm text-gray-700">{row.original.intervenantCount}</span>,
        },
        {
            id: "actions",
            enableHiding: false,
            header: undefined,
            cell: ({ row }) => {
                const tender = row.original
                const [deleteOpen, setDeleteOpen] = React.useState(false)

                const handleConfirmDelete = () => {
                    onDelete(tender)
                    setDeleteOpen(false)
                }

                return (
                    <>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                    {t("projects.details.tenders.columns.actions", { defaultValue: "Actions" })}
                                </DropdownMenuLabel>
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    onClick={() => onViewReports?.(tender)}
                                >
                                    <FileText className="mr-2 h-4 w-4" />
                                    {t("projects.details.tenders.actions.report", { defaultValue: "Rapports" })}
                                </DropdownMenuItem>
                                {tender.status === "failed" && (
                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                        onClick={() => onResend(tender)}
                                    >
                                        <Repeat className="mr-2 h-4 w-4" />
                                        {t("projects.details.tenders.actions.resend", { defaultValue: "Renvoyer" })}
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={() => setDeleteOpen(true)}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    {t("projects.details.tenders.actions.delete", { defaultValue: "Supprimer" })}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DeleteConfirmationModal
                            open={deleteOpen}
                            onOpenChange={setDeleteOpen}
                            onConfirm={handleConfirmDelete}
                            title={t("projects.details.tenders.actions.delete", { defaultValue: "Supprimer" })}
                            description={t("projects.details.tenders.delete_confirm", {
                                defaultValue: "Êtes-vous sûr de vouloir supprimer cet appel d’offres ?",
                            })}
                            itemName={tender.name}
                        />
                    </>
                )
            },
        },
    ]

    return columns
}


