import React from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SendTenderModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: (tenderName: string, type: "fourniseur" | "appel_offres_devis_projets") => void
}

export function SendTenderModal({ open, onOpenChange, onConfirm }: SendTenderModalProps) {
    const [tenderName, setTenderName] = React.useState("")
    const [tenderType, setTenderType] = React.useState<"fourniseur" | "appel_offres_devis_projets" | "">("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (tenderName.trim() && tenderType) {
            onConfirm(tenderName.trim(), tenderType)
            setTenderName("")
            setTenderType("")
            onOpenChange(false)
        }
    }

    const handleCancel = () => {
        setTenderName("")
        setTenderType("")
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Envoyer un appel d'offres</DialogTitle>
                    <DialogDescription>
                        Veuillez saisir le nom de l'appel d'offres à envoyer aux intervenants sélectionnés.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="tender-name">Nom de l'appel d'offres</Label>
                            <Input
                                id="tender-name"
                                placeholder="Ex: Appel d'offres - Construction Bâtiment A"
                                value={tenderName}
                                onChange={(e) => setTenderName(e.target.value)}
                                autoFocus
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Type</Label>
                            <Select value={tenderType} onValueChange={(value) => setTenderType(value as any)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Sélectionner un type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="fourniseur">Fourniseur</SelectItem>
                                    <SelectItem value="appel_offres_devis_projets">Appel d'offres devis projets</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleCancel}>
                            Annuler
                        </Button>
                        <Button type="submit" disabled={!tenderName.trim() || !tenderType}>
                            Envoyer
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
