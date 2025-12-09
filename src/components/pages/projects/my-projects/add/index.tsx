import React from "react"
import { Outlet, useLocation, useNavigate } from "@tanstack/react-router"
import { Card } from "@/components/ui/card"
import { DynamicBreadcrumb } from "@/components/layout/DynamicBreadcrumb"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Info, MapPin, CalendarDays, Building2, FolderArchive, ArrowRight, ArrowLeft } from "lucide-react"
import { FaCircleCheck } from "react-icons/fa6"

export function ProjectAddLayout() {
    const { t } = useTranslation()
    const location = useLocation()
    const navigate = useNavigate()
    const steps = React.useMemo(
        () => [
            {
                id: "step-1",
                label: t("projects.add.steps.basic.title", { defaultValue: "Informations de base" }),
                description: t("projects.add.steps.basic.description_long", {
                    defaultValue:
                        "Définissez les informations essentielles du projet : contexte, objectifs et cadre de réalisation afin de guider les étapes suivantes.",
                }),
                path: "/projects/add/step-1" as const,
                icon: Info,
                badge: "bg-blue-50 text-blue-600",
            },
            {
                id: "step-2",
                label: t("projects.add.steps.location.title", { defaultValue: "Localisation géographique" }),
                description: t("projects.add.steps.location.description_long", {
                    defaultValue:
                        "Précisez l’emplacement exact du projet pour faciliter le suivi terrain et la coordination avec les partenaires.",
                }),
                path: "/projects/add/step-2" as const,
                icon: MapPin,
                badge: "bg-cyan-50 text-cyan-600",
            },
            {
                id: "step-3",
                label: t("projects.add.steps.planning.title", { defaultValue: "Planning" }),
                description: t("projects.add.steps.planning.description_long", {
                    defaultValue:
                        "Planifiez les différentes périodes du projet pour assurer une mobilisation et une validation efficaces.",
                }),
                path: "/projects/add/step-3" as const,
                icon: CalendarDays,
                badge: "bg-amber-50 text-amber-600",
            },
            {
                id: "step-4",
                label: t("projects.add.steps.files.title", { defaultValue: "Fichiers initiaux" }),
                description: t("projects.add.steps.files.description_long", {
                    defaultValue:
                        "Ajoutez les devis, plans et documents techniques afin de compléter le dossier du projet.",
                }),
                path: "/projects/add/step-4" as const,
                icon: FolderArchive,
                badge: "bg-purple-50 text-purple-600",
            },
            {
                id: "step-5",
                label: t("projects.add.steps.services.title", { defaultValue: "Services" }),
                description: t("projects.add.steps.services.description_long", {
                    defaultValue:
                        "Sélectionnez les services requis pour ce projet afin de définir le périmètre d'intervention.",
                }),
                path: "/projects/add/step-5" as const,
                icon: Building2,
                badge: "bg-green-50 text-green-600",
            },
        ],
        [t]
    )

    const currentStepIndex = React.useMemo(
        () => steps.findIndex((step) => step.path === location.pathname),
        [steps, location.pathname]
    )
    const isFirstStep = currentStepIndex <= 0
    const isLastStep = currentStepIndex === steps.length - 1

    const handleNavigateToStep = (index: number) => {
        const target = steps[index]
        if (target) {
            navigate({ to: target.path })
        }
    }

    const handleNext = () => {
        if (!isLastStep) {
            handleNavigateToStep(currentStepIndex + 1)
        }
    }

    const handlePrevious = () => {
        if (!isFirstStep) {
            handleNavigateToStep(currentStepIndex - 1)
        }
    }

    React.useEffect(() => {
        if (location.pathname === "/projects/add") {
            navigate({ to: "/projects/add/step-1", replace: true })
        }
    }, [location.pathname, navigate])

    return (
        <div className="space-y-5">
            <div className="space-y-3">
                <h1 className="text-2xl font-bold text-gray-900">{t("projects.add.title")}</h1>
                <DynamicBreadcrumb />
            </div>

            <div className="grid md:grid-cols-12 gap-6">
                <aside className="rounded-lg border bg-white px-4 py-6 shadow-sm md:col-span-4">
                    <ol className="flex flex-col gap-4">
                        {steps.map((step, index) => {
                            const isActive = location.pathname === step.path
                            const isCompleted = index < currentStepIndex
                            const Icon = step.icon

                            return (
                                <li key={step.id}>
                                    <div className="p-4 text-left flex gap-3">
                                        <div
                                            className={cn(
                                                "flex h-12 w-12 items-center justify-center rounded-full bg-white shadow aspect-square",
                                                isActive
                                                    ? "text-primary"
                                                    : isCompleted
                                                        ? "text-red-500"
                                                        : "text-muted-foreground"
                                            )}
                                        >
                                            {isCompleted ? (
                                                <FaCircleCheck className="h-6 w-6" />
                                            ) : (
                                                <Icon className="h-6 w-6" />
                                            )}
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="text-base font-semibold text-gray-900">
                                                {step.label}
                                            </span>
                                            <span className="text-sm text-muted-foreground">{step.description}</span>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ol>
                </aside>

                <Card className="bg-transparent shadow-none border-0 md:col-span-8">
                    <div className="flex flex-col">
                        <div className="px-6 pb-6 pt-2">
                            <Outlet />
                        </div>
                        <div
                            className={cn(
                                "flex items-center bg-muted/30 px-6 py-0 gap-4",
                                isFirstStep ? "justify-start" : "justify-between"
                            )}
                        >
                            {!isFirstStep && (
                                <Button variant="ghost" onClick={handlePrevious} className="flex items-center gap-2 cursor-pointer bg-transparent shadow-none border-none hover:bg-transparent">
                                    <ArrowLeft className="h-4 w-4" />
                                    {t("common.back", { defaultValue: "Retour" })}
                                </Button>
                            )}
                            <Button
                                onClick={handleNext}
                                disabled={isLastStep}
                                className="min-w-[140px] flex items-center gap-2 cursor-pointer"
                            >
                                <span>
                                    {isLastStep
                                        ? t("common.finish", { defaultValue: "Terminer" })
                                        : t("common.next", { defaultValue: "Suivant" })}
                                </span>
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

