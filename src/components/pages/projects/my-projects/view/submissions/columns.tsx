
import type { ColumnDef } from "@tanstack/react-table"
import type { TFunction } from "i18next"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { ArrowUpDown, FileText } from "lucide-react"
import type { Submission } from "@/mocks/submissions"

function IntentionBadge({ intention }: { intention: Submission["intention"] }) {
    const meta: Record<
        Submission["intention"],
        {
            label: string
            className: string
        }
    > = {
        yes: { label: "Oui", className: "bg-green-50 text-green-700" },
        no: { label: "Non", className: "bg-red-50 text-red-700" },
        maybe: { label: "Peut-être", className: "bg-yellow-50 text-yellow-700" },
    }

    const conf = meta[intention]

    return (
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${conf.className}`}>
            {conf.label}
        </span>
    )
}

function QuoteDetailsDialog({ submission }: { submission: Submission }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="cursor-pointer">
                    Détails
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Devis de {submission.name}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 sm:grid-cols-2 pt-2">
                    {submission.quotes.slice(0, 2).map((quote, index) => (
                        <div
                            key={index}
                            className="flex flex-col justify-between rounded-md border border-border bg-white shadow-sm"
                        >
                            <div className="p-4 space-y-1">
                                <p className="font-semibold text-gray-900 break-words">{quote.name}</p>
                                <p className="text-xs text-muted-foreground">{quote.sizeLabel}</p>
                            </div>
                            <div className="flex flex-1 items-center justify-center">
                                <div className="flex h-24 w-full items-center justify-center bg-blue-50 text-blue-600">
                                    <FileText className="h-10 w-10" />
                                </div>
                            </div>
                            <div className="p-4 text-xs text-muted-foreground">
                                <p className="text-xs text-muted-foreground">Ajouté le {quote.addedAt}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <Button variant="outline" className="cursor-pointer">
                        Fermer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export function getSubmissionColumns(t: TFunction): ColumnDef<Submission>[] {
    return [
        {
            accessorKey: "name",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="cursor-pointer"
                >
                    {t("projects.details.submissions.columns.name", { defaultValue: "Nom" })}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <span className="font-semibold text-gray-900">{row.original.name}</span>,
        },
        {
            accessorKey: "email",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="cursor-pointer"
                >
                    {t("projects.details.submissions.columns.email", { defaultValue: "Email" })}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <span className="text-sm text-gray-800">{row.original.email}</span>,
        },
        {
            accessorKey: "intention",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="cursor-pointer"
                >
                    {t("projects.details.submissions.columns.intention", { defaultValue: "Intention" })}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <IntentionBadge intention={row.original.intention} />,
        },
        {
            accessorKey: "quotes",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="cursor-pointer"
                >
                    {t("projects.details.submissions.columns.quote", { defaultValue: "Devis" })}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const quotes = row.original.quotes
                if (!quotes.length) return <span className="text-sm text-gray-500">Aucun devis</span>

                const uniqueTypes = Array.from(new Set(quotes.map((q) => q.type).filter(Boolean)))

                return (
                    <span className="text-sm text-gray-800">
                        {uniqueTypes.join(", ")}
                    </span>
                )
            },
        },
        {
            id: "actions",
            header: () => (
                <span className="uppercase text-xs font-semibold">
                    {t("projects.details.submissions.columns.actions", { defaultValue: "Actions" })}
                </span>
            ),
            cell: ({ row }) => <QuoteDetailsDialog submission={row.original} />,
        },
    ]
}


