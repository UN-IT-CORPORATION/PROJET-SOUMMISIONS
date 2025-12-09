import { useTranslation } from "react-i18next"
import { ResourceCardGrid } from "@/components/common/ResourceCardGrid"
import type { ResourceCard } from "@/components/common/ResourceCardGrid"
import { mockRevitResources } from "@/mocks/revitResources"

export function InvitedProjectViewRevitTakeoffPage() {
    const { t } = useTranslation()

    const handleOpen = (resource: ResourceCard) => {
        console.info("Open resource", resource.id)
    }

    return (
        <div className="space-y-6">
            <ResourceCardGrid
                resources={mockRevitResources}
                searchPlaceholder={t("projects.details.revit.search_placeholder", {
                    defaultValue: "Rechercher un document REVIT...",
                })}
                filterLabel={t("projects.details.revit.filter_label", { defaultValue: "Type de fichier" })}
                onOpenResource={handleOpen}
            />
        </div>
    )
}
