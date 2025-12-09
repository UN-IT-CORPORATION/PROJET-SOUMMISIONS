import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface KPICardProps {
    title: string
    value: string | number
    icon: LucideIcon
    description?: string
    color?: "blue" | "green" | "orange" | "purple" | "red" | "indigo" | "cyan"
    className?: string
}

const colorStyles = {
    blue: {
        bg: "bg-blue-50/50",
        text: "text-blue-700",
        iconBg: "bg-blue-100",
        border: "border-blue-200",
    },
    green: {
        bg: "bg-green-50/50",
        text: "text-green-700",
        iconBg: "bg-green-100",
        border: "border-green-200",
    },
    orange: {
        bg: "bg-orange-50/50",
        text: "text-orange-700",
        iconBg: "bg-orange-100",
        border: "border-orange-200",
    },
    purple: {
        bg: "bg-purple-50/50",
        text: "text-purple-700",
        iconBg: "bg-purple-100",
        border: "border-purple-200",
    },
    red: {
        bg: "bg-red-50/50",
        text: "text-red-700",
        iconBg: "bg-red-100",
        border: "border-red-200",
    },
    indigo: {
        bg: "bg-indigo-50/50",
        text: "text-indigo-700",
        iconBg: "bg-indigo-100",
        border: "border-indigo-200",
    },
    cyan: {
        bg: "bg-cyan-50/50",
        text: "text-cyan-700",
        iconBg: "bg-cyan-100",
        border: "border-cyan-200",
    },
}

export function KPICard({ title, value, icon: Icon, description, color = "blue", className }: KPICardProps) {
    const styles = colorStyles[color]

    return (
        <Card className={cn("backdrop-blur-sm shadow-sm", styles.bg, styles.border, className)}>
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className={cn("p-2 rounded-md", styles.iconBg)}>
                        <Icon className={cn("w-5 h-5", styles.text)} />
                    </div>
                    <span className={cn("text-sm font-medium opacity-80", styles.text)}>
                        {title}
                    </span>
                </div>

                <div className="flex flex-col">
                    <span className={cn("text-3xl font-bold", styles.text)}>
                        {value}
                    </span>
                    {description && (
                        <span className={cn("text-xs opacity-70 mt-1", styles.text)}>
                            {description}
                        </span>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
