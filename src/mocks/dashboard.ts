import { FolderOpen, FileText, FilePlus, PieChart } from "lucide-react"

export const dashboardKPIs = [
    {
        title: "Nombre de projet",
        value: "12",
        icon: FolderOpen,
        color: "blue" as const
    },
    {
        title: "Nombre de soumission",
        value: "45",
        icon: FileText,
        color: "green" as const
    },
    {
        title: "Addendas",
        value: "3",
        icon: FilePlus,
        color: "orange" as const
    },
    {
        title: "Taux de participation",
        value: "85%",
        icon: PieChart,
        color: "purple" as const
    }
]
