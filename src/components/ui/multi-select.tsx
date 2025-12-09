import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { cn } from "@/lib/utils"

export type Option = {
    label: string
    value: string
}

interface MultiSelectProps {
    options: Option[]
    selected: string[]
    onChange: (selected: string[]) => void
    placeholder?: string
    className?: string
}

export function MultiSelect({ options, selected, onChange, placeholder = "Sélectionner...", className }: MultiSelectProps) {
    const [open, setOpen] = React.useState(false)
    const containerRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }

        if (open) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [open])

    const handleUnselect = (item: string) => {
        onChange(selected.filter((i) => i !== item))
    }

    const handleSelect = (value: string) => {
        if (selected.includes(value)) {
            handleUnselect(value)
        } else {
            onChange([...selected, value])
        }
    }

    return (
        <div ref={containerRef} className={cn("relative", className)}>
            <div
                className={cn(
                    "flex min-h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-within:ring-[3px] focus-within:ring-ring/50 focus-within:border-ring disabled:cursor-not-allowed disabled:opacity-50",
                    open && "ring-[3px] ring-ring/50 border-ring"
                )}
                onClick={() => setOpen(!open)}
            >
                <div className="flex flex-wrap gap-1 flex-1">
                    {selected.length > 0 ? (
                        selected.map((item) => {
                            const option = options.find((opt) => opt.value === item)
                            return (
                                <Badge
                                    key={item}
                                    variant="secondary"
                                    className="mr-1 mb-1 cursor-pointer hover:bg-secondary/80"
                                >
                                    {option?.label}
                                    <button
                                        className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleUnselect(item)
                                            }
                                        }}
                                        onMouseDown={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            handleUnselect(item)
                                        }}
                                    >
                                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                    </button>
                                </Badge>
                            )
                        })
                    ) : (
                        <span className="text-muted-foreground">{placeholder}</span>
                    )}
                </div>
            </div>
            {open && (
                <div className="absolute top-full left-0 right-0 z-50 mt-2 rounded-md border bg-popover shadow-md animate-in fade-in-0 zoom-in-95">
                    <Command className="rounded-md">
                        <CommandInput placeholder="Rechercher un service..." className="h-9" />
                        <CommandEmpty>Aucun service trouvé.</CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-auto">
                            {options.map((option) => {
                                const isSelected = selected.includes(option.value)
                                return (
                                    <CommandItem
                                        key={option.value}
                                        onSelect={() => handleSelect(option.value)}
                                        className="cursor-pointer"
                                    >
                                        <div
                                            className={cn(
                                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                isSelected
                                                    ? "bg-primary text-primary-foreground"
                                                    : "opacity-50 [&_svg]:invisible"
                                            )}
                                        >
                                            <svg
                                                className="h-4 w-4"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                            >
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                        <span>{option.label}</span>
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    </Command>
                </div>
            )}
        </div>
    )
}
