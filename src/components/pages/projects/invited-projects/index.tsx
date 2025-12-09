import React from "react"
import { useTranslation } from "react-i18next"
import { DynamicBreadcrumb } from "@/components/layout/DynamicBreadcrumb"
import { DataTable } from "@/components/common/DataTable"
import { DateFilterModal } from "@/components/common/DateFilterModal"
import { mockProjects } from "@/mocks/projects"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getInvitedProjectColumns } from "./columns"

interface DateFilters {
    createdStart?: Date
    createdEnd?: Date
    modifiedStart?: Date
    modifiedEnd?: Date
    submissionStart?: Date
    submissionEnd?: Date
}

export function InvitedProjectsPage() {
    const { t } = useTranslation()
    const [statusFilter, setStatusFilter] = React.useState<string>("all")
    const [typeFilter, setTypeFilter] = React.useState<string>("all")
    const [dateFilters, setDateFilters] = React.useState<DateFilters>({})
    const columns = React.useMemo(() => getInvitedProjectColumns(t), [t])

    const filteredProjects = mockProjects.filter((project) => {
        const matchesStatus = statusFilter === "all" || project.status === statusFilter
        const matchesType = typeFilter === "all" || project.type === typeFilter

        // Date filters
        const createdDate = new Date(project.createdAt)
        const modifiedDate = new Date(project.updatedAt)
        const submissionStartDate = new Date(project.submissionPeriod.start)
        const submissionEndDate = new Date(project.submissionPeriod.end)

        const matchesCreatedStart = !dateFilters.createdStart || createdDate >= dateFilters.createdStart
        const matchesCreatedEnd = !dateFilters.createdEnd || createdDate <= dateFilters.createdEnd
        const matchesModifiedStart = !dateFilters.modifiedStart || modifiedDate >= dateFilters.modifiedStart
        const matchesModifiedEnd = !dateFilters.modifiedEnd || modifiedDate <= dateFilters.modifiedEnd
        const matchesSubmissionStart = !dateFilters.submissionStart || submissionStartDate >= dateFilters.submissionStart
        const matchesSubmissionEnd = !dateFilters.submissionEnd || submissionEndDate <= dateFilters.submissionEnd

        return matchesStatus && matchesType &&
            matchesCreatedStart && matchesCreatedEnd &&
            matchesModifiedStart && matchesModifiedEnd &&
            matchesSubmissionStart && matchesSubmissionEnd
    })

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 mb-2">{t("sidebar.invited_projects")}</h1>
                    <DynamicBreadcrumb />
                </div>
            </div>
            <DataTable
                columns={columns}
                data={filteredProjects}
                searchKey="name"
                searchPlaceholder="projects.search_placeholder"
                dateFilterAction={
                    <DateFilterModal onApplyFilters={setDateFilters} />
                }
                rightActions={
                    <div className="flex gap-2">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[200px] cursor-pointer bg-white">
                                <SelectValue placeholder={t("projects.filters.status_placeholder")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all" className="cursor-pointer">
                                    {t("projects.filters.status_all")}
                                </SelectItem>
                                <SelectItem value="initiated" className="cursor-pointer">
                                    Initié
                                </SelectItem>
                                <SelectItem value="requested" className="cursor-pointer">
                                    Demandé
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={typeFilter} onValueChange={setTypeFilter}>
                            <SelectTrigger className="w-[200px] cursor-pointer bg-white">
                                <SelectValue placeholder="Filtrer par type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all" className="cursor-pointer">
                                    Tous les types
                                </SelectItem>
                                <SelectItem value="Commercial" className="cursor-pointer">
                                    Commercial
                                </SelectItem>
                                <SelectItem value="Industriel léger" className="cursor-pointer">
                                    Industriel léger
                                </SelectItem>
                                <SelectItem value="Industriel lourd" className="cursor-pointer">
                                    Industriel lourd
                                </SelectItem>
                                <SelectItem value="Industriel moyen" className="cursor-pointer">
                                    Industriel moyen
                                </SelectItem>
                                <SelectItem value="Multirésidentiel léger" className="cursor-pointer">
                                    Multirésidentiel léger
                                </SelectItem>
                                <SelectItem value="Multirésidentiel lourd" className="cursor-pointer">
                                    Multirésidentiel lourd
                                </SelectItem>
                                <SelectItem value="Résidentiel" className="cursor-pointer">
                                    Résidentiel
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                }
            />
        </div>
    )
}
