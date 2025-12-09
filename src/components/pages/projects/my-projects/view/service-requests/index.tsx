import React from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/common/DataTable"
import { getServiceRequestColumns } from "@/components/pages/projects/my-projects/view/service-requests/columns"
import { mockServiceRequests } from "@/mocks/serviceRequests"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const serviceTypes = [
    "AMIANTE",
    "ATTESTATION DE CONFORMITÉ",
    "DIAGNOSTIC ÉLECTRIQUE",
    "PLOMB",
    "GAZ",
    "TERMITES",
    "DPE",
    "CARREZ",
    "BOUTIN",
]

export function ProjectViewServiceRequestsPage() {
    const { t } = useTranslation()
    const [clientTypeFilter, setClientTypeFilter] = React.useState<string | undefined>("all")
    const [salesStatusFilter, setSalesStatusFilter] = React.useState<string | undefined>("all")
    const [isDialogOpen, setDialogOpen] = React.useState(false)
    const [selectedServiceType, setSelectedServiceType] = React.useState<string>("")

    const handleAddNew = () => {
        setSelectedServiceType("")
        setDialogOpen(true)
    }

    const columns = React.useMemo(() => getServiceRequestColumns(t, () => { }), [t])

    const filteredRequests = React.useMemo(() => {
        let filtered = mockServiceRequests

        if (clientTypeFilter && clientTypeFilter !== "all") {
            filtered = filtered.filter((request) => request.clientType === clientTypeFilter)
        }

        if (salesStatusFilter && salesStatusFilter !== "all") {
            filtered = filtered.filter((request) => request.salesStatus === salesStatusFilter)
        }

        return filtered
    }, [clientTypeFilter, salesStatusFilter])

    const handleDialogClose = () => {
        setDialogOpen(false)
        setSelectedServiceType("")
    }

    const handleFormSubmit = () => {
        // TODO: Handle service request submission
        console.log("Submitting service request with type:", selectedServiceType)
        setDialogOpen(false)
        setSelectedServiceType("")
    }

    return (
        <>
            <div className="space-y-6">
                <DataTable
                    columns={columns}
                    data={filteredRequests}
                    searchKey="service"
                    searchPlaceholder="projects.details.service_requests.search_placeholder"
                    rightActions={
                        <div className="flex gap-2">
                            <Select value={clientTypeFilter} onValueChange={setClientTypeFilter}>
                                <SelectTrigger className="min-w-[200px] bg-white">
                                    <SelectValue
                                        placeholder={t("projects.details.service_requests.client_type_filter_placeholder", {
                                            defaultValue: "Tous les types",
                                        })}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        {t("projects.details.service_requests.client_type.all", { defaultValue: "Tous les types" })}
                                    </SelectItem>
                                    <SelectItem value="entreprise">Entreprise</SelectItem>
                                    <SelectItem value="particulier">Particulier</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={salesStatusFilter} onValueChange={setSalesStatusFilter}>
                                <SelectTrigger className="min-w-[200px] bg-white">
                                    <SelectValue
                                        placeholder={t("projects.details.service_requests.sales_status_filter_placeholder", {
                                            defaultValue: "Tous les statuts",
                                        })}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        {t("projects.details.service_requests.sales_status.all", { defaultValue: "Tous les statuts" })}
                                    </SelectItem>
                                    <SelectItem value="sold">Vendu</SelectItem>
                                    <SelectItem value="not-sold">Non vendu</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    }
                    topRightAction={
                        <Button className="gap-2 cursor-pointer" onClick={handleAddNew}>
                            {t("projects.details.service_requests.add_button", { defaultValue: "Ajouter un service" })}
                            <Plus className="h-4 w-4" />
                        </Button>
                    }
                />
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>
                            {t("projects.details.service_requests.dialog.add_title", { defaultValue: "Ajouter un service" })}
                        </DialogTitle>
                        <DialogDescription>
                            {t("projects.details.service_requests.dialog.description", {
                                defaultValue: "Sélectionnez le type de service à ajouter au projet.",
                            })}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="service-type">
                                Type de service <span className="text-red-500">*</span>
                            </Label>
                            <Select value={selectedServiceType} onValueChange={setSelectedServiceType}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Sélectionner un service" />
                                </SelectTrigger>
                                <SelectContent>
                                    {serviceTypes.map((service) => (
                                        <SelectItem key={service} value={service}>
                                            {service}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={handleDialogClose}>
                            {t("common.cancel", { defaultValue: "Annuler" })}
                        </Button>
                        <Button onClick={handleFormSubmit} disabled={!selectedServiceType}>
                            {t("common.create", { defaultValue: "Créer" })}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
