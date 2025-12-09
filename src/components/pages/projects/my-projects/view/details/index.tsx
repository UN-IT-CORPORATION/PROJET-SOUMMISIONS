import { useTranslation } from "react-i18next"
import { Card } from "@/components/ui/card"

export function ProjectViewDetailsPage() {
    const { t } = useTranslation()

    return (
        <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">{t("projects.details.sections.overview.title")}</h2>
            <p className="text-sm text-muted-foreground">
                {t("projects.details.sections.overview.description")}
            </p>
        </Card>
    )
}

