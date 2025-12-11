import React from "react"
import { useTranslation } from "react-i18next"
import { Label } from "@/components/ui/label"
import { MultiSelect, type Option } from "@/components/ui/multi-select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Image as ImageIcon } from "lucide-react"

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
    const [imageFile, setImageFile] = React.useState<File | null>(null)
    const [imagePreview, setImagePreview] = React.useState<string | null>(null)

    const onImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target.files?.[0] ?? null
        setImageFile(file)
        if (file) {
            const reader = new FileReader()
            reader.onload = () => setImagePreview(reader.result as string)
            reader.readAsDataURL(file)
        } else {
            setImagePreview(null)
        }
    }

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

            {/* Illustration du projet */}
            <div className="space-y-4">
                <div>
                    <Label className="text-sm font-semibold text-gray-900">
                        Illustration du projet
                    </Label>
                    <p className="text-xs text-muted-foreground mb-3">
                        Ajoutez une image (JPEG, PNG) pour illustrer ce projet.
                    </p>
                </div>

                <div className="space-y-3">
                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-muted-foreground/40 bg-muted/30 px-6 py-8 text-center transition hover:border-primary hover:bg-primary/5">
                        <ImageIcon className="mb-3 h-8 w-8 text-primary" />
                        <span className="text-sm font-medium text-gray-900">Déposer votre image ici</span>
                        <span className="text-xs text-muted-foreground">Formats acceptés : .png, .jpg, .jpeg</span>
                        <input type="file" className="hidden" accept="image/png, image/jpeg, image/jpg" onChange={onImageChange} />
                    </label>

                    {imagePreview && (
                        <div className="rounded-lg border border-dashed border-muted-foreground/40 bg-white p-3">
                            <img
                                src={imagePreview}
                                alt="Prévisualisation de l'image du projet"
                                className="h-32 w-32 object-cover rounded-md"
                            />
                        </div>
                    )}
                </div>

                {imageFile && (
                    <div className="rounded-lg border border-dashed border-muted-foreground/40 bg-muted/30 p-4">
                        <p className="text-sm text-gray-700">
                            Fichier sélectionné: <span className="font-medium">{imageFile.name}</span> ({Math.round(imageFile.size / 1024)} Ko)
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
