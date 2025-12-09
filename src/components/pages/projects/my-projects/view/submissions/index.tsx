import React from "react"
import { useTranslation } from "react-i18next"
import { DataTable } from "@/components/common/DataTable"
import { mockSubmissions, type Submission, type SubmissionIntention } from "@/mocks/submissions"
import { getSubmissionColumns } from "./columns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ProjectViewSubmissionsPage() {
    const { t } = useTranslation()
    const [submissions] = React.useState<Submission[]>(mockSubmissions)
    const [intentionFilter, setIntentionFilter] = React.useState<"all" | SubmissionIntention>("all")
    const [quoteTypeFilter, setQuoteTypeFilter] = React.useState<"all" | string>("all")

    const columns = React.useMemo(() => getSubmissionColumns(t), [t])

    const searchPlaceholder = t("projects.details.submissions.search", {
        defaultValue: "Rechercher une soumission...",
    })

    const filteredSubmissions = React.useMemo(() => {
        return submissions.filter((s) => {
            if (intentionFilter !== "all" && s.intention !== intentionFilter) return false
            if (quoteTypeFilter !== "all" && !s.quotes.some((q) => q.type === quoteTypeFilter)) return false
            return true
        })
    }, [submissions, intentionFilter, quoteTypeFilter])

    const availableQuoteTypes = React.useMemo(() => {
        const set = new Set<string>()
        submissions.forEach((s) => {
            s.quotes.forEach((q) => {
                if (q.type) set.add(q.type)
            })
        })
        return Array.from(set)
    }, [submissions])

    const intentionFilterControl = (
        <Select
            value={intentionFilter}
            onValueChange={(value) => setIntentionFilter(value as typeof intentionFilter)}
        >
            <SelectTrigger className="w-[200px] bg-white">
                <SelectValue
                    placeholder={t("projects.details.submissions.filters.intention_placeholder", {
                        defaultValue: "Filtrer par intention",
                    })}
                />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all" className="cursor-pointer">
                    {t("projects.details.submissions.filters.intention_all", { defaultValue: "Toutes les intentions" })}
                </SelectItem>
                <SelectItem value="yes" className="cursor-pointer">
                    {t("projects.details.submissions.filters.intention_yes", { defaultValue: "Oui" })}
                </SelectItem>
                <SelectItem value="no" className="cursor-pointer">
                    {t("projects.details.submissions.filters.intention_no", { defaultValue: "Non" })}
                </SelectItem>
                <SelectItem value="maybe" className="cursor-pointer">
                    {t("projects.details.submissions.filters.intention_maybe", { defaultValue: "Peut-être" })}
                </SelectItem>
            </SelectContent>
        </Select>
    )

    const quoteFilterControl = (
        <Select
            value={quoteTypeFilter}
            onValueChange={(value) => setQuoteTypeFilter(value as typeof quoteTypeFilter)}
        >
            <SelectTrigger className="w-[200px] bg-white">
                <SelectValue
                    placeholder={t("projects.details.submissions.filters.quote_placeholder", {
                        defaultValue: "Filtrer par devis",
                    })}
                />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all" className="cursor-pointer">
                    {t("projects.details.submissions.filters.quote_all", { defaultValue: "Tous les types de devis" })}
                </SelectItem>
                {availableQuoteTypes.map((type) => (
                    <SelectItem key={type} value={type} className="cursor-pointer">
                        {type}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )

    return (
        <div className="space-y-6">
            <DataTable
                columns={columns}
                data={filteredSubmissions}
                searchKey="name"
                searchPlaceholder={searchPlaceholder}
                rightActions={
                    <div className="flex flex-wrap items-center gap-2">
                        {intentionFilterControl}
                        {quoteFilterControl}
                    </div>
                }
            />
        </div>
    )
}


