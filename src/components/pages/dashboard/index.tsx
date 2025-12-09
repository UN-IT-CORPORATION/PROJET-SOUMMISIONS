import { useTranslation } from "react-i18next"
import { DynamicBreadcrumb } from "@/components/layout/DynamicBreadcrumb"
import { KPICard } from "@/components/common/KPICard"
import { dashboardKPIs } from "@/mocks/dashboard"

export function DashboardPage() {
    const { t } = useTranslation()

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-bold text-gray-900 mb-2">{t("sidebar.dashboard")}</h1>
                <DynamicBreadcrumb />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {dashboardKPIs.map((kpi, index) => (
                    <KPICard
                        key={index}
                        title={kpi.title}
                        value={kpi.value}
                        icon={kpi.icon}
                        color={kpi.color}
                    />
                ))}
            </div>
        </div>
    )
}
