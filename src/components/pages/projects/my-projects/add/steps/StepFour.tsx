import React from "react"
import { useTranslation } from "react-i18next"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import { FaFileUpload } from "react-icons/fa"

type UploadedFile = {
    id: string
    name: string
    size: number
}

function FileUploader({
    label,
    description,
    accept,
    files,
    onFilesChange,
}: {
    label: React.ReactNode
    description: string
    accept: string
    files: UploadedFile[]
    onFilesChange: (files: UploadedFile[]) => void
}) {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files || [])
        const mapped = selectedFiles.map((file) => ({
            id: `${file.name}-${Date.now()}`,
            name: file.name,
            size: file.size,
        }))
        onFilesChange([...files, ...mapped])
    }

    const removeFile = (id: string) => {
        onFilesChange(files.filter((file) => file.id !== id))
    }

    return (
        <div className="space-y-4">
            <div>
                <Label className="text-sm font-semibold text-gray-900">{label}</Label>
                <p className="text-xs text-muted-foreground">{description}</p>
            </div>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-muted-foreground/40 bg-muted/30 px-6 py-8 text-center transition hover:border-primary hover:bg-primary/5">
                <FaFileUpload className="mb-3 h-8 w-8 text-primary" />
                <span className="text-sm font-medium text-gray-900">Déposer vos fichiers ici</span>
                <span className="text-xs text-muted-foreground">
                    Formats acceptés : {accept.replace(/,/g, ", ")}
                </span>
                <input type="file" className="hidden" accept={accept} multiple onChange={handleFileChange} />
            </label>

            {files.length > 0 && (
                <div className="rounded-lg border border-dashed border-muted-foreground/40 p-4">
                    <div className="flex flex-wrap gap-2">
                        {files.map((file) => (
                            <span
                                key={file.id}
                                className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium shadow"
                                title={file.name}
                            >
                                <span className="max-w-[200px] truncate">{file.name}</span>
                                <button
                                    type="button"
                                    onClick={() => removeFile(file.id)}
                                    className="text-muted-foreground hover:text-destructive cursor-pointer"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export function ProjectAddStepFour() {
    const { t } = useTranslation()
    const [quoteFiles, setQuoteFiles] = React.useState<UploadedFile[]>([])
    const [planFiles, setPlanFiles] = React.useState<UploadedFile[]>([])

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h1 className="font-bold uppercase tracking-[0.3em] text-red-500">STEP 4 OF 5</h1>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        {t("projects.add.steps.files.title", { defaultValue: "Fichiers initiaux" })}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {t("projects.add.steps.files.description_long", {
                            defaultValue:
                                "Ajoutez les devis, plans et documents techniques nécessaires pour compléter le dossier du projet.",
                        })}
                    </p>
                </div>
            </div>

            <div className="space-y-10">
                <FileUploader
                    label="Upload des devis"
                    description="Formats acceptés : PDF, DOCX. Plusieurs fichiers possibles."
                    accept=".pdf,.doc,.docx"
                    files={quoteFiles}
                    onFilesChange={setQuoteFiles}
                />

                <FileUploader
                    label="Upload des plans"
                    description="Formats acceptés : Revit (.rvt) et images (.png, .jpg)."
                    accept=".rvt,.png,.jpg,.jpeg,.gif,.svg,.bmp"
                    files={planFiles}
                    onFilesChange={setPlanFiles}
                />
            </div>
        </div>
    )
}

