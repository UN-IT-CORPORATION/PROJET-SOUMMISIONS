import React from "react"
import { useTranslation } from "react-i18next"
import { ResourceCardGrid } from "@/components/common/ResourceCardGrid"
import type { ResourceCard } from "@/components/common/ResourceCardGrid"
import { mockInitialFilesResources } from "@/mocks/initialFilesResources"
import { SlideOver } from "@/components/common/SlideOver"
import { InitialFilesUploadForm } from "@/components/pages/projects/my-projects/view/initial-files/InitialFilesUploadForm"

export function InvitedProjectViewInitialFilesPage() {
    const { t } = useTranslation()
    const [isUploadOpen, setUploadOpen] = React.useState(false)

    const handleUploadClick = () => setUploadOpen(true)

    const handleOpen = (resource: ResourceCard) => {
        console.info("Open resource", resource.id)
    }

    return (
        <div className="space-y-6">
            <ResourceCardGrid
                resources={mockInitialFilesResources}
                searchPlaceholder={t("projects.details.initial_files.search_placeholder", {
                    defaultValue: "Rechercher un fichier initial...",
                })}
                filterLabel={t("projects.details.initial_files.filter_label", { defaultValue: "Type de fichier" })}
                onUploadClick={handleUploadClick}
                onOpenResource={handleOpen}
            />

            <SlideOver
                open={isUploadOpen}
                onOpenChange={setUploadOpen}
                size="sm"
                title="Uploader un fichier"
                description="Ajoutez les devis, plans et documents techniques nécessaires pour compléter le dossier du projet."
            >
                <InitialFilesUploadForm onCancel={() => setUploadOpen(false)} />
            </SlideOver>
        </div>
    )
}
