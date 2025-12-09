import type { ColumnDef } from "@tanstack/react-table"
import type { TFunction } from "i18next"
import { Button } from "@/components/ui/button"
import { Eye, MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type ServiceRequest = {
    id: string
    service: string
    requester: {
        name: string
        email: string
    }
    assignedTo?: {
        name: string
        avatar?: string
    }
    location: {
        address: string
        postalCode: string
    }
    fileStatus: "incomplete" | "complete" | "pending"
    contractStatus: "in-progress" | "completed" | "pending" | "cancelled"
    createdAt: string
    creationSource: "internal" | "external"
    salesStatus: "sold" | "not-sold"
    projectStatus: "created" | "not-created"
    clientType: "entreprise" | "particulier"
}

const fileStatusColors = {
    incomplete: "bg-red-100 text-red-800 border-red-300",
    complete: "bg-green-100 text-green-800 border-green-300",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
}

const contractStatusColors = {
    "in-progress": "bg-blue-100 text-blue-800 border-blue-300",
    completed: "bg-green-100 text-green-800 border-green-300",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    cancelled: "bg-gray-100 text-gray-800 border-gray-300",
}

const salesStatusColors = {
    sold: "bg-green-100 text-green-800 border-green-300",
    "not-sold": "bg-gray-100 text-gray-800 border-gray-300",
}

const projectStatusColors = {
    created: "bg-green-100 text-green-800 border-green-300",
    "not-created": "bg-gray-100 text-gray-800 border-gray-300",
}

const fileStatusLabels = {
    incomplete: "Incomplète",
    complete: "Complète",
    pending: "En attente",
}

const contractStatusLabels = {
    "in-progress": "En cours",
    completed: "Terminé",
    pending: "En attente",
    cancelled: "Annulé",
}

const salesStatusLabels = {
    sold: "Vendu",
    "not-sold": "Non vendu",
}

const projectStatusLabels = {
    created: "Créé",
    "not-created": "Non créé",
}

const creationSourceLabels = {
    internal: "Interne",
    external: "Externe",
}

export function getServiceRequestColumns(
    t: TFunction,
    onViewDetails: (request: ServiceRequest) => void
): ColumnDef<ServiceRequest>[] {
    // t parameter kept for future i18n needs
    return [
        {
            accessorKey: "id",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="cursor-pointer"
                >
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                return <div className="font-medium">{row.getValue("id")}</div>
            },
        },
        {
            accessorKey: "service",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="cursor-pointer"
                >
                    SERVICE
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                return <div className="font-medium">{row.getValue("service")}</div>
            },
        },
        {
            accessorKey: "requester",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="cursor-pointer"
                >
                    DEMANDEUR
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const requester = row.getValue("requester") as ServiceRequest["requester"]
                return (
                    <div className="flex flex-col">
                        <span className="font-medium">{requester.name}</span>
                        <span className="text-xs text-muted-foreground">{requester.email}</span>
                    </div>
                )
            },
        },
        {
            accessorKey: "assignedTo",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="cursor-pointer"
                >
                    ASSIGNÉ À
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const assignedTo = row.getValue("assignedTo") as ServiceRequest["assignedTo"]
                if (!assignedTo) return <span className="text-muted-foreground text-sm">Non assigné</span>
                return (
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={assignedTo.avatar} />
                            <AvatarFallback>{assignedTo.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{assignedTo.name}</span>
                    </div>
                )
            },
        },
        {
            accessorKey: "location",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="cursor-pointer"
                >
                    LOCALISATION
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const location = row.getValue("location") as ServiceRequest["location"]
                return (
                    <div className="flex flex-col">
                        <span className="text-sm">{location.address}</span>
                        <span className="text-xs text-muted-foreground">{location.postalCode}</span>
                    </div>
                )
            },
        },
        {
            accessorKey: "fileStatus",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="cursor-pointer"
                >
                    STATUT FICHIER
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const status = row.getValue("fileStatus") as ServiceRequest["fileStatus"]
                return (
                    <div className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${fileStatusColors[status]}`}>
                        {fileStatusLabels[status]}
                    </div>
                )
            },
        },
        {
            accessorKey: "contractStatus",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="cursor-pointer"
                >
                    STATUT DU CONTRAT
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const status = row.getValue("contractStatus") as ServiceRequest["contractStatus"]
                return (
                    <div className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${contractStatusColors[status]}`}>
                        {contractStatusLabels[status]}
                    </div>
                )
            },
        },
        {
            accessorKey: "createdAt",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="cursor-pointer"
                >
                    CRÉATION
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                return new Date(row.getValue("createdAt")).toLocaleDateString("fr-FR")
            },
        },
        {
            accessorKey: "creationSource",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="cursor-pointer"
                >
                    LIEU DE CRÉATION
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const source = row.getValue("creationSource") as ServiceRequest["creationSource"]
                return <span className="text-sm">{creationSourceLabels[source]}</span>
            },
        },
        {
            accessorKey: "salesStatus",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="cursor-pointer"
                >
                    STATUT
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const status = row.getValue("salesStatus") as ServiceRequest["salesStatus"]
                return (
                    <div className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${salesStatusColors[status]}`}>
                        {salesStatusLabels[status]}
                    </div>
                )
            },
        },
        {
            accessorKey: "projectStatus",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="cursor-pointer"
                >
                    PROJET
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const status = row.getValue("projectStatus") as ServiceRequest["projectStatus"]
                return (
                    <div className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${projectStatusColors[status]}`}>
                        {projectStatusLabels[status]}
                    </div>
                )
            },
        },
        {
            id: "actions",
            header: "ACTIONS",
            enableHiding: false,
            cell: ({ row }) => {
                const request = row.original

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => onViewDetails(request)}>
                                <Eye className="mr-2 h-4 w-4" />
                                Voir détails
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]
}
