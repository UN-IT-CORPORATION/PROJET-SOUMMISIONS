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
import { Eye, MoreHorizontal, Trash2, ArrowUpDown } from "lucide-react"
import type { TFunction } from "i18next"

export type Intervenant = {
    id: string
    fullName: string
    email: string
    phone: string
    role: string
    services: { label: string; color?: string }[]
}

const roleColorMap: Record<string, string> = {
    "Chef de projet": "bg-red-50 text-red-700",
    Coordinateur: "bg-blue-50 text-blue-700",
    Analyste: "bg-green-50 text-green-700",
}

export const getIntervenantColumns = (
    t: TFunction,
    onViewDetails?: (intervenant: Intervenant) => void
): ColumnDef<Intervenant>[] => [
        {
            accessorKey: "fullName",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="cursor-pointer"
                >
                    {t("projects.details.intervenants.columns.name", { defaultValue: "Nom complet" })}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            filterFn: (row, _columnId, value) => {
                if (!value) return true
                const haystack = `${row.original.fullName} ${row.original.email}`.toLowerCase()
                return haystack.includes((value as string).toLowerCase())
            },
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="font-semibold text-gray-900">{row.original.fullName}</span>
                    <span className="text-xs text-muted-foreground">{row.original.email}</span>
                </div>
            ),
        },
        {
            accessorKey: "phone",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="cursor-pointer"
                >
                    {t("projects.details.intervenants.columns.phone", { defaultValue: "Téléphone" })}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <span className="text-sm text-gray-700">{row.original.phone}</span>,
        },
        {
            accessorKey: "role",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="cursor-pointer"
                >
                    {t("projects.details.intervenants.columns.role", { defaultValue: "Poste" })}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const classes =
                    roleColorMap[row.original.role] ?? "bg-gray-100 text-gray-700"
                return (
                    <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${classes}`}
                    >
                        {row.original.role}
                    </span>
                )
            },
        },
        {
            id: "actions",
            enableHiding: false,
            header: undefined,
            cell: ({ row }) => {
                const intervenant = row.original
                const [isDeleteOpen, setIsDeleteOpen] = React.useState(false)

                const handleDelete = () => {
                    // TODO: replace with actual delete logic
                    console.log("Deleting intervenant", intervenant.id)
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
                                    {t("projects.details.intervenants.columns.actions", { defaultValue: "Actions" })}
                                </DropdownMenuLabel>
                                <DropdownMenuItem className="cursor-pointer" onClick={() => onViewDetails?.(intervenant)}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    {t("projects.details.intervenants.actions.details", { defaultValue: "Détails" })}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="text-red-600 cursor-pointer"
                                    onClick={() => setIsDeleteOpen(true)}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    {t("projects.details.intervenants.actions.delete", { defaultValue: "Supprimer" })}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DeleteConfirmationModal
                            open={isDeleteOpen}
                            onOpenChange={setIsDeleteOpen}
                            onConfirm={handleDelete}
                            title={t("projects.details.intervenants.actions.delete", { defaultValue: "Supprimer" })}
                            description={t("projects.details.intervenants.delete_confirm", {
                                defaultValue: "Êtes-vous sûr de vouloir retirer cet intervenant ?",
                            })}
                            itemName={intervenant.fullName}
                        />
                    </>
                )
            },
        },
    ]

