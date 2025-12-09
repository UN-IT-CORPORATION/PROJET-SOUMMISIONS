import { Outlet } from "@tanstack/react-router"
import { Sidebar } from "@/components/layout/Sidebar"
import { Navbar } from "@/components/layout/Navbar"
import { useState } from "react"

export function DashboardLayout() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <div className="flex min-h-screen">
            <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
            <div className="ml-0 md:ml-64 flex w-full flex-col overflow-x-hidden">
                <Navbar setIsMobileMenuOpen={setIsMobileMenuOpen} />
                <main className="flex-1 bg-gray-50 p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
