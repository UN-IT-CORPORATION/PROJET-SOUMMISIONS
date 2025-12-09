import React from "react"
import { Link, useLocation } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import { LayoutDashboard, FolderKanban, FileText, LogOut, ChevronDown, ChevronRight } from "lucide-react"
import { authService } from "@/services/auth/auth.service"
import { useNavigate } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"

interface SidebarProps {
    isMobileMenuOpen: boolean
    setIsMobileMenuOpen: (open: boolean) => void
}

export function Sidebar({ isMobileMenuOpen, setIsMobileMenuOpen }: SidebarProps) {
    const { t } = useTranslation()
    const location = useLocation()
    const navigate = useNavigate()
    const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = React.useState(false)
    const [isProjectsExpanded, setIsProjectsExpanded] = React.useState(true)

    const menuItems = [
        {
            title: t("sidebar.dashboard"),
            icon: LayoutDashboard,
            href: "/dashboard",
        },
    ]

    const projectSubMenuItems = [
        {
            title: t("sidebar.my_projects"),
            href: "/projects",
        },
        {
            title: t("sidebar.invited_projects"),
            href: "/projects/invited",
        },
    ]

    const handleLogout = () => {
        authService.logout()
        navigate({ to: "/" })
    }

    const confirmLogout = () => {
        setIsLogoutConfirmOpen(false)
        handleLogout()
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    const isProjectsActive = location.pathname.startsWith("/projects")

    return (
        <>
            {/* Overlay for mobile */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={closeMobileMenu}
                />
            )}

            {/* Sidebar */}
            <div className={cn(
                "fixed left-0 top-0 z-50 flex h-screen w-72 md:w-64 flex-col bg-[#12161D] text-white transition-transform duration-300 ease-in-out",
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            )}>
                {/* Logo - Fixed at top */}
                <div className="flex h-22 shrink-0 items-center justify-center bg-[#12161D]">
                    <img src="/images/logo.png" alt="Logo" className="h-16 w-auto" />
                </div>

                {/* Menu - Scrollable */}
                <div className="flex-1 overflow-y-auto py-4">
                    <nav className="space-y-2 px-2">
                        {menuItems.map((item) => {
                            const isDashboard = item.href === "/dashboard"
                            const isActive =
                                isDashboard
                                    ? location.pathname === item.href
                                    : location.pathname === item.href || location.pathname.startsWith(`${item.href}/`)
                            return (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    onClick={closeMobileMenu}
                                    className={cn(
                                        "group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-[#E21B3C] text-white"
                                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                    )}
                                >
                                    <item.icon
                                        className={cn(
                                            "mr-3 h-5 w-5 shrink-0",
                                            isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                                        )}
                                    />
                                    {item.title}
                                </Link>
                            )
                        })}

                        {/* Projects Menu with Submenu */}
                        <div className="space-y-1">
                            <button
                                onClick={() => setIsProjectsExpanded(!isProjectsExpanded)}
                                className={cn(
                                    "group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium transition-colors cursor-pointer",
                                    isProjectsActive
                                        ? "bg-[#E21B3C] text-white"
                                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                )}
                            >
                                <FolderKanban
                                    className={cn(
                                        "mr-3 h-5 w-5 shrink-0",
                                        isProjectsActive ? "text-white" : "text-gray-400 group-hover:text-white"
                                    )}
                                />
                                <span className="flex-1 text-left">{t("sidebar.projects")}</span>
                                {isProjectsExpanded ? (
                                    <ChevronDown className="h-4 w-4" />
                                ) : (
                                    <ChevronRight className="h-4 w-4" />
                                )}
                            </button>

                            {/* Submenu */}
                            {isProjectsExpanded && (
                                <div className="ml-4 space-y-1 border-l border-gray-700 pl-4">
                                    {projectSubMenuItems.map((subItem) => {
                                        const isActive = subItem.href === "/projects"
                                            ? (location.pathname === "/projects" || location.pathname.startsWith("/projects/view") || location.pathname.startsWith("/projects/add"))
                                            : location.pathname.startsWith(subItem.href)
                                        return (
                                            <Link
                                                key={subItem.href}
                                                to={subItem.href}
                                                onClick={closeMobileMenu}
                                                className={cn(
                                                    "group flex items-center rounded-md px-2 py-1.5 text-sm transition-colors",
                                                    isActive
                                                        ? "bg-gray-800 text-white font-medium"
                                                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                                )}
                                            >
                                                {subItem.title}
                                            </Link>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </nav>
                </div>

                {/* Logout - Fixed at bottom */}
                <div className="shrink-0 p-2">
                    <button
                        onClick={() => setIsLogoutConfirmOpen(true)}
                        className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-white cursor-pointer"
                    >
                        <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-white" />
                        {t("sidebar.logout")}
                    </button>
                </div>
            </div>

            {isLogoutConfirmOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/70" onClick={() => setIsLogoutConfirmOpen(false)} />
                    <div className="relative z-10 w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl">
                        <h2 className="text-lg font-semibold text-gray-900">{t("sidebar.logout_confirm_title")}</h2>
                        <p className="mt-2 text-sm text-muted-foreground">{t("sidebar.logout_confirm_description")}</p>
                        <div className="mt-6 flex justify-end gap-3">
                            <Button
                                variant="outline"
                                className="cursor-pointer"
                                onClick={() => setIsLogoutConfirmOpen(false)}
                            >
                                {t("sidebar.logout_cancel")}
                            </Button>
                            <Button variant="destructive" className="cursor-pointer" onClick={confirmLogout}>
                                {t("sidebar.logout_confirm")}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
