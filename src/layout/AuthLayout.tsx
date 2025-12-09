import { Outlet } from "@tanstack/react-router"

export function AuthLayout() {
    return (
        <main className="flex min-h-screen w-full items-center justify-center bg-[url('/images/backgroundimage.png')] bg-cover bg-center bg-no-repeat p-4">
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white/90 shadow-2xl backdrop-blur-xl dark:bg-gray-900/90">
                <Outlet />
            </div>
        </main>
    )
}
