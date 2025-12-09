export type TenderIntervenantStatus = "sent" | "failed"

export type TenderReportRow = {
    id: string
    tenderId: string
    intervenantName: string
    role: string
    email: string
    status: TenderIntervenantStatus
}

const firstNames = [
    "Aïcha", "Moussa", "Fatou", "Amadou", "Kadiatou", "Ibrahima", "Aminata", "Boubacar", "Mariam", "Ousmane",
    "Hawa", "Sékou", "Aissata", "Mamadou", "Ramatou", "Lamine", "Awa", "Modibo", "Fanta", "Bakary",
    "Nafissatou", "Cheick", "Aminata", "Samba", "Kadidia", "Youssouf", "Mariama", "Ibrahima", "Aissatou", "Mamoudou",
    "Fatimata", "Boubacar", "Aminata", "Oumar", "Rokhaya", "Moussa", "Awa", "Amadou", "Kadiatou", "Ibrahima",
]

const lastNames = [
    "Traoré", "Diallo", "Diarra", "Koné", "Sangaré", "Cissé", "Touré", "Keita", "Coulibaly", "Ba",
    "Sow", "Ndiaye", "Sy", "Fall", "Diop", "Thiam", "Kane", "Niang", "Gueye", "Seck",
    "Sarr", "Diouf", "Mbaye", "Faye", "Camara", "Bah", "Barry", "Diallo", "Sidibé", "Doumbia",
    "Kouyaté", "Sanogo", "Dembélé", "Bamba", "Ouattara", "Yattara", "Sangaré", "Coulibaly", "Traoré", "Diallo",
]

const roles = ["Chef de projet", "Coordinateur", "Analyste", "Ingénieur", "Consultant", "Expert technique"]

function generateMockReports(count: number, tenderId: string): TenderReportRow[] {
    const reports: TenderReportRow[] = []
    
    for (let i = 0; i < count; i++) {
        const firstName = firstNames[i % firstNames.length]
        const lastName = lastNames[Math.floor(i / firstNames.length) % lastNames.length]
        const intervenantName = `${firstName} ${lastName}${i >= firstNames.length ? ` ${Math.floor(i / (firstNames.length * lastNames.length)) + 1}` : ""}`
        const role = roles[i % roles.length]
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i > 0 ? i : ""}@example.com`
        const status: TenderIntervenantStatus = Math.random() > 0.3 ? "sent" : "failed"
        
        reports.push({
            id: `report-${i + 1}`,
            tenderId,
            intervenantName,
            role,
            email,
            status,
        })
    }
    
    return reports
}

export const mockTenderReports: TenderReportRow[] = [
    ...generateMockReports(120, "tdr-1"),
    {
        id: "report-other-1",
        tenderId: "tdr-2",
        intervenantName: "Test Intervenant",
        role: "Chef de projet",
        email: "test@example.com",
        status: "sent",
    },
]


