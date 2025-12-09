
import React from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { TFunction } from "i18next"

interface IntervenantAssignFormProps {
    t: TFunction
    options: { value: string; label: string }[]
    selectedIds: string[]
    onChange: (ids: string[]) => void
    selectedRole?: string
    onRoleChange?: (role: string) => void
}

export function IntervenantAssignForm({ t, options, selectedIds, onChange, selectedRole, onRoleChange }: IntervenantAssignFormProps) {
    const [popoverOpen, setPopoverOpen] = React.useState(false)
    const [searchTerm, setSearchTerm] = React.useState("")

    const filteredOptions = React.useMemo(
        () => options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase())),
        [options, searchTerm]
    )

    const toggleSelection = (id: string) => {
        if (selectedIds.includes(id)) {
            onChange(selectedIds.filter((item) => item !== id))
        } else {
            onChange([...selectedIds, id])
        }
    }

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>
                    {t("projects.details.intervenants.modal.intervenants_label", { defaultValue: "Intervenants" })}
                </Label>
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-between text-sm text-gray-700">
                            <span>
                                {selectedIds.length > 0
                                    ? t("projects.details.intervenants.modal.selected_count", {
                                        count: selectedIds.length,
                                        defaultValue: "{{count}} sélection(s)",
                                    })
                                    : t("projects.details.intervenants.modal.placeholder", {
                                        defaultValue: "Sélectionner des intervenants",
                                    })}
                            </span>
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-60" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                        <Command>
                            <CommandInput
                                placeholder={t("projects.details.intervenants.search_placeholder", {
                                    defaultValue: "Rechercher un intervenant...",
                                })}
                                value={searchTerm}
                                onValueChange={setSearchTerm}
                            />
                            <CommandList>
                                <CommandEmpty>
                                    {t("projects.details.intervenants.empty", {
                                        defaultValue: "Aucun intervenant ne correspond à votre recherche.",
                                    })}
                                </CommandEmpty>
                                <CommandGroup>
                                    {filteredOptions.map((option) => (
                                        <CommandItem
                                            key={option.value}
                                            value={option.value}
                                            onSelect={() => {
                                                toggleSelection(option.value)
                                                setPopoverOpen(false)
                                                setSearchTerm("")
                                            }}
                                            className="flex items-center justify-between"
                                        >
                                            {option.label}
                                            <Check
                                                className={cn(
                                                    "h-4 w-4",
                                                    selectedIds.includes(option.value) ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>

            {selectedIds.length > 0 && (
                <div className="rounded-lg border border-dashed border-muted-foreground/40 bg-muted/30 p-3">
                    <div className="flex flex-wrap gap-2">
                        {selectedIds.map((id) => {
                            const option = options.find((opt) => opt.value === id)
                            if (!option) return null
                            return (
                                <span
                                    key={id}
                                    className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium shadow"
                                >
                                    {option.label}
                                    <button
                                        type="button"
                                        className="text-muted-foreground hover:text-destructive cursor-pointer"
                                        onClick={() => toggleSelection(id)}
                                    >
                                        <X className="h-3.5 w-3.5" />
                                    </button>
                                </span>
                            )
                        })}
                    </div>
                </div>
            )}

            <div className="space-y-2">
                <Label>
                    {t("projects.details.intervenants.modal.role_label", { defaultValue: "Poste" })}
                </Label>
                <Select value={selectedRole} onValueChange={onRoleChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("projects.details.intervenants.modal.role_placeholder", { defaultValue: "Sélectionner un poste" })} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Chef de projet">Chef de projet</SelectItem>
                        <SelectItem value="Coordinateur">Coordinateur</SelectItem>
                        <SelectItem value="Analyste">Analyste</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
