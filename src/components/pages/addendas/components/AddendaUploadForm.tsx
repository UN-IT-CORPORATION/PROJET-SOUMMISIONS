import React from "react"
import { UploadCloud, ChevronsUpDown, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"


interface AddendaUploadFormProps {
    open: boolean
    onSubmit?: (payload: { file: File; type: string; division: string }) => void
    onCancel: () => void
}

const typeOptions = [
    { value: "plan", label: "Plan" },
    { value: "devis", label: "Devis" },
]

const divisionOptions = [
    { value: "architecture", label: "Architecture" },
    { value: "structure", label: "Structure" },
    { value: "mep", label: "MEP" },
    { value: "finition", label: "Finitions" },
]

export function AddendaUploadForm({ open, onSubmit, onCancel }: AddendaUploadFormProps) {
    const [file, setFile] = React.useState<File | null>(null)
    const [type, setType] = React.useState("")
    const [division, setDivision] = React.useState("")
    const [error, setError] = React.useState("")
    const [isDragging, setIsDragging] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const [divisionPopoverOpen, setDivisionPopoverOpen] = React.useState(false)

    React.useEffect(() => {
        if (!open) {
            setFile(null)
            setType("")
            setDivision("")
            setError("")
            setIsDragging(false)
            setDivisionPopoverOpen(false)
        }
    }, [open])

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextFile = event.target.files?.[0] ?? null
        setFile(nextFile)
        setError("")
    }

    const formatSize = (sizeInBytes: number) => {
        if (sizeInBytes === 0) return "0 Ko"
        const sizes = ["octets", "Ko", "Mo", "Go"]
        const i = Math.floor(Math.log(sizeInBytes) / Math.log(1024))
        const value = sizeInBytes / Math.pow(1024, i)
        return `${value.toFixed(2)} ${sizes[i]}`
    }

    const handleSubmit = () => {
        if (!file) {
            setError("Veuillez sélectionner un fichier.")
            return
        }

        if (!type) {
            setError("Veuillez sélectionner un type.")
            return
        }

        if (!division) {
            setError("Veuillez sélectionner une division.")
            return
        }

        onSubmit?.({
            file,
            type,
            division,
        })
    }

    const handleBrowseClick = () => {
        inputRef.current?.click()
    }

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        setIsDragging(true)
    }

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        setIsDragging(false)
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        setIsDragging(false)
        const droppedFile = event.dataTransfer.files?.[0]
        if (droppedFile) {
            setFile(droppedFile)
            setError("")
        }
    }

    return (
        <div className="flex h-full flex-col">
            <div className="flex-1 space-y-6 overflow-y-auto pr-1">
                <div className="space-y-2">
                    <Label htmlFor="addenda-file">
                        Fichier <span className="text-red-500">*</span>
                    </Label>
                    <input
                        ref={inputRef}
                        id="addenda-file"
                        type="file"
                        accept=".pdf,.xlsx,.xls,.zip,.png,.jpg,.jpeg,.dwg,.dxf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition cursor-pointer ${isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/40 bg-white"
                            }`}
                    >
                        <UploadCloud className="mb-4 h-10 w-10 text-primary" />
                        <p className="font-medium text-gray-900">Sélectionnez un fichier ou glissez-déposez</p>
                        <p className="text-sm text-muted-foreground">
                            Formats acceptés : .pdf, .xlsx, .dwg, .dxf, .doc, images
                        </p>
                        <Button
                            type="button"
                            className="mt-4 cursor-pointer"
                            variant="secondary"
                            onClick={handleBrowseClick}
                        >
                            Parcourir
                        </Button>
                    </div>
                </div>

                {file && (
                    <div className="rounded-md border bg-muted/30 p-3 text-sm">
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <p className="text-muted-foreground">{formatSize(file.size)}</p>
                    </div>
                )}

                {/* <div className="space-y-2">
                    <Label>
                        Type <span className="text-red-500">*</span>
                    </Label>
                    <Select value={type} onValueChange={setType}>
                        <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Sélectionner un type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="plan" className="cursor-pointer">
                                Plan
                            </SelectItem>
                            <SelectItem value="devis" className="cursor-pointer">
                                Devis
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div> */}

                <div className="space-y-2">
                    <Label>
                        Division <span className="text-red-500">*</span>
                    </Label>
                    <Popover open={divisionPopoverOpen} onOpenChange={setDivisionPopoverOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-between text-sm text-gray-700">
                                <span>
                                    {division
                                        ? divisionOptions.find((option) => option.value === division)?.label
                                        : "Sélectionner une division"}
                                </span>
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-60" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Command>
                                <CommandInput placeholder="Rechercher une division..." />
                                <CommandList>
                                    <CommandGroup>
                                        {divisionOptions.map((option) => (
                                            <CommandItem
                                                key={option.value}
                                                value={option.value}
                                                onSelect={(currentValue) => {
                                                    setDivision(currentValue)
                                                    setDivisionPopoverOpen(false)
                                                }}
                                                className="flex items-center justify-between"
                                            >
                                                {option.label}
                                                <Check
                                                    className={cn(
                                                        "h-4 w-4",
                                                        division === option.value ? "opacity-100" : "opacity-0"
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

                {error && <p className="text-sm text-destructive">{error}</p>}
            </div>

            <div className="sticky bottom-0 mt-4 border-t bg-white pt-4">
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onCancel}>
                        Annuler
                    </Button>
                    <Button onClick={handleSubmit} disabled={!file || !type || !division}>
                        Enregistrer
                    </Button>
                </div>
            </div>
        </div>
    )
}
