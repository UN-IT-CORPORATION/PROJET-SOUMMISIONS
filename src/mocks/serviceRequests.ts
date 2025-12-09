import type { ServiceRequest } from "@/components/pages/projects/my-projects/view/service-requests/columns"

export const mockServiceRequests: ServiceRequest[] = [
    {
        id: "SR001",
        service: "AMIANTE",
        requester: {
            name: "Marie Traoré",
            email: "marie.traore@example.com",
        },
        assignedTo: {
            name: "Jean Dupont",
            avatar: undefined,
        },
        location: {
            address: "123 Rue de la République, Bamako",
            postalCode: "91002",
        },
        fileStatus: "complete",
        contractStatus: "in-progress",
        createdAt: "2024-11-15T10:30:00Z",
        creationSource: "internal",
        salesStatus: "sold",
        projectStatus: "created",
        clientType: "entreprise",
    },
    {
        id: "SR002",
        service: "ATTESTATION DE CONFORMITÉ",
        requester: {
            name: "Amadou Diarra",
            email: "amadou.diarra@example.com",
        },
        assignedTo: undefined,
        location: {
            address: "45 Avenue du Mali, Kayes",
            postalCode: "92001",
        },
        fileStatus: "incomplete",
        contractStatus: "pending",
        createdAt: "2024-11-20T14:15:00Z",
        creationSource: "external",
        salesStatus: "not-sold",
        projectStatus: "not-created",
        clientType: "particulier",
    },
    {
        id: "SR003",
        service: "DIAGNOSTIC ÉLECTRIQUE",
        requester: {
            name: "Fatou Keita",
            email: "fatou.keita@example.com",
        },
        assignedTo: {
            name: "Salif Sanogo",
            avatar: undefined,
        },
        location: {
            address: "78 Boulevard de l'Indépendance, Sikasso",
            postalCode: "93001",
        },
        fileStatus: "pending",
        contractStatus: "in-progress",
        createdAt: "2024-11-22T09:00:00Z",
        creationSource: "internal",
        salesStatus: "sold",
        projectStatus: "created",
        clientType: "entreprise",
    },
    {
        id: "SR004",
        service: "PLOMB",
        requester: {
            name: "Ibrahim Coulibaly",
            email: "ibrahim.coulibaly@example.com",
        },
        assignedTo: {
            name: "Aïssata Touré",
            avatar: undefined,
        },
        location: {
            address: "12 Rue des Martyrs, Ségou",
            postalCode: "94001",
        },
        fileStatus: "complete",
        contractStatus: "completed",
        createdAt: "2024-11-18T11:45:00Z",
        creationSource: "internal",
        salesStatus: "sold",
        projectStatus: "created",
        clientType: "particulier",
    },
    {
        id: "SR005",
        service: "GAZ",
        requester: {
            name: "Salif Sanogo",
            email: "salif.sanogo@example.com",
        },
        assignedTo: {
            name: "Moussa Koné",
            avatar: undefined,
        },
        location: {
            address: "34 Avenue de la Liberté, Mopti",
            postalCode: "95001",
        },
        fileStatus: "complete",
        contractStatus: "completed",
        createdAt: "2024-11-10T08:20:00Z",
        creationSource: "external",
        salesStatus: "sold",
        projectStatus: "created",
        clientType: "entreprise",
    },
]
