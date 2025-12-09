import React from "react"
import { useTranslation } from "react-i18next"
import { Label } from "@/components/ui/label"
import { MultiSelect, type Option } from "@/components/ui/multi-select"

const AVAILABLE_SERVICES: Option[] = [
    { label: "AMIANTE", value: "amiante" },
    { label: "ATTESTATION DE CONFORMITÉ", value: "attestation-conformite" },
    { label: "DIAGNOSTIC ÉLECTRIQUE", value: "diagnostic-electrique" },
    { label: "PLOMB", value: "plomb" },
    { label: "GAZ", value: "gaz" },
    { label: "DPE (Diagnostic de Performance Énergétique)", value: "dpe" },
    { label: "TERMITES", value: "termites" },
    { label: "ÉTAT DES RISQUES ET POLLUTIONS", value: "erp" },
    { label: "ASSAINISSEMENT", value: "assainissement" },
    { label: "LOI CARREZ", value: "loi-carrez" },
    { label: "LOI BOUTIN", value: "loi-boutin" },
]

export function ProjectAddStepFive() {
    const { t } = useTranslation()
    const [selectedServices, setSelectedServices] = React.useState<string[]>([])

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h1 className="font-bold uppercase tracking-[0.3em] text-red-500">STEP 5 OF 5</h1>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        {t("projects.add.steps.services.title", { defaultValue: "Services" })}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {t("projects.add.steps.services.description_long", {
                            defaultValue:
                                "Sélectionnez les services requis pour ce projet afin de définir le périmètre d'intervention.",
                        })}
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <Label className="text-sm font-semibold text-gray-900">
                        Services du projet <span className="text-red-500">*</span>
                    </Label>
                    <p className="text-xs text-muted-foreground mb-3">
                        Sélectionnez un ou plusieurs services nécessaires pour ce projet
                    </p>
                </div>

                <MultiSelect
                    options={AVAILABLE_SERVICES}
                    selected={selectedServices}
                    onChange={setSelectedServices}
                    placeholder="Sélectionner les services..."
                    className="w-full"
                />

                {selectedServices.length > 0 && (
                    <div className="rounded-lg border border-dashed border-muted-foreground/40 bg-muted/30 p-4">
                        <p className="text-sm font-medium text-gray-900 mb-2">
                            {selectedServices.length} service{selectedServices.length > 1 ? "s" : ""} sélectionné
                            {selectedServices.length > 1 ? "s" : ""}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Ces services seront associés au projet et pourront être utilisés pour créer des demandes
                            de service.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
