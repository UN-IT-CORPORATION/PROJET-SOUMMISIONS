import { cn } from "@/lib/utils"

export interface TabsNavItem {
    value: string
    label: string
}

interface TabsNavProps {
    tabs: TabsNavItem[]
    activeTab: string
    onTabChange: (value: string) => void
    className?: string
}

export function TabsNav({ tabs, activeTab, onTabChange, className }: TabsNavProps) {
    return (
        <div className={cn("flex flex-wrap text-sm font-medium gap-6", className)}>
            {tabs.map((tab) => {
                const isActive = tab.value === activeTab
                return (
                    <button
                        key={tab.value}
                        type="button"
                        onClick={() => onTabChange(tab.value)}
                        className={cn(
                            "relative py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 cursor-pointer",
                            isActive
                                ? "text-primary"
                                : "text-muted-foreground hover:text-primary"
                        )}
                    >
                        {tab.label}
                        <span
                            className={cn(
                                "absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-opacity",
                                isActive ? "opacity-100" : "opacity-0"
                            )}
                        />
                    </button>
                )
            })}
        </div>
    )
}

