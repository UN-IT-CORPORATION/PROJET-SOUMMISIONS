import { useLocation, Link } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"

export function DynamicBreadcrumb() {
    const location = useLocation()
    const { t } = useTranslation()

    const pathSegments = location.pathname.split("/").filter(Boolean)
    const hiddenSegments = new Set(["view"])

    const breadcrumbMap: Record<string, string> = {
        dashboard: t("sidebar.dashboard"),
        projects: t("sidebar.projects"),
        tenders: t("projects.details.tabs.tenders", { defaultValue: "Appels d’offres" }),
        reports: t("projects.details.tenders.reports.title", { defaultValue: "Rapports d'envoi" }),
        add: t("projects.add.breadcrumb"),
        "step-1": t("projects.add.steps.step1"),
        "step-2": t("projects.add.steps.step2"),
        "step-3": t("projects.add.steps.step3"),
        "step-4": t("projects.add.steps.step4"),
        "step-5": t("projects.add.steps.step5"),
        addendas: t("sidebar.addendas"),
        partners: t("sidebar.partners"),
        statistics: t("sidebar.statistics"),
    }

    const visibleSegments = pathSegments.reduce<{ segment: string; path: string }[]>(
        (acc, segment, index) => {
            if (hiddenSegments.has(segment)) {
                return acc
            }

            // Hide technical identifiers after a "reports" segment (e.g. tenderId)
            const last = acc[acc.length - 1]
            if (last?.segment === "reports") {
                return acc
            }

            const path = `/${pathSegments.slice(0, index + 1).join("/")}`
            acc.push({ segment, path })
            return acc
        },
        []
    )

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/dashboard" className="flex items-center gap-2">
                            <Home className="h-4 w-4" />
                            <span>{t("sidebar.dashboard")}</span>
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {visibleSegments.length > 0 && <BreadcrumbSeparator />}
                {visibleSegments.map(({ segment, path }, index) => {
                    const isLast = index === visibleSegments.length - 1
                    const label = breadcrumbMap[segment] || segment

                    return (
                        <BreadcrumbItem key={segment}>
                            {isLast ? (
                                <BreadcrumbPage>{label}</BreadcrumbPage>
                            ) : (
                                <>
                                    <BreadcrumbLink asChild>
                                        <Link to={path}>{label}</Link>
                                    </BreadcrumbLink>
                                    <BreadcrumbSeparator />
                                </>
                            )}
                        </BreadcrumbItem>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
