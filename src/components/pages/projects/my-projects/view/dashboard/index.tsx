import { KPICard } from "@/components/common/KPICard"
import { ClipboardList, CheckCircle2, XCircle, HelpCircle } from "lucide-react"

const kpiItems = [
    {
        title: "Nombre de soumission",
        value: "32",
        icon: ClipboardList,
        color: "indigo" as const,
    },
    {
        title: "Nombre de OUI",
        value: "12",
        icon: CheckCircle2,
        color: "green" as const,
    },
    {
        title: "Nombre de NON",
        value: "8",
        icon: XCircle,
        color: "red" as const,
    },
    {
        title: "Nombre de peut être",
        value: "5",
        icon: HelpCircle,
        color: "orange" as const,
    },
]

export function ProjectDashboardCardPage() {
    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {kpiItems.map((kpi) => (
                    <KPICard key={kpi.title} {...kpi} />
                ))}
            </div>
        </div>
    )
}

