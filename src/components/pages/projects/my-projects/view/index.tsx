import React from "react"
import { Outlet, useLocation, useNavigate } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import { TabsNav } from "@/components/common/TabsNav"
import { DynamicBreadcrumb } from "@/components/layout/DynamicBreadcrumb"
import { mockTenders } from "@/mocks/tenders"

type ProjectViewSearch = {
    projectId?: string
    tenderName?: string
}

export function ProjectViewLayout() {
    const { t } = useTranslation()
    const location = useLocation()
    const navigate = useNavigate()
    const searchParams = location.search as ProjectViewSearch

    const tabs = React.useMemo(
        () => [
            { value: "dashboard", label: t("projects.details.tabs.dashboard", { defaultValue: "Dashboard" }) },
            { value: "initial-files", label: t("projects.details.tabs.initial_files", { defaultValue: "Fichier initiaux" }) },
            { value: "submissions", label: t("projects.details.tabs.submissions", { defaultValue: "Soumission" }) },
            { value: "intervenants", label: t("projects.details.tabs.intervenants", { defaultValue: "Intervenants" }) },
            { value: "service-requests", label: t("projects.details.tabs.service_requests", { defaultValue: "Demande de services" }) },
            {
                value: "revit",
                label: t("projects.details.tabs.revit_takeoff", { defaultValue: "REVIT & TAKE-OFF" }),
            },
            {
                value: "tenders",
                label: t("projects.details.tabs.tenders", { defaultValue: "Appels d’offres" }),
            },
            {
                value: "addendas",
                label: t("projects.details.tabs.addendas", { defaultValue: "Addendas" }),
            },
        ],
        [t]
    )

    const activeTab = React.useMemo(() => {
        if (location.pathname.includes("/dashboard")) return "dashboard"
        if (location.pathname.includes("/initial-files")) return "initial-files"
        if (location.pathname.includes("/submissions")) return "submissions"
        if (location.pathname.includes("/intervenants")) return "intervenants"
        if (location.pathname.includes("/service-requests")) return "service-requests"
        if (location.pathname.includes("/revit")) return "revit"
        if (location.pathname.includes("/tenders")) return "tenders"
        if (location.pathname.includes("/addendas")) return "addendas"
        return "dashboard"
    }, [location.pathname])

    const handleTabChange = (value: string) => {
        navigate({
            to: `/projects/view/${value}`,
            search: searchParams ?? {},
        })
    }

    const projectLabel = searchParams?.projectId ?? t("projects.details.project_placeholder")
    const isTenderReportsPage = location.pathname.includes("/tenders/reports/")
    const tenderIdFromPath = isTenderReportsPage ? location.pathname.split("/").pop() : undefined
    const tenderNameFromSearch = searchParams?.tenderName
    const tenderName = tenderNameFromSearch ?? mockTenders.find((tender) => tender.id === tenderIdFromPath)?.name

    const pageTitle = React.useMemo(() => {
        if (activeTab === "intervenants")
            return t("projects.details.page_titles.intervenants", {
                id: projectLabel,
                defaultValue: `Intervenants du projet : ${projectLabel}`,
            })
        if (activeTab === "initial-files")
            return t("projects.details.page_titles.initial_files", {
                id: projectLabel,
                defaultValue: `Fichier initiaux : ${projectLabel}`,
            })
        if (activeTab === "submissions")
            return t("projects.details.page_titles.submissions", {
                id: projectLabel,
                defaultValue: `Soumissions du projet : ${projectLabel}`,
            })
        if (activeTab === "service-requests")
            return t("projects.details.page_titles.service_requests", {
                id: projectLabel,
                defaultValue: `Demande de services : ${projectLabel}`,
            })
        if (activeTab === "revit")
            return t("projects.details.page_titles.revit", {
                id: projectLabel,
                defaultValue: `REVIT & TAKE-OFF : ${projectLabel}`,
            })
        if (activeTab === "tenders") {
            if (isTenderReportsPage) {
                return t("projects.details.page_titles.tenders_reports", {
                    tender: tenderName ?? projectLabel,
                    defaultValue: "Rapports d'envoi : {{tender}}",
                })
            }
            return t("projects.details.page_titles.tenders", {
                id: projectLabel,
                defaultValue: `Appels d'offres : ${projectLabel}`,
            })
        }
        if (activeTab === "addendas")
            return t("projects.details.page_titles.addendas", {
                id: projectLabel,
                defaultValue: `Addendas du projet : ${projectLabel}`,
            })
        if (activeTab === "dashboard")
            return t("projects.details.page_titles.dashboard", {
                id: projectLabel,
                defaultValue: `Tableau de bord du projet : ${projectLabel}`,
            })
        return t("projects.details.page_titles.dashboard", {
            id: projectLabel,
            defaultValue: `Tableau de bord du projet : ${projectLabel}`,
        })
    }, [activeTab, projectLabel, t])

    return (
        <div className="space-y-5">
            <div className="space-y-3">
                <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
                <DynamicBreadcrumb />
            </div>
            <TabsNav tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
            <Outlet />
        </div>
    )
}
