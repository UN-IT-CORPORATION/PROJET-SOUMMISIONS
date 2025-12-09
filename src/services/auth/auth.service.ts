import { fetchClient } from "@/lib/api-client"
import type { LoginCredentials, AuthResponse, ForgotPasswordCredentials } from "@/type/auth"

export const authService = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        return fetchClient<AuthResponse>("/login", {
            method: "POST",
            body: JSON.stringify(credentials),
        })
    },

    forgotPassword: async (data: ForgotPasswordCredentials): Promise<{ message: string }> => {
        return fetchClient<{ message: string }>("/forgot-password", {
            method: "POST",
            body: JSON.stringify(data),
        })
    },

    logout: () => {
        // Implement logout logic (e.g., clear tokens)
        localStorage.removeItem("token")
    }
}
