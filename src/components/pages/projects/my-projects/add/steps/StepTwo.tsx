import { useTranslation } from "react-i18next"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const requiredMark = <span className="text-red-500">*</span>

const regionOptions = [
    { value: "bamako", label: "Bamako" },
    { value: "kayes", label: "Kayes" },
    { value: "koulikoro", label: "Koulikoro" },
    { value: "mopti", label: "Mopti" },
]

const statusOptions = [
    { value: "planning", label: "En planification" },
    { value: "in-progress", label: "En cours" },
    { value: "completed", label: "Terminé" },
]

export function ProjectAddStepTwo() {
    const { t } = useTranslation()
    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h1 className="font-bold uppercase tracking-[0.3em] text-red-500">
                    STEP 2 OF 5
                </h1>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        {t("projects.add.steps.location.title", { defaultValue: "Localisation géographique" })}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {t("projects.add.steps.location.description_long", {
                            defaultValue:
                                "Précisez l’emplacement exact du projet afin de faciliter le suivi terrain, la mobilisation des équipes et la coordination avec les partenaires institutionnels.",
                        })}
                    </p>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="postal-code">
                                Code postal {requiredMark}
                            </Label>
                            <Input id="postal-code" name="postalCode" placeholder="ex : 91002" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="region">
                                Région {requiredMark}
                            </Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Sélectionner une région" />
                                </SelectTrigger>
                                <SelectContent>
                                    {regionOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lot-number">
                                Numéro de lot
                            </Label>
                            <Input id="lot-number" name="lotNumber" placeholder="ex : Lot 15" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="project-address">
                            Adresse du projet {requiredMark}
                        </Label>
                        <Textarea
                            id="project-address"
                            name="projectAddress"
                            rows={4}
                            placeholder="ex : Quartier Badalabougou, commune V, Bamako"
                            required
                        />
                    </div>

                    {/* <div className="space-y-3">
                        <div>
                            <h3 className="text-sm font-semibold uppercase text-muted-foreground tracking-wide">
                                Coordonnées géographiques
                            </h3>
                            <p className="text-xs text-muted-foreground">
                                Indiquez la latitude et la longitude exactes du site d’intervention.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="latitude">
                                Latitude {requiredMark}
                            </Label>
                            <Input
                                id="latitude"
                                name="latitude"
                                type="number"
                                step="any"
                                placeholder="ex : 12.6392"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="longitude">
                                Longitude {requiredMark}
                            </Label>
                            <Input
                                id="longitude"
                                name="longitude"
                                type="number"
                                step="any"
                                placeholder="ex : -8.0029"
                                required
                            />
                        </div>
                    </div> */}

                    <div className="space-y-2">
                        <Label htmlFor="project-status">
                            Statut du projet {requiredMark}
                        </Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Sélectionner un statut" />
                            </SelectTrigger>
                            <SelectContent>
                                {statusOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="relative flex h-full items-center justify-center rounded-lg border border-dashed border-muted-foreground/40 bg-muted/40 text-sm text-muted-foreground">
                        Prévisualisation de la carte (intégration à venir)
                    </div>
                </div>
            </div>
        </div>
    )
}

