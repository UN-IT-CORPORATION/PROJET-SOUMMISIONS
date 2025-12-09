import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface IntentionModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (intention: "yes" | "no" | "maybe") => void
}

export function IntentionModal({ open, onOpenChange, onSubmit }: IntentionModalProps) {
    const [intention, setIntention] = React.useState<"yes" | "no" | "maybe">("maybe")

    const handleSubmit = () => {
        onSubmit(intention)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Ajouter une intention</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <RadioGroup value={intention} onValueChange={(v) => setIntention(v as any)}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="yes" className="cursor-pointer" />
                            <Label htmlFor="yes" className="cursor-pointer">Oui</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="no" className="cursor-pointer" />
                            <Label htmlFor="no" className="cursor-pointer">Non</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="maybe" id="maybe" className="cursor-pointer" />
                            <Label htmlFor="maybe" className="cursor-pointer">Peut-être</Label>
                        </div>
                    </RadioGroup>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="cursor-pointer">Annuler</Button>
                    <Button onClick={handleSubmit} className="cursor-pointer">Enregistrer</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
