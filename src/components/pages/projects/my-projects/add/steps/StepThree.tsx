import React from "react"
import { useTranslation } from "react-i18next"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"

const requiredMark = <span className="text-red-500">*</span>

interface DateFieldProps {
    label: string
    date?: Date
    onSelect: (date?: Date) => void
    placeholder?: string
}

function DateField({ label, date, onSelect, placeholder = "Sélectionner une date" }: DateFieldProps) {
    const [open, setOpen] = React.useState(false)

    return (
        <div className="space-y-1.5">
            <span className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">
                {label}
            </span>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-full justify-start text-left font-normal cursor-pointer bg-transparent",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: fr }) : placeholder}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(selectedDate) => {
                            onSelect(selectedDate)
                            setOpen(false)
                        }}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export function ProjectAddStepThree() {
    const { t } = useTranslation()
    const [serviceStart, setServiceStart] = React.useState<Date>()
    const [serviceEnd, setServiceEnd] = React.useState<Date>()
    const [workStart, setWorkStart] = React.useState<Date>()
    const [submissionStart, setSubmissionStart] = React.useState<Date>()
    const [submissionEnd, setSubmissionEnd] = React.useState<Date>()

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h1 className="font-bold uppercase tracking-[0.3em] text-red-500">
                    STEP 3 OF 5
                </h1>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        {t("projects.add.steps.planning.title", { defaultValue: "Planning" })}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {t("projects.add.steps.planning.description_long", {
                            defaultValue:
                                "Planifiez les différentes périodes du projet afin de coordonner la mobilisation des équipes, la validation des documents et le lancement des travaux.",
                        })}
                    </p>
                </div>
            </div>

            <div className="space-y-8">
                <div className="grid gap-6">
                    <div className="space-y-2">
                        <Label>
                            Période prévue pour recevoir le service {requiredMark}
                        </Label>
                        <div className="grid gap-4 md:grid-cols-2">
                            <DateField
                                label="début"
                                date={serviceStart}
                                onSelect={setServiceStart}
                            />
                            <DateField
                                label="fin"
                                date={serviceEnd}
                                onSelect={setServiceEnd}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="work-start-date">
                            Date prévue de commencement des travaux {requiredMark}
                        </Label>
                        <div className="grid gap-4 md:grid-cols-2">
                        <DateField
                            label=""
                            date={workStart}
                            onSelect={setWorkStart}
                            placeholder="Choisir une date"
                        />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>
                        Intervalle de dépôt des soumissions {requiredMark}
                    </Label>
                    <div className="grid gap-4 md:grid-cols-2">
                        <DateField
                            label="Début"
                            date={submissionStart}
                            onSelect={setSubmissionStart}
                        />
                        <DateField
                            label="Fin"
                            date={submissionEnd}
                            onSelect={setSubmissionEnd}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

