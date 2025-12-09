import { useTranslation } from "react-i18next"
import { ResourceCardGrid } from "@/components/common/ResourceCardGrid"
import type { ResourceCard } from "@/components/common/ResourceCardGrid"
import { mockInitialFilesResources } from "@/mocks/initialFilesResources"

export function InvitedProjectViewQuotesPage() {
    const { t } = useTranslation()

    const handleOpen = (resource: ResourceCard) => {
        console.info("Open quote", resource.id)
    }

    const handleDelete = (resource: ResourceCard) => {
        console.info("Delete quote", resource.id)
    }

    return (
        <div className="space-y-6">
            <ResourceCardGrid
                resources={mockInitialFilesResources}
                searchPlaceholder={t("projects.details.quotes.search_placeholder", {
                    defaultValue: "Rechercher un devis...",
                })}
                filterLabel={t("projects.details.quotes.filter_label", { defaultValue: "Type de fichier" })}
                onOpenResource={handleOpen}
                onDeleteResource={handleDelete}
            />
        </div>
    )
}
