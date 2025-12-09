import React from "react"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import { FaFileUpload } from "react-icons/fa"
import { Button } from "@/components/ui/button"

type UploadedFile = {
    id: string
    name: string
    size: number
}

function FileUploader({
    label,
    description,
    accept,
}: {
    label: React.ReactNode
    description: string
    accept: string
}) {
    const [files, setFiles] = React.useState<UploadedFile[]>([])

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files || [])
        const mapped = selectedFiles.map((file) => ({
            id: `${file.name}-${Date.now()}`,
            name: file.name,
            size: file.size,
        }))
        setFiles((prev) => [...prev, ...mapped])
    }

    const removeFile = (id: string) => {
        setFiles((prev) => prev.filter((file) => file.id !== id))
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

interface InitialFilesUploadFormProps {
    onCancel: () => void
}

export function InitialFilesUploadForm({ onCancel }: InitialFilesUploadFormProps) {
    const handleSave = () => {
        // TODO: brancher l'enregistrement réel des fichiers initiaux
        onCancel()
    }

    return (
        <div className="flex h-full flex-col">
            <div className="flex-1 space-y-10">
                <FileUploader
                    label="Upload des devis"
                    description="Formats acceptés : PDF, DOCX. Plusieurs fichiers possibles."
                    accept=".pdf,.doc,.docx"
                />

                <FileUploader
                    label="Upload des plans"
                    description="Formats acceptés : Revit (.rvt) et images (.png, .jpg)."
                    accept=".rvt,.png,.jpg,.jpeg,.gif,.svg,.bmp"
                />
            </div>

            <div className="sticky bottom-0 mt-4 border-t bg-white pt-4">
                <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Annuler
                    </Button>
                    <Button type="button" onClick={handleSave}>
                        Enregistrer
                    </Button>
                </div>
            </div>
        </div>
    )
}

