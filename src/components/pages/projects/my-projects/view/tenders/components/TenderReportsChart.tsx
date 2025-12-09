import React from "react"
import type { TenderReportRow } from "@/mocks/tenderReports"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TenderReportsChartProps {
    data: TenderReportRow[]
}

type ChartFilter = "all" | "success" | "failure"

export function TenderReportsChart({ data }: TenderReportsChartProps) {
    const [filter, setFilter] = React.useState<ChartFilter>("all")

    const chartData = React.useMemo(() => {
        if (!data.length) return []

        // Agrégation par rôle pour éviter la saturation même avec 1000+ intervenants
        const byRole = data.reduce<Record<string, { sent: number; failed: number; total: number }>>((acc, row) => {
            const key = row.role || "Autre"
            if (!acc[key]) acc[key] = { sent: 0, failed: 0, total: 0 }
            acc[key].total += 1
            if (row.status === "sent") acc[key].sent += 1
            else if (row.status === "failed") acc[key].failed += 1
            return acc
        }, {})

        return Object.entries(byRole).map(([role, stats]) => ({
            label: role,
            successRate: Number(((stats.sent / stats.total) * 100).toFixed(1)),
            failureRate: Number(((stats.failed / stats.total) * 100).toFixed(1)),
        }))
    }, [data])

    if (!chartData.length) {
        return null
    }

    const showSuccess = filter === "all" || filter === "success"
    const showFailure = filter === "all" || filter === "failure"

    return (
        <div>
            <div className="mb-3 flex items-center justify-between">
                <div>
                    <p className="text-sm font-semibold text-gray-900">Taux de succès et d'échec par rôle</p>
                    <p className="text-xs text-muted-foreground">
                        Pourcentage d&apos;intervenants par statut d&apos;envoi.
                    </p>
                </div>
                <Select value={filter} onValueChange={(value) => setFilter(value as ChartFilter)}>
                    <SelectTrigger className="w-[150px] bg-white">
                        <SelectValue placeholder="Filtrer" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all" className="cursor-pointer">Tous</SelectItem>
                        <SelectItem value="success" className="cursor-pointer">Succès</SelectItem>
                        <SelectItem value="failure" className="cursor-pointer">Échec</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ left: -20, right: 10, top: 10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="label"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 11, fill: "#6b7280" }}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 11, fill: "#6b7280" }}
                            domain={[0, 100]}
                            tickFormatter={(value) => `${value}%`}
                        />
                        <Tooltip
                            formatter={(value: number, name: string) => {
                                const label = name === "successRate" ? "Succès" : "Échec"
                                return [`${value}%`, label]
                            }}
                            labelFormatter={(label) => `Rôle : ${label}`}
                        />
                        <Legend
                            wrapperStyle={{ paddingTop: "10px" }}
                            formatter={(value) => (value === "successRate" ? "Succès" : "Échec")}
                        />
                        {showSuccess && (
                            <Line
                                type="monotone"
                                dataKey="successRate"
                                stroke="#16a34a"
                                strokeWidth={2}
                                dot={{ r: 3 }}
                                activeDot={{ r: 4 }}
                                name="successRate"
                            />
                        )}
                        {showFailure && (
                            <Line
                                type="monotone"
                                dataKey="failureRate"
                                stroke="#dc2626"
                                strokeWidth={2}
                                dot={{ r: 3 }}
                                activeDot={{ r: 4 }}
                                name="failureRate"
                            />
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}


