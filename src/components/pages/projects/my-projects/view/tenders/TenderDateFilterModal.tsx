import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { FaSliders } from "react-icons/fa6"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"

export interface TenderDateFilters {
    start?: Date
    end?: Date
}

interface TenderDateFilterModalProps {
    onApplyFilters: (filters: TenderDateFilters) => void
}

function DatePickerField({
    label,
    date,
    onSelect,
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
                        onSelect={(d) => {
                            onSelect(d ?? undefined)
                            setOpen(false)
                        }}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export function TenderDateFilterModal({ onApplyFilters }: TenderDateFilterModalProps) {
    const [open, setOpen] = React.useState(false)
    const [filters, setFilters] = React.useState<TenderDateFilters>({})

    const handleApply = () => {
        onApplyFilters(filters)
        setOpen(false)
    }

    const handleClearAll = () => {
        const empty: TenderDateFilters = {}
        setFilters(empty)
        onApplyFilters(empty)
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
                    <DialogTitle>Filtrer par période</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold">Date de l&apos;appel d&apos;offres</h3>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <DatePickerField
                                label="Du"
                                date={filters.start}
                                onSelect={(date) => setFilters({ ...filters, start: date })}
                            />
                            <DatePickerField
                                label="Au"
                                date={filters.end}
                                onSelect={(date) => setFilters({ ...filters, end: date })}
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


