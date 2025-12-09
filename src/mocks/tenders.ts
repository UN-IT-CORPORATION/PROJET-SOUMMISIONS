export type TenderStatus = "sent" | "failed"

export type Tender = {
    id: string
    name: string
    date: string
    status: TenderStatus
    intervenantCount: number
}

export const mockTenders: Tender[] = [
    {
        id: "tdr-1",
        name: "Extension réseau hydraulique",
        date: "12 nov. 2025",
        status: "sent",
        intervenantCount: 8,
    },
    {
        id: "tdr-2",
        name: "Modernisation centre de santé",
        date: "09 nov. 2025",
        status: "failed",
        intervenantCount: 5,
    },
    {
        id: "tdr-3",
        name: "Fourniture kits scolaires",
        date: "05 nov. 2025",
        status: "sent",
        intervenantCount: 12,
    },
    {
        id: "tdr-4",
        name: "Programme d’assainissement urbain",
        date: "01 nov. 2025",
        status: "failed",
        intervenantCount: 4,
    },
]


