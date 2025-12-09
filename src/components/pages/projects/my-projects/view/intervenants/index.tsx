import React from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/DataTable"
import { getIntervenantColumns } from "./columns"
import { mockIntervenants } from "@/mocks/intervenants"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { IntervenantAssignForm } from "./components/IntervenantAssignForm"
import { IntervenantDetailModal } from "./components/IntervenantDetailModal"
import type { Intervenant } from "./columns"

export function ProjectViewIntervenantsPage() {
    const { t } = useTranslation()
    const [roleFilter, setRoleFilter] = React.useState<string | undefined>("all")
    const [isModalOpen, setModalOpen] = React.useState(false)
    const [selectedIds, setSelectedIds] = React.useState<string[]>([])
    const [selectedRole, setSelectedRole] = React.useState<string | undefined>(undefined)
    const [detailIntervenant, setDetailIntervenant] = React.useState<Intervenant | null>(null)
    const handleViewDetails = React.useCallback((intervenant: Intervenant) => {
        setDetailIntervenant(intervenant)
    }, [])
    const columns = React.useMemo(() => getIntervenantColumns(t, handleViewDetails), [t, handleViewDetails])

    const filteredIntervenants = React.useMemo(() => {
        if (!roleFilter || roleFilter === "all") return mockIntervenants
        return mockIntervenants.filter((intervenant) => intervenant.role === roleFilter)
    }, [roleFilter])

    const selectOptions = React.useMemo(
        () =>
            mockIntervenants.map((intervenant) => ({
                value: intervenant.id,
                label: intervenant.fullName,
            })),
        []
    )

    const handleSelectionChange = (ids: string[]) => setSelectedIds(ids)
    const handleModalClose = () => {
        setModalOpen(false)
        setSelectedRole(undefined)
        setSelectedIds([])
    }
    const handleFormSubmit = () => {
        // TODO: Handle assignment with selectedIds and selectedRole
        console.log("Assigning", selectedIds, "with role", selectedRole)
        setModalOpen(false)
        setSelectedRole(undefined)
        setSelectedIds([])
    }
    const handleDetailClose = () => setDetailIntervenant(null)

    return (
        <>
            <div className="space-y-6">
                <DataTable
                    columns={columns}
                    data={filteredIntervenants}
                    searchKey="fullName"
                    searchPlaceholder="projects.details.intervenants.search_placeholder"
                    rightActions={
                        <Select value={roleFilter} onValueChange={setRoleFilter}>
                            <SelectTrigger className="min-w-[200px] bg-white">
                                <SelectValue
                                    placeholder={t("projects.details.intervenants.role_filter_placeholder", {
                                        defaultValue: "Filtrer par poste",
                                    })}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    {t("projects.details.intervenants.roles.all", { defaultValue: "Tous les postes" })}
                                </SelectItem>
                                <SelectItem value="Chef de projet">Chef de projet</SelectItem>
                                <SelectItem value="Coordinateur">Coordinateur</SelectItem>
                                <SelectItem value="Analyste">Analyste</SelectItem>
                            </SelectContent>
                        </Select>
                    }
                    topRightAction={
                        <Button className="gap-2 cursor-pointer" onClick={() => setModalOpen(true)}>
                            {t("projects.details.intervenants.add_button", { defaultValue: "Ajouter un intervenant" })}
                            <Plus className="h-4 w-4" />
                        </Button>
                    }
                />
            </div>

            <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {t("projects.details.intervenants.modal.title", { defaultValue: "Sélectionner des intervenants" })}
                        </DialogTitle>
                        <DialogDescription>
                            {t("projects.details.intervenants.modal.description", {
                                defaultValue: "Choisissez les intervenants à associer à ce projet.",
                            })}
                        </DialogDescription>
                    </DialogHeader>
                    <IntervenantAssignForm
                        t={t}
                        options={selectOptions}
                        selectedIds={selectedIds}
                        onChange={handleSelectionChange}
                        selectedRole={selectedRole}
                        onRoleChange={setSelectedRole}
                    />
                    <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" onClick={handleModalClose}>
                            {t("common.cancel", { defaultValue: "Annuler" })}
                        </Button>
                        <Button onClick={handleFormSubmit}>{t("common.save", { defaultValue: "Enregistrer" })}</Button>
                    </div>
                </DialogContent>
            </Dialog>

            <IntervenantDetailModal
                open={Boolean(detailIntervenant)}
                onOpenChange={(open) => {
                    if (!open) {
                        handleDetailClose()
                    }
                }}
                intervenant={detailIntervenant}
            />
        </>
    )
}

