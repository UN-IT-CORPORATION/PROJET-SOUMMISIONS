import React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { useTranslation } from "react-i18next"
import { DataTable } from "@/components/common/DataTable"
import { getIntervenantColumns, type Intervenant } from "../../intervenants/columns"
import { mockIntervenants } from "@/mocks/intervenants"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SendTenderModal } from "./SendTenderModal"

export function ProjectViewTenderSendPage() {
    const { t } = useTranslation()
    const [selectedIds, setSelectedIds] = React.useState<string[]>([])
    const [roleFilter, setRoleFilter] = React.useState<string>("all")
    const [isModalOpen, setIsModalOpen] = React.useState(false)

    const baseColumns = React.useMemo(() => getIntervenantColumns(t), [t])

    const toggleSelection = (id: string) => {
        setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
    }

    const uniqueRoles = React.useMemo(
        () => Array.from(new Set(mockIntervenants.map((intervenant) => intervenant.role))),
        []
    )

    const filteredIntervenants = React.useMemo(() => {
        if (roleFilter === "all") return mockIntervenants
        return mockIntervenants.filter((intervenant) => intervenant.role === roleFilter)
    }, [roleFilter])

    const columns = React.useMemo<ColumnDef<Intervenant>[]>(() => {
        const withoutActions = baseColumns.filter((col) => col.id !== "actions")
        const allSelected =
            filteredIntervenants.length > 0 &&
            filteredIntervenants.every((intervenant) => selectedIds.includes(intervenant.id))
        const isIndeterminate = selectedIds.length > 0 && !allSelected

        return [
            {
                id: "select",
                header: () => (
                    <div className="pl-5">
                        <Checkbox
                            className="cursor-pointer"
                            checked={allSelected ? true : isIndeterminate ? "indeterminate" : false}
                            onCheckedChange={() => {
                                if (allSelected) {
                                    setSelectedIds((prev) =>
                                        prev.filter((id) => !filteredIntervenants.some((i) => i.id === id))
                                    )
                                } else {
                                    const newIds = filteredIntervenants.map((i) => i.id)
                                    setSelectedIds((prev) => Array.from(new Set([...prev, ...newIds])))
                                }
                            }}
                        />
                    </div>
                ),
                cell: ({ row }) => (
                    <div className="px-2">
                        <Checkbox
                            className="cursor-pointer"
                            checked={selectedIds.includes(row.original.id)}
                            onCheckedChange={() => toggleSelection(row.original.id)}
                        />
                    </div>
                ),
                enableSorting: false,
                enableHiding: false,
            },
            ...withoutActions,
        ]
    }, [baseColumns, filteredIntervenants, selectedIds])

    const roleFilterControl = (
        <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[200px] bg-white">
                <SelectValue
                    placeholder={t("projects.details.tenders.reports.role_placeholder", {
                        defaultValue: "Filtrer par rôle",
                    })}
                />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all" className="cursor-pointer">
                    {t("projects.details.tenders.reports.role.all", { defaultValue: "Tous les rôles" })}
                </SelectItem>
                {uniqueRoles.map((role) => (
                    <SelectItem key={role} value={role} className="cursor-pointer">
                        {role}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )

    const hasSelection = selectedIds.length > 0

    const handleSendClick = () => {
        setIsModalOpen(true)
    }

    const handleConfirmSend = (
        tenderName: string,
        type: "fourniseur" | "appel_offres_devis_projets"
    ) => {
        console.info("Sending tender:", tenderName, "type:", type, "to intervenants:", selectedIds)
        // Ici, vous pouvez ajouter la logique pour envoyer l'appel d'offres en fonction du type
        setSelectedIds([])
    }

    const sendButton = (
        <Button className="cursor-pointer" disabled={!hasSelection} onClick={handleSendClick}>
            {t("projects.details.tenders.send.confirm_button", {
                defaultValue: "Envoyer l'appel d'offres",
            })}
        </Button>
    )

    return (
        <div className="space-y-6">
            <DataTable
                columns={columns}
                data={filteredIntervenants}
                searchKey="fullName"
                searchPlaceholder={t("projects.details.intervenants.search_placeholder", {
                    defaultValue: "Rechercher un intervenant...",
                })}
                rightActions={roleFilterControl}
                topRightAction={sendButton}
            />

            <SendTenderModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                onConfirm={handleConfirmSend}
            />
        </div>
    )
}


