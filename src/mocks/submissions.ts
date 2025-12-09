export type SubmissionIntention = "yes" | "no" | "maybe"

export type SubmissionQuote = {
    name: string
    url: string
    type: string // ex: Métaux, Matériaux, Main d'œuvre...
    sizeLabel: string
    addedAt: string
}

export type Submission = {
    id: string
    name: string
    email: string
    intention: SubmissionIntention
    quotes: SubmissionQuote[] // 1 ou plusieurs devis
}

export const mockSubmissions: Submission[] = [
    {
        id: "sub-1",
        name: "Entreprise Alpha",
        email: "contact@alpha.com",
        intention: "yes",
        quotes: [
            { name: "Devis Métaux Alpha.pdf", url: "#", type: "Métaux", sizeLabel: "1.2 Mo", addedAt: "12 nov. 2025" },
            { name: "Devis Matériaux Alpha.pdf", url: "#", type: "Matériaux", sizeLabel: "850 Ko", addedAt: "12 nov. 2025" },
        ],
    },
    {
        id: "sub-2",
        name: "Entreprise Beta",
        email: "info@beta.com",
        intention: "maybe",
        quotes: [
            { name: "Devis Matériaux Beta.pdf", url: "#", type: "Matériaux", sizeLabel: "640 Ko", addedAt: "10 nov. 2025" },
        ],
    },
    {
        id: "sub-3",
        name: "Entreprise Gamma",
        email: "contact@gamma.com",
        intention: "no",
        quotes: [
            { name: "Devis Main d'œuvre Gamma.pdf", url: "#", type: "Main d'œuvre", sizeLabel: "1.8 Mo", addedAt: "08 nov. 2025" },
        ],
    },
]


