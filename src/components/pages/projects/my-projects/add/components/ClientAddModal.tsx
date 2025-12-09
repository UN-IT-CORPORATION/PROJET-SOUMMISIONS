import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

const requiredMark = <span className="text-red-500">*</span>

type ClientAddModalProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ClientAddModal({ open, onOpenChange }: ClientAddModalProps) {
    const handleSave = () => {
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ajouter un client</DialogTitle>
                    <DialogDescription>Tous les champs sont obligatoires.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="client-lastname">
                            Nom {requiredMark}
                        </Label>
                        <Input id="client-lastname" placeholder="ex : Diallo" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="client-firstname">
                            Prénom {requiredMark}
                        </Label>
                        <Input id="client-firstname" placeholder="ex : Mariam" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="client-phone">
                            Téléphone {requiredMark}
                        </Label>
                        <Input id="client-phone" type="tel" inputMode="numeric" placeholder="+223 00 00 00 00" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="client-email">
                            Email {requiredMark}
                        </Label>
                        <Input id="client-email" type="email" placeholder="ex : client@organisation.org" required />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="client-address">
                            Adresse {requiredMark}
                        </Label>
                        <Textarea
                            id="client-address"
                            placeholder="Rue, ville, pays"
                            required
                            rows={3}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" className="cursor-pointer">Annuler</Button>
                    </DialogClose>
                    <Button type="button" onClick={handleSave} className="cursor-pointer">
                        Enregistrer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

