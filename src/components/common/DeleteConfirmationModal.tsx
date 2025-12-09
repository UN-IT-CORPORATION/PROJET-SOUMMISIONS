import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface DeleteConfirmationModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: () => void
    title?: string
    description?: string
    itemName?: string
}

export function DeleteConfirmationModal({
    open,
    onOpenChange,
    onConfirm,
    title = "Confirmer la suppression",
    description = "Êtes-vous sûr de vouloir supprimer cet élément ?",
    itemName,
}: DeleteConfirmationModalProps) {
    const handleConfirm = () => {
        onConfirm()
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                        </div>
                        <DialogTitle>{title}</DialogTitle>
                    </div>
                    <DialogDescription className="pt-3">
                        {description}
                        {itemName && (
                            <span className="block mt-2 font-semibold text-gray-900">
                                {itemName}
                            </span>
                        )}
                        <span className="block mt-2 text-red-600">
                            Cette action est irréversible.
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="cursor-pointer"
                    >
                        Annuler
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleConfirm}
                        className="cursor-pointer bg-red-600 hover:bg-red-700"
                    >
                        Supprimer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
