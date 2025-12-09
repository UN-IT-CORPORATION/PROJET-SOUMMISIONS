import React from "react"
import { Outlet, useLocation, useNavigate } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import { TabsNav } from "@/components/common/TabsNav"
import { DynamicBreadcrumb } from "@/components/layout/DynamicBreadcrumb"

type ProjectViewSearch = {
    projectId?: string
}

export function InvitedProjectViewLayout() {
    const { t } = useTranslation()
    const location = useLocation()
    const navigate = useNavigate()
    const searchParams = location.search as ProjectViewSearch

    const tabs = React.useMemo(
        () => [
            { value: "initial-files", label: t("projects.details.tabs.initial_files", { defaultValue: "Fichier initiaux" }) },
            // { value: "submissions", label: t("projects.details.tabs.submissions", { defaultValue: "Soumission" }) },
            {
                value: "revit",
                label: t("projects.details.tabs.revit_takeoff", { defaultValue: "REVIT & TAKE-OFF" }),
            },
            { value: "quotes", label: t("projects.details.tabs.quotes", { defaultValue: "Devis" }) },
            {
                value: "addendas",
                label: t("projects.details.tabs.addendas", { defaultValue: "Addendas" }),
            },
        ],
        [t]
    )

    const activeTab = React.useMemo(() => {
        if (location.pathname.includes("/initial-files")) return "initial-files"
        if (location.pathname.includes("/submissions")) return "submissions"
        if (location.pathname.includes("/revit")) return "revit"
        if (location.pathname.includes("/quotes")) return "quotes"
        if (location.pathname.includes("/addendas")) return "addendas"
        return "initial-files"
    }, [location.pathname])

    const handleTabChange = (value: string) => {
        navigate({
            to: `/projects/invited/view/${value}`,
            search: searchParams ?? {},
        })
    }

    const projectLabel = searchParams?.projectId ?? t("projects.details.project_placeholder")

    const pageTitle = React.useMemo(() => {
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
        if (activeTab === "revit")
            return t("projects.details.page_titles.revit", {
                id: projectLabel,
                defaultValue: `REVIT & TAKE-OFF : ${projectLabel}`,
            })
        if (activeTab === "quotes")
            return t("projects.details.page_titles.quotes", {
                id: projectLabel,
                defaultValue: `Devis : ${projectLabel}`,
            })
        if (activeTab === "addendas")
            return t("projects.details.page_titles.addendas", {
                id: projectLabel,
                defaultValue: `Addendas du projet : ${projectLabel}`,
            })
        return t("projects.details.page_titles.initial_files", {
            id: projectLabel,
            defaultValue: `Fichier initiaux : ${projectLabel}`,
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
