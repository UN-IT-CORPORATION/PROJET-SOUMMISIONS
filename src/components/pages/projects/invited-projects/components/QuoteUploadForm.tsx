import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UploadCloud } from "lucide-react"

interface QuoteUploadFormProps {
    onCancel: () => void
    onSubmit: (file: File) => void
}

export function QuoteUploadForm({ onSubmit }: QuoteUploadFormProps) {
    const [file, setFile] = React.useState<File | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!file) return
        onSubmit(file)
    }

    return (
        <form id="quote-upload-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="file">Fichier du devis</Label>
                <div className="flex items-center justify-center w-full">
                    <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-8 h-8 mb-4 text-gray-500" />
                            <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Cliquez pour uploader</span> ou glissez-déposez
                            </p>
                            <p className="text-xs text-gray-500">PDF, DOCX, XLS (MAX. 10MB)</p>
                        </div>
                        <Input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            accept=".pdf,.docx,.doc,.xls,.xlsx"
                        />
                    </label>
                </div>
                {file && (
                    <p className="text-sm text-green-600 font-medium">
                        Fichier sélectionné : {file.name}
                    </p>
                )}
            </div>
        </form>
    )
}