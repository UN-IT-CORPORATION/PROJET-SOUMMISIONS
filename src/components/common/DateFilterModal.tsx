import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { FaSliders } from "react-icons/fa6"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"

interface DateFilters {
    createdStart?: Date
    createdEnd?: Date
    modifiedStart?: Date
    modifiedEnd?: Date
    submissionStart?: Date
    submissionEnd?: Date
}

interface DateFilterModalProps {
    onApplyFilters: (filters: DateFilters) => void
}

function DatePickerField({
    label,
    date,
    onSelect
}: {
    label: string
    date?: Date
    onSelect: (date?: Date) => void
}) {
    const [open, setOpen] = React.useState(false)

    return (
        <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium">{label}</Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal cursor-pointer"
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: fr }) : <span>Sélectionner une date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(date) => {
                            onSelect(date)
                            setOpen(false)
                        }}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export function DateFilterModal({ onApplyFilters }: DateFilterModalProps) {
    const [open, setOpen] = React.useState(false)
    const [filters, setFilters] = React.useState<DateFilters>({})

    const handleApply = () => {
        onApplyFilters(filters)
        setOpen(false)
    }

    const handleClearAll = () => {
        setFilters({})
        onApplyFilters({})
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="cursor-pointer">
                    <FaSliders className="h-4 w-4" />
                    <span className="sr-only">Filtres par date</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Filtres par période</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    {/* Créé entre */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold">Créé entre</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <DatePickerField
                                label="Début"
                                date={filters.createdStart}
                                onSelect={(date) => setFilters({ ...filters, createdStart: date })}
                            />
                            <DatePickerField
                                label="Fin"
                                date={filters.createdEnd}
                                onSelect={(date) => setFilters({ ...filters, createdEnd: date })}
                            />
                        </div>
                    </div>

                    {/* Modifié entre */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold">Modifié entre</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <DatePickerField
                                label="Début"
                                date={filters.modifiedStart}
                                onSelect={(date) => setFilters({ ...filters, modifiedStart: date })}
                            />
                            <DatePickerField
                                label="Fin"
                                date={filters.modifiedEnd}
                                onSelect={(date) => setFilters({ ...filters, modifiedEnd: date })}
                            />
                        </div>
                    </div>

                    {/* Période de soumission */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold">Période de soumission</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <DatePickerField
                                label="Début"
                                date={filters.submissionStart}
                                onSelect={(date) => setFilters({ ...filters, submissionStart: date })}
                            />
                            <DatePickerField
                                label="Fin"
                                date={filters.submissionEnd}
                                onSelect={(date) => setFilters({ ...filters, submissionEnd: date })}
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter className="gap-2">
                    <Button
                        variant="outline"
                        onClick={handleClearAll}
                        className="cursor-pointer"
                    >
                        Effacer tous
                    </Button>
                    <Button
                        onClick={handleApply}
                        className="cursor-pointer"
                    >
                        Appliquer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
