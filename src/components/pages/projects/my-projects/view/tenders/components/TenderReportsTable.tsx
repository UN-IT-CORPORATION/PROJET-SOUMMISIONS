import React from "react"
import { DataTable } from "@/components/common/DataTable"
import type { TenderReportRow } from "@/mocks/tenderReports"
import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

const statusMeta: Record<
    TenderReportRow["status"],
    {
        label: string
        className: string
    }
> = {
    sent: { label: "Envoyé", className: "bg-green-50 text-green-700" },
    failed: { label: "Échec", className: "bg-red-50 text-red-700" },
}

 interface TenderReportsTableProps {
    data: TenderReportRow[]
    rightActions?: React.ReactNode
}

export function TenderReportsTable({ data, rightActions }: TenderReportsTableProps) {
    const columns = React.useMemo<ColumnDef<TenderReportRow>[]>(() => {
        return [
            {
                accessorKey: "intervenantName",
                header: ({ column }) => (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="cursor-pointer"
                    >
                        Nom complet
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: ({ row }) => (
                    <div className="flex flex-col">
                        <span className="font-semibold text-gray-900">{row.original.intervenantName}</span>
                        <span className="text-xs text-muted-foreground">{row.original.email}</span>
                    </div>
                ),
            },
            {
                accessorKey: "role",
                header: ({ column }) => (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="cursor-pointer"
                    >
                        Rôle
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: ({ row }) => <span className="text-sm text-gray-700">{row.original.role}</span>,
            },
            {
                accessorKey: "status",
                header: ({ column }) => (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="cursor-pointer"
                    >
                        Statut d'envoi
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: ({ row }) => {
                    const meta = statusMeta[row.original.status]
                    return (
                        <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${meta.className}`}
                        >
                            {meta.label}
                        </span>
                    )
                },
            },
        ]
    }, [])

    return (
        <DataTable
            columns={columns}
            data={data}
            searchKey="intervenantName"
            searchPlaceholder="Rechercher un intervenant..."
            rightActions={rightActions}
        />
    )
}


