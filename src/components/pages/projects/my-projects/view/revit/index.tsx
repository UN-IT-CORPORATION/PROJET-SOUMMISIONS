import React from "react"
import { useTranslation } from "react-i18next"
import { ResourceCardGrid } from "@/components/common/ResourceCardGrid"
import type { ResourceCard } from "@/components/common/ResourceCardGrid"
import { mockRevitResources } from "@/mocks/revitResources"
import { SlideOver } from "@/components/common/SlideOver"
import { RevitUploadForm } from "./components/RevitUploadForm"

export function ProjectViewRevitTakeoffPage() {
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
                resources={mockRevitResources}
                searchPlaceholder={t("projects.details.revit.search_placeholder", {
                    defaultValue: "Rechercher un document REVIT...",
                })}
                filterLabel={t("projects.details.revit.filter_label", { defaultValue: "Type de fichier" })}
                onUploadClick={handleUploadClick}
                onOpenResource={handleOpen}
                onDeleteResource={handleDelete}
            />

            <SlideOver
                open={isUploadOpen}
                onOpenChange={setUploadOpen}
                size="sm"
                title="Uploader un fichier"
                description="Ajoutez un modèle REVIT ou un fichier take-off."
            >
                <RevitUploadForm
                    open={isUploadOpen}
                    onCancel={() => setUploadOpen(false)}
                    onSubmit={(payload) => {
                        console.info("Submit upload", payload.file.name, payload.division)
                        setUploadOpen(false)
                    }}
                />
            </SlideOver>
        </div>
    )
}


