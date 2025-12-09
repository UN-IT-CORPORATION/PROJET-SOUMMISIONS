import React from "react"
import { useTranslation } from "react-i18next"
import { DynamicBreadcrumb } from "@/components/layout/DynamicBreadcrumb"
import { ResourceCardGrid } from "@/components/common/ResourceCardGrid"
import type { ResourceCard } from "@/components/common/ResourceCardGrid"
import { mockAddendaResources } from "@/mocks/addendaResources"
import { SlideOver } from "@/components/common/SlideOver"
import { AddendaUploadForm } from "./components/AddendaUploadForm"

export function AddendasPage() {
    const { t } = useTranslation()
    const [isUploadOpen, setUploadOpen] = React.useState(false)

    const handleUploadClick = () => setUploadOpen(true)

    const handleOpen = (resource: ResourceCard) => {
        console.info("Open resource", resource.id)
    }

    const handleDelete = (resource: ResourceCard) => {
        console.info("Delete resource", resource.id)
    }

    return (
        <div className="space-y-6">
            <ResourceCardGrid
                resources={mockAddendaResources}
                searchPlaceholder={t("addendas.search_placeholder", {
                    defaultValue: "Rechercher un addenda...",
                })}
                filterLabel={t("addendas.filter_label", { defaultValue: "Type de fichier" })}
                projectFilterLabel={t("addendas.project_filter_label", { defaultValue: "Type de projet" })}
                onUploadClick={handleUploadClick}
                onOpenResource={handleOpen}
                onDeleteResource={handleDelete}
            />

            <SlideOver
                open={isUploadOpen}
                onOpenChange={setUploadOpen}
                size="sm"
                title="Uploader un addenda"
                description="Ajoutez un document addenda pour un projet spécifique."
            >
                <AddendaUploadForm
                    open={isUploadOpen}
                    onCancel={() => setUploadOpen(false)}
                    onSubmit={(payload) => {
                        console.info("Submit upload", payload.file.name, payload.type, payload.division)
                        setUploadOpen(false)
                    }}
                />
            </SlideOver>
        </div>
    )
}
