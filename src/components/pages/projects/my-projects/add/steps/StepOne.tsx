import React from "react"
import { useTranslation } from "react-i18next"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ClientAddModal } from "../components/ClientAddModal"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { ChevronsUpDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const requiredMark = <span className="text-red-500">*</span>

const clientOptions = [
    { value: "unicef", label: "UNICEF" },
    { value: "pnud", label: "PNUD" },
    { value: "unesco", label: "UNESCO" },
]

export function ProjectAddStepOne() {
    const { t } = useTranslation()
    const [isClientModalOpen, setClientModalOpen] = React.useState(false)
    const [clientPopoverOpen, setClientPopoverOpen] = React.useState(false)
    const [selectedClient, setSelectedClient] = React.useState<string | undefined>()

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h1 className="font-bold uppercase tracking-[0.3em] text-red-500">
                    STEP 1 OF 5
                </h1>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        {t("projects.add.steps.basic.title", { defaultValue: "Informations de base" })}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {t("projects.add.steps.basic.description_long", {
                            defaultValue:
                                "Définissez les informations essentielles du projet : contexte, objectifs et cadre de réalisation afin de guider les étapes suivantes et aligner toutes les parties prenantes.",
                        })}
                    </p>
                </div>
            </div>

            <div className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="internal-ref">
                            Référence interne {requiredMark}
                        </Label>
                        <Input id="internal-ref" name="internalRef" placeholder="ex: REF-2025-01" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="project-title">
                            Titre du projet {requiredMark}
                        </Label>
                        <Input
                            id="project-title"
                            name="projectTitle"
                            placeholder="ex: Programme d’appui aux services publics"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="project-number">
                            Numéro du projet {requiredMark}
                        </Label>
                        <Input id="project-number" name="projectNumber" placeholder="ex: PRJ-4589" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="project-client">
                            Client {requiredMark}
                        </Label>
                        <div className="flex flex-col gap-3 md:flex-row">
                            <Popover open={clientPopoverOpen} onOpenChange={setClientPopoverOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={clientPopoverOpen}
                                        className="w-full justify-between md:flex-1 bg-transparent"
                                    >
                                        {selectedClient
                                            ? clientOptions.find((option) => option.value === selectedClient)?.label
                                            : "Sélectionner un client"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0 md:w-[360px]" align="start">
                                    <Command>
                                        <CommandInput placeholder="Rechercher un client..." className="h-9" />
                                        <CommandList>
                                            <CommandEmpty>Aucun client trouvé.</CommandEmpty>
                                            <CommandGroup>
                                                {clientOptions.map((option) => (
                                                    <CommandItem
                                                        key={option.value}
                                                        value={option.value}
                                                        onSelect={(currentValue) => {
                                                            const nextValue =
                                                                currentValue === selectedClient ? undefined : currentValue
                                                            setSelectedClient(nextValue)
                                                            setClientPopoverOpen(false)
                                                        }}
                                                    >
                                                        {option.label}
                                                        <Check
                                                            className={cn(
                                                                "ml-auto h-4 w-4",
                                                                selectedClient === option.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full md:w-auto bg-transparent cursor-pointer"
                                onClick={() => setClientModalOpen(true)}
                            >
                                Ajouter
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="project-description">
                        Description du projet {requiredMark}
                    </Label>
                    <Textarea
                        id="project-description"
                        name="projectDescription"
                        placeholder="Décrivez brièvement les objectifs, le contexte et les résultats attendus."
                        required
                        rows={7}
                    />
                </div>
            </div>
            <ClientAddModal open={isClientModalOpen} onOpenChange={setClientModalOpen} />
        </div>
    )
}

