export interface Project {
    id: string
    name: string
    reference: string
    submissionPeriod: {
        start: string
        end: string
    }
    type: string
    status: "initiated" | "requested"
    createdAt: string
    updatedAt: string
}

export const mockProjects: Project[] = [
    {
        id: "PRJ001",
        name: "Construction Centre Commercial",
        reference: "REF-2024-001",
        submissionPeriod: {
            start: "2024-01-15",
            end: "2024-02-15"
        },
        type: "Commercial",
        status: "initiated",
        createdAt: "2024-01-10",
        updatedAt: "2024-01-20",
    },
    {
        id: "PRJ002",
        name: "Usine de Production",
        reference: "REF-2024-002",
        submissionPeriod: {
            start: "2024-02-01",
            end: "2024-03-01"
        },
        type: "Industriel lourd",
        status: "requested",
        createdAt: "2024-01-25",
        updatedAt: "2024-02-05",
    },
    {
        id: "PRJ003",
        name: "Complexe Résidentiel",
        reference: "REF-2023-089",
        submissionPeriod: {
            start: "2023-09-01",
            end: "2023-10-01"
        },
        type: "Multirésidentiel lourd",
        status: "initiated",
        createdAt: "2023-08-15",
        updatedAt: "2024-03-15",
    },
    {
        id: "PRJ004",
        name: "Atelier Mécanique",
        reference: "REF-2024-003",
        submissionPeriod: {
            start: "2024-04-01",
            end: "2024-05-01"
        },
        type: "Industriel léger",
        status: "requested",
        createdAt: "2024-03-20",
        updatedAt: "2024-03-22",
    },
    {
        id: "PRJ005",
        name: "Maison Unifamiliale",
        reference: "REF-2024-004",
        submissionPeriod: {
            start: "2024-03-01",
            end: "2024-03-15"
        },
        type: "Résidentiel",
        status: "initiated",
        createdAt: "2024-02-28",
        updatedAt: "2024-03-05",
    },
    {
        id: "PRJ006",
        name: "Immeuble à Logements",
        reference: "REF-2024-005",
        submissionPeriod: {
            start: "2024-05-01",
            end: "2024-06-01"
        },
        type: "Multirésidentiel léger",
        status: "requested",
        createdAt: "2024-04-15",
        updatedAt: "2024-04-20",
    },
    {
        id: "PRJ007",
        name: "Usine de Transformation",
        reference: "REF-2024-006",
        submissionPeriod: {
            start: "2024-06-01",
            end: "2024-07-01"
        },
        type: "Industriel moyen",
        status: "initiated",
        createdAt: "2024-05-10",
        updatedAt: "2024-05-15",
    },
]
