import React from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/common/DataTable"
import { mockTenders, type Tender } from "@/mocks/tenders"
import { getTenderColumns } from "./columns"
import { useNavigate } from "@tanstack/react-router"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TenderDateFilterModal, type TenderDateFilters } from "./TenderDateFilterModal"
import { endOfMonth, startOfDay, startOfMonth, subDays } from "date-fns"

export function ProjectViewTendersPage() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [tenders, setTenders] = React.useState<Tender[]>(mockTenders)
    const [statusFilter, setStatusFilter] = React.useState<"all" | "sent" | "failed">("all")
    const [quickDateFilter, setQuickDateFilter] = React.useState<
        "all" | "today" | "last_7_days" | "this_month" | "this_semester"
    >("all")
    const [dateFilters, setDateFilters] = React.useState<TenderDateFilters>({})

    const handleResend = React.useCallback((tender: Tender) => {
        console.info("Resend tender", tender.id)
    }, [])

    const handleDelete = React.useCallback((tender: Tender) => {
        setTenders((prev) => prev.filter((item) => item.id !== tender.id))
    }, [])

    const handleNameClick = React.useCallback((tender: Tender) => {
        console.info("Open tender", tender.id)
    }, [])

    const handleViewReports = React.useCallback(
        (tender: Tender) => {
            navigate({
                to: "/projects/view/tenders/reports/$tenderId",
                params: { tenderId: tender.id },
                search: (prev) => ({
                    ...(prev ?? {}),
                    tenderName: tender.name,
                }),
            })
        },
        [navigate]
    )

    const columns = React.useMemo(
        () => getTenderColumns(handleResend, handleDelete, t, handleNameClick, handleViewReports),
        [handleResend, handleDelete, handleNameClick, handleViewReports, t]
    )

    React.useEffect(() => {
        if (quickDateFilter === "all") {
            // Ne rien imposer, on garde soit aucune période, soit le custom du modal
            return
        }

        const now = new Date()
        const todayStart = startOfDay(now)

        if (quickDateFilter === "today") {
            setDateFilters({ start: todayStart, end: todayStart })
            return
        }

        if (quickDateFilter === "last_7_days") {
            const from = startOfDay(subDays(now, 6))
            setDateFilters({ start: from, end: todayStart })
            return
        }

        if (quickDateFilter === "this_month") {
            const monthStart = startOfMonth(now)
            const monthEnd = endOfMonth(now)
            setDateFilters({ start: monthStart, end: monthEnd })
            return
        }

        if (quickDateFilter === "this_semester") {
            const currentMonth = now.getMonth() // 0-11
            const isFirstSemester = currentMonth <= 5 // Janvier (0) à Juin (5)

            const semesterStart = isFirstSemester
                ? new Date(now.getFullYear(), 0, 1)
                : new Date(now.getFullYear(), 6, 1)

            const semesterEnd = isFirstSemester
                ? new Date(now.getFullYear(), 5, 30, 23, 59, 59, 999)
                : new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999)

            setDateFilters({ start: semesterStart, end: semesterEnd })
        }
    }, [quickDateFilter])

    const parseFrenchDate = React.useCallback((value: string) => {
        const [day, monthRaw, year] = value.split(" ")
        if (!day || !monthRaw || !year) return null
        const monthKey = monthRaw.replace(".", "").toLowerCase()
        const monthMap: Record<string, number> = {
            janv: 0,
            févr: 1,
            fevr: 1,
            mars: 2,
            avr: 3,
            mai: 4,
            juin: 5,
            juil: 6,
            août: 7,
            aout: 7,
            sept: 8,
            oct: 9,
            nov: 10,
            déc: 11,
            dec: 11,
        }
        const monthIndex = monthMap[monthKey]
        if (monthIndex === undefined) return null
        return new Date(Number(year), monthIndex, Number(day))
    }, [])

    const filteredTenders = React.useMemo(() => {
        let result = statusFilter === "all" ? tenders : tenders.filter((tender) => tender.status === statusFilter)

        if (!dateFilters.start && !dateFilters.end) {
            return result
        }

        const endOfDay = (date: Date) =>
            new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999)

        return result.filter((tender) => {
            const parsedDate = parseFrenchDate(tender.date)
            if (!parsedDate) return false

            if (dateFilters.start && parsedDate < dateFilters.start) {
                return false
            }

            if (dateFilters.end && parsedDate > endOfDay(dateFilters.end)) {
                return false
            }

            return true
        })
    }, [tenders, statusFilter, dateFilters, parseFrenchDate])

    const sendButton = (
        <Button
            className="cursor-pointer"
            onClick={() =>
                navigate({
                    to: "/projects/view/tenders/send",
                })
            }
        >
            {t("projects.details.tenders.send_button", { defaultValue: "Envoyer un appel d'offres" })}
        </Button>
    )

    const statusFilterControl = (
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as typeof statusFilter)}>
            <SelectTrigger className="w-[180px] bg-white">
                <SelectValue
                    placeholder={t("projects.details.tenders.filter_placeholder", {
                        defaultValue: "Filtrer par statut",
                    })}
                />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all" className="cursor-pointer">
                    {t("projects.details.tenders.status.all", { defaultValue: "Tous les statuts" })}
                </SelectItem>
                <SelectItem value="sent" className="cursor-pointer">
                    {t("projects.details.tenders.status.sent", { defaultValue: "Envoyé" })}
                </SelectItem>
                <SelectItem value="failed" className="cursor-pointer">
                    {t("projects.details.tenders.status.failed", { defaultValue: "Échec" })}
                </SelectItem>
            </SelectContent>
        </Select>
    )

    const quickDateFilterControl = (
        <Select
            value={quickDateFilter}
            onValueChange={(value) => setQuickDateFilter(value as typeof quickDateFilter)}
        >
            <SelectTrigger className="w-[200px] bg-white">
                <SelectValue
                    placeholder={t("projects.details.tenders.date_filter_placeholder", {
                        defaultValue: "Filtrer par période",
                    })}
                />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all" className="cursor-pointer">
                    {t("projects.details.tenders.date.all", { defaultValue: "Toutes les périodes" })}
                </SelectItem>
                <SelectItem value="today" className="cursor-pointer">
                    {t("projects.details.tenders.date.today", { defaultValue: "Aujourd'hui" })}
                </SelectItem>
                <SelectItem value="last_7_days" className="cursor-pointer">
                    {t("projects.details.tenders.date.last_7_days", { defaultValue: "7 derniers jours" })}
                </SelectItem>
                <SelectItem value="this_month" className="cursor-pointer">
                    {t("projects.details.tenders.date.this_month", { defaultValue: "Ce mois-ci" })}
                </SelectItem>
                <SelectItem value="this_semester" className="cursor-pointer">
                    {t("projects.details.tenders.date.this_semester", { defaultValue: "Ce semestre" })}
                </SelectItem>
            </SelectContent>
        </Select>
    )

    const searchPlaceholder = t("projects.details.tenders.search", {
        defaultValue: "Rechercher un appel d'offres...",
    })

    return (
        <div className="space-y-6">

            <DataTable
                columns={columns}
                data={filteredTenders}
                searchKey="name"
                searchPlaceholder={searchPlaceholder}
                rightActions={
                    <div className="flex flex-wrap items-center gap-2">
                        {statusFilterControl}
                        {quickDateFilterControl}
                    </div>
                }
                dateFilterAction={
                    <TenderDateFilterModal
                        onApplyFilters={(filters) => {
                            setDateFilters(filters)
                            setQuickDateFilter("all")
                        }}
                    />
                }
                topRightAction={sendButton}
            />
        </div>
    )
}


