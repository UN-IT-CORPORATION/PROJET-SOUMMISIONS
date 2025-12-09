import React from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "@tanstack/react-router"
import { mockTenderReports } from "@/mocks/tenderReports"
import { TenderReportsTable } from "../components/TenderReportsTable"
import { TenderReportsChart } from "../components/TenderReportsChart"
import { KPICard } from "@/components/common/KPICard"
import { Users, CheckCircle2, XCircle, TrendingUp } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ProjectViewTenderReportsPage() {
    const { t } = useTranslation()
    const { tenderId } = useParams({
        from: "/dashboard/projects/view/tenders/reports/$tenderId" as any,
    }) as { tenderId: string }

    const [statusFilter, setStatusFilter] = React.useState<"all" | "sent" | "failed">("all")
    const [roleFilter, setRoleFilter] = React.useState<string>("all")

    const reportRows = React.useMemo(
        () => mockTenderReports.filter((row) => row.tenderId === tenderId),
        [tenderId]
    )

    const filteredRows = React.useMemo(() => {
        return reportRows.filter((row) => {
            const matchStatus = statusFilter === "all" || row.status === statusFilter
            const matchRole = roleFilter === "all" || row.role === roleFilter
            return matchStatus && matchRole
        })
    }, [reportRows, statusFilter, roleFilter])

    const uniqueRoles = React.useMemo(() => Array.from(new Set(reportRows.map((row) => row.role))), [reportRows])

    const totalCount = reportRows.length
    const successCount = reportRows.filter((row) => row.status === "sent").length
    const failedCount = reportRows.filter((row) => row.status === "failed").length
    const successRate = totalCount ? Math.round((successCount / totalCount) * 100) : 0
    const failureRate = totalCount ? Math.round((failedCount / totalCount) * 100) : 0

    const statusFilterControl = (
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as typeof statusFilter)}>
            <SelectTrigger className="w-[180px] bg-white">
                <SelectValue
                    placeholder={t("projects.details.tenders.reports.filter_placeholder", {
                        defaultValue: "Filtrer par statut",
                    })}
                />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all" className="cursor-pointer">
                    {t("projects.details.tenders.reports.status.all", { defaultValue: "Tous les statuts" })}
                </SelectItem>
                <SelectItem value="sent" className="cursor-pointer">
                    {t("projects.details.tenders.reports.status.sent", { defaultValue: "Envoyé" })}
                </SelectItem>
                <SelectItem value="failed" className="cursor-pointer">
                    {t("projects.details.tenders.reports.status.failed", { defaultValue: "Échec" })}
                </SelectItem>
            </SelectContent>
        </Select>
    )

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

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="grid gap-3 md:grid-cols-4">
                    <KPICard
                        title={t("projects.details.tenders.reports.kpi_total", {
                            defaultValue: "Intervenants ciblés",
                        })}
                        value={totalCount}
                        icon={Users}
                        color="indigo"
                    />
                    <KPICard
                        title={t("projects.details.tenders.reports.kpi_success", {
                            defaultValue: "Succès",
                        })}
                        value={successCount}
                        icon={CheckCircle2}
                        description={`${successRate}% ${t("projects.details.tenders.reports.kpi_success_desc", {
                            defaultValue: "des envois",
                        })}`}
                        color="green"
                    />
                    <KPICard
                        title={t("projects.details.tenders.reports.kpi_failed", {
                            defaultValue: "Échecs",
                        })}
                        value={failedCount}
                        icon={XCircle}
                        description={`${failureRate}% ${t("projects.details.tenders.reports.kpi_failed_desc", {
                            defaultValue: "des envois",
                        })}`}
                        color="red"
                    />
                    <KPICard
                        title={t("projects.details.tenders.reports.kpi_global_rate", {
                            defaultValue: "Taux de succès global",
                        })}
                        value={`${successRate}%`}
                        icon={TrendingUp}
                        description={t("projects.details.tenders.reports.kpi_global_rate_desc", {
                            defaultValue: "Sur l'ensemble des intervenants ciblés",
                        })}
                        color="cyan"
                    />
                </div>
            </div>

            <TenderReportsChart data={reportRows} />

            <div className="space-y-1">
                <h3 className="text-base font-semibold text-gray-900">
                    {t("projects.details.tenders.reports.intervenants_title", {
                        defaultValue: "Liste des intervenants",
                    })}
                </h3>
                <p className="text-xs text-muted-foreground">
                    {t("projects.details.tenders.reports.intervenants_description", {
                        defaultValue: "Détail des statuts d'envoi pour chaque intervenant ciblé par cet appel d'offres.",
                    })}
                </p>
            </div>

            <TenderReportsTable
                data={filteredRows}
                rightActions={
                    <div className="flex flex-wrap items-center gap-2">
                        {statusFilterControl}
                        {roleFilterControl}
                    </div>
                }
            />
        </div>
    )
}


