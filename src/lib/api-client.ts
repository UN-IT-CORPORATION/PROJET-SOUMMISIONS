const BASE_URL = import.meta.env.VITE_API_URL || "https://backsoumission.unityfianar.site/api"

export async function fetchClient<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${BASE_URL}${endpoint}`

    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    }

    const response = await fetch(url, {
        ...options,
        headers,
    })

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "An error occurred" }))
        throw new Error(error.message || response.statusText)
    }

    return response.json()
}
