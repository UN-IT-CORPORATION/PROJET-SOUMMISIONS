import React from "react"
import type { TFunction } from "i18next"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import type { ServiceRequest } from "../columns"

type ServiceRequestFormProps = {
    t: TFunction
    request: ServiceRequest | null
    onSubmit: () => void
    onCancel: () => void
    isViewMode?: boolean
}

const requiredMark = <span className="text-red-500">*</span>

const serviceTypes = [
    "AMIANTE",
    "ATTESTATION DE CONFORMITÉ",
    "DIAGNOSTIC ÉLECTRIQUE",
    "PLOMB",
    "GAZ",
    "TERMITES",
    "DPE",
    "CARREZ",
    "BOUTIN",
]

const regionOptions = [
    { value: "bamako", label: "Bamako" },
    { value: "kayes", label: "Kayes" },
    { value: "koulikoro", label: "Koulikoro" },
    { value: "mopti", label: "Mopti" },
]

interface DateFieldProps {
    label: string
    date?: Date
    onSelect: (date?: Date) => void
    placeholder?: string
    disabled?: boolean
}

function DateField({ label, date, onSelect, placeholder = "Sélectionner une date", disabled }: DateFieldProps) {
    const [open, setOpen] = React.useState(false)

    const handleSelect = (selectedDate?: Date) => {
        if (disabled) return
        onSelect(selectedDate)
        setOpen(false)
    }

    return (
        <div className="space-y-1.5">
            {label && (
                <span className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">
                    {label}
                </span>
            )}
            <Popover open={open} onOpenChange={(nextOpen) => !disabled && setOpen(nextOpen)}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-full justify-start text-left font-normal cursor-pointer bg-transparent",
                            !date && "text-muted-foreground",
                            disabled && "cursor-not-allowed opacity-60"
                        )}
                        disabled={disabled}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: fr }) : placeholder}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleSelect}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export function ServiceRequestForm({ t, request, onSubmit, onCancel, isViewMode = false }: ServiceRequestFormProps) {
    const [serviceStartDate, setServiceStartDate] = React.useState<Date>()
    const [serviceEndDate, setServiceEndDate] = React.useState<Date>()
    const [workStartDate, setWorkStartDate] = React.useState<Date>()
    const [noDeadline, setNoDeadline] = React.useState(false)
    const [sameAddress, setSameAddress] = React.useState(true)

    return (
        <div className="flex h-full flex-col">
            <div className="flex-1 space-y-6 overflow-y-auto pr-1">
                {/* Informations générales */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Informations générales</h3>

                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="crm">
                                CRM {requiredMark}
                            </Label>
                            <Input
                                id="crm"
                                name="crm"
                                placeholder="CRM-001"
                                defaultValue={request?.id}
                                disabled
                                className="bg-muted"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="service-type">
                                Type de service {requiredMark}
                            </Label>
                            <Select defaultValue={request?.service} disabled={isViewMode}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Sélectionner un service" />
                                </SelectTrigger>
                                <SelectContent>
                                    {serviceTypes.map((service) => (
                                        <SelectItem key={service} value={service}>
                                            {service}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="client">
                                Client {requiredMark}
                            </Label>
                            <Select defaultValue={request?.requester.name} disabled={isViewMode}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Sélectionner un client" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Marie Traoré">Marie Traoré</SelectItem>
                                    <SelectItem value="Amadou Diarra">Amadou Diarra</SelectItem>
                                    <SelectItem value="Fatou Keita">Fatou Keita</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="billing-email">
                                Email de facturation {requiredMark}
                            </Label>
                            <Input
                                id="billing-email"
                                name="billingEmail"
                                type="email"
                                placeholder="email@example.com"
                                defaultValue={request?.requester.email}
                                disabled
                                className="bg-muted"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="comment">Commentaire</Label>
                        <Textarea
                            id="comment"
                            name="comment"
                            rows={3}
                            placeholder="Ajouter un commentaire..."
                            disabled={isViewMode}
                        />
                    </div>
                </div>

                {/* Localisation géographique */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Localisation géographique du service</h3>

                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="postal-code">
                                        Code postal {requiredMark}
                                    </Label>
                                    <Input
                                        id="postal-code"
                                        name="postalCode"
                                        placeholder="ex : 91002"
                                        defaultValue={request?.location.postalCode}
                                        disabled={isViewMode}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="region">Région</Label>
                                    <Select disabled>
                                        <SelectTrigger className="w-full bg-muted">
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
                            </div>

                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="latitude">Latitude</Label>
                                    <Input
                                        id="latitude"
                                        name="latitude"
                                        type="number"
                                        step="any"
                                        placeholder="ex : 12.6392"
                                        disabled
                                        className="bg-muted"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="longitude">Longitude</Label>
                                    <Input
                                        id="longitude"
                                        name="longitude"
                                        type="number"
                                        step="any"
                                        placeholder="ex : -8.0029"
                                        disabled
                                        className="bg-muted"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="mileage">Kilométrage</Label>
                                    <Input
                                        id="mileage"
                                        name="mileage"
                                        type="number"
                                        placeholder="ex : 150"
                                        disabled
                                        className="bg-muted"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Adresse</Label>
                                <Textarea
                                    id="address"
                                    name="address"
                                    rows={3}
                                    placeholder="ex : Quartier Badalabougou, commune V, Bamako"
                                    defaultValue={request?.location.address}
                                    disabled
                                    className="bg-muted"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Card className="relative flex h-full min-h-[300px] items-center justify-center rounded-lg border border-dashed border-muted-foreground/40 bg-muted/40 text-sm text-muted-foreground">
                                Prévisualisation de la carte (intégration à venir)
                            </Card>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Switch
                            id="same-address"
                            checked={sameAddress}
                            onCheckedChange={(checked) => {
                                if (isViewMode) return
                                setSameAddress(Boolean(checked))
                            }}
                            disabled={isViewMode}
                        />
                        <Label htmlFor="same-address" className="font-normal cursor-pointer">
                            L'adresse de facturation et du bâtiment à inspecter sont les mêmes
                        </Label>
                    </div>

                    {/* Localisation géographique du bâtiment (dupliquée) */}
                    {!sameAddress && (
                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="postal-code-2">
                                            Code postal {requiredMark}
                                        </Label>
                                        <Input
                                            id="postal-code-2"
                                            name="postalCodeBuilding"
                                            placeholder="ex : 91002"
                                            disabled={isViewMode}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="region-2">Région</Label>
                                        <Select disabled>
                                            <SelectTrigger className="w-full bg-muted">
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
                                </div>

                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="latitude-2">Latitude</Label>
                                        <Input
                                            id="latitude-2"
                                            name="latitudeBuilding"
                                            type="number"
                                            step="any"
                                            placeholder="ex : 12.6392"
                                            disabled
                                            className="bg-muted"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="longitude-2">Longitude</Label>
                                        <Input
                                            id="longitude-2"
                                            name="longitudeBuilding"
                                            type="number"
                                            step="any"
                                            placeholder="ex : -8.0029"
                                            disabled
                                            className="bg-muted"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="mileage-2">Kilométrage</Label>
                                        <Input
                                            id="mileage-2"
                                            name="mileageBuilding"
                                            type="number"
                                            placeholder="ex : 150"
                                            disabled
                                            className="bg-muted"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address-2">Adresse</Label>
                                    <Textarea
                                        id="address-2"
                                        name="addressBuilding"
                                        rows={3}
                                        placeholder="ex : Quartier Badalabougou, commune V, Bamako"
                                        disabled={isViewMode}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Card className="relative flex h-full min-h-[300px] items-center justify-center rounded-lg border border-dashed border-muted-foreground/40 bg-muted/40 text-sm text-muted-foreground">
                                    Prévisualisation de la carte (bâtiment à inspecter)
                                </Card>
                            </div>
                        </div>
                    )}
                </div>

                {/* Planning et exécution */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Planning et exécution</h3>

                    <div className="grid gap-4 md:grid-cols-5">
                        <div className="space-y-2">
                            <Label>
                                Date de début
                            </Label>
                            <DateField
                                label=""
                                date={serviceStartDate}
                                onSelect={setServiceStartDate}
                                disabled={isViewMode}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>
                                Date de fin
                            </Label>
                            <DateField
                                label=""
                                date={serviceEndDate}
                                onSelect={setServiceEndDate}
                                 disabled={isViewMode || noDeadline}
                            />
                        </div>

                         <div className="flex items-end space-y-2">
                             <div className="flex items-center space-x-2 pb-2">
                                 <Checkbox
                                     id="no-deadline"
                                     checked={noDeadline}
                                     onCheckedChange={(checked) => {
                                         if (isViewMode) return
                                         const value = Boolean(checked)
                                         setNoDeadline(value)
                                         if (value) {
                                             setServiceEndDate(undefined)
                                         }
                                     }}
                                     disabled={isViewMode}
                                 />
                                 <Label htmlFor="no-deadline" className="font-normal cursor-pointer">
                                     Pas de date limite
                                 </Label>
                             </div>
                         </div>

                        <div className="space-y-2">
                            <Label htmlFor="work-start-date">Date commencement travaux</Label>
                            <DateField
                                label=""
                                date={workStartDate}
                                onSelect={setWorkStartDate}
                                disabled={isViewMode}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="service-status">Statut de service</Label>
                            <Select disabled={isViewMode}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Sélectionner un statut" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pending">En attente</SelectItem>
                                    <SelectItem value="accepted">Accepté</SelectItem>
                                    <SelectItem value="in-progress">En cours</SelectItem>
                                    <SelectItem value="sent">Envoyée</SelectItem>
                                    <SelectItem value="completed">Achevé</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="progress">Avancement (%)</Label>
                            <Input
                                id="progress"
                                name="progress"
                                type="number"
                                min="0"
                                max="100"
                                placeholder="0"
                                disabled={isViewMode}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Fixed Footer with Actions */}
            {!isViewMode && (
                <div className="sticky bottom-0 mt-4 border-t bg-white pt-4">
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={onCancel}>
                            {t("common.cancel", { defaultValue: "Annuler" })}
                        </Button>
                        <Button onClick={onSubmit}>
                            {request
                                ? t("common.update", { defaultValue: "Mettre à jour" })
                                : t("common.create", { defaultValue: "Créer" })}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
