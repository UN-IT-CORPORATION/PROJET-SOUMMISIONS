import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

type SlideOverSize = "sm" | "md" | "lg"

const SIDEBAR_WIDTH = 260
const mainWidth = `calc(100vw - ${SIDEBAR_WIDTH}px)`
const widthMap: Record<SlideOverSize, string> = {
    sm: `calc(${mainWidth} / 3)`,
    md: `calc(${mainWidth} / 2)`,
    lg: mainWidth,
}

interface SlideOverProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    size?: SlideOverSize
    title?: string
    description?: string
    children: React.ReactNode
    footer?: React.ReactNode
}

export function SlideOver({ open, onOpenChange, size = "md", title, description, children, footer }: SlideOverProps) {
    return (
        <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-black/40" />
                <DialogPrimitive.Content
                    className={cn(
                        "fixed right-0 top-0 z-50 flex h-full max-h-screen w-full flex-col bg-white shadow-2xl",
                        "animate-in slide-in-from-right duration-200",
                        "md:[width:var(--slide-width)]"
                    )}
                    style={{ ["--slide-width" as string]: widthMap[size] }}
                >
                    <div className="flex items-start justify-between border-b px-6 py-4">
                        <div className="space-y-1">
                            {title && <h2 className="text-lg font-semibold text-gray-900">{title}</h2>}
                            {description && <p className="text-sm text-muted-foreground">{description}</p>}
                        </div>
                        <DialogPrimitive.Close className="rounded-full p-1 text-muted-foreground transition hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring cursor-pointer">
                            <X className="h-5 w-5" />
                            <span className="sr-only">Close</span>
                        </DialogPrimitive.Close>
                    </div>
                    <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
                    {footer && <div className="border-t bg-white px-6 py-4">{footer}</div>}
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    )
}

