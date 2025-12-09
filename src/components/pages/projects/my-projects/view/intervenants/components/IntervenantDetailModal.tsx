import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Intervenant } from "../columns"

interface IntervenantDetailModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    intervenant: Intervenant | null
}

const serviceColorPalette = [
    "bg-blue-50 text-blue-700",
    "bg-green-50 text-green-700",
    "bg-purple-50 text-purple-700",
    "bg-amber-50 text-amber-700",
    "bg-rose-50 text-rose-700",
    "bg-cyan-50 text-cyan-700",
]

export function IntervenantDetailModal({ open, onOpenChange, intervenant }: IntervenantDetailModalProps) {
    const serviceBadges = React.useMemo(() => {
        if (!intervenant) return []
        return intervenant.services.map((service, index) => ({
            label: service.label,
            className: service.color ?? serviceColorPalette[index % serviceColorPalette.length],
        }))
    }, [intervenant])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Détails intervenant</DialogTitle>
                </DialogHeader>

                {intervenant && (
                    <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Nom complet</Label>
                                <Input value={intervenant.fullName} disabled readOnly className="w-full" />
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input value={intervenant.email} disabled readOnly className="w-full" />
                            </div>
                            <div className="space-y-2">
                                <Label>Poste</Label>
                                <Select value={intervenant.role} disabled>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Poste" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={intervenant.role}>{intervenant.role}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Téléphone</Label>
                                <Input value={intervenant.phone} disabled readOnly className="w-full" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Services</Label>
                            {serviceBadges.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {serviceBadges.map((service) => (
                                        <span
                                            key={service.label}
                                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${service.className}`}
                                        >
                                            {service.label}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">Aucun service renseigné.</p>
                            )}
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}


