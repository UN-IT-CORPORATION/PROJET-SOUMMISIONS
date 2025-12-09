import { createRouter, createRoute, createRootRoute, Outlet, redirect } from '@tanstack/react-router'
import { AuthLayout } from '@/layout/AuthLayout'
import { DashboardLayout } from '@/layout/MainLayout'
import { LoginPage } from '@/components/pages/auth/login'
import { ForgotPasswordPage } from '@/components/pages/auth/forgotPassword'
import { DashboardPage } from '@/components/pages/dashboard'
import { ProjectsPage } from '@/components/pages/projects/my-projects'
import { InvitedProjectsPage } from '@/components/pages/projects/invited-projects'
import { ProjectAddLayout } from '@/components/pages/projects/my-projects/add'
import { ProjectAddStepOne } from '@/components/pages/projects/my-projects/add/steps/StepOne'
import { ProjectAddStepTwo } from '@/components/pages/projects/my-projects/add/steps/StepTwo'
import { ProjectAddStepThree } from '@/components/pages/projects/my-projects/add/steps/StepThree'
import { ProjectAddStepFour } from '@/components/pages/projects/my-projects/add/steps/StepFour'
import { ProjectAddStepFive } from '@/components/pages/projects/my-projects/add/steps/StepFive'
import { ProjectViewLayout } from '@/components/pages/projects/my-projects/view'

import { ProjectDashboardCardPage } from '@/components/pages/projects/my-projects/view/dashboard'
import { ProjectViewInitialFilesPage } from '@/components/pages/projects/my-projects/view/initial-files'
import { ProjectViewIntervenantsPage } from '@/components/pages/projects/my-projects/view/intervenants'
import { ProjectViewServiceRequestsPage } from '@/components/pages/projects/my-projects/view/service-requests'
import { ProjectViewSubmissionsPage } from '@/components/pages/projects/my-projects/view/submissions'
import { ProjectViewRevitTakeoffPage } from '@/components/pages/projects/my-projects/view/revit'
import { ProjectViewTendersPage } from '@/components/pages/projects/my-projects/view/tenders'
import { ProjectViewTenderReportsPage } from '@/components/pages/projects/my-projects/view/tenders/reports'
import { ProjectViewTenderSendPage } from '@/components/pages/projects/my-projects/view/tenders/send'
import { InvitedProjectViewLayout } from '@/components/pages/projects/invited-projects/view'
import { InvitedProjectViewInitialFilesPage } from '@/components/pages/projects/invited-projects/view/initial-files'
import { InvitedProjectViewSubmissionsPage } from '@/components/pages/projects/invited-projects/view/submissions'
import { InvitedProjectViewRevitTakeoffPage } from '@/components/pages/projects/invited-projects/view/revit'
import { InvitedProjectViewQuotesPage } from '@/components/pages/projects/invited-projects/view/quotes'
import { ProjectViewAddendasPage } from '@/components/pages/projects/my-projects/view/addendas'
import { InvitedProjectViewAddendasPage } from '@/components/pages/projects/invited-projects/view/addendas'

const rootRoute = createRootRoute({
    component: () => <Outlet />,
})

const authRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: 'auth',
    component: AuthLayout,
})

const loginRoute = createRoute({
    getParentRoute: () => authRoute,
    path: '/',
    component: LoginPage,
})

const forgotPasswordRoute = createRoute({
    getParentRoute: () => authRoute,
    path: '/forgot-password',
    component: ForgotPasswordPage,
})

const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: 'dashboard',
    component: DashboardLayout,
    beforeLoad: ({ location }) => {
        if (!localStorage.getItem('token')) {
            throw redirect({
                to: '/',
                search: {
                    redirect: location.href,
                },
            })
        }
    },
})

const dashboardIndexRoute = createRoute({
    getParentRoute: () => dashboardRoute,
    path: '/dashboard',
    component: DashboardPage,
})

const projectsRoute = createRoute({
    getParentRoute: () => dashboardRoute,
    path: '/projects',
    component: ProjectsPage,
})

const invitedProjectsRoute = createRoute({
    getParentRoute: () => dashboardRoute,
    path: '/projects/invited',
    component: InvitedProjectsPage,
})

const invitedProjectViewRoute = createRoute({
    getParentRoute: () => dashboardRoute,
    path: '/projects/invited/view',
    component: InvitedProjectViewLayout,
})

const invitedProjectViewInitialFilesRoute = createRoute({
    getParentRoute: () => invitedProjectViewRoute,
    path: '/initial-files',
    component: InvitedProjectViewInitialFilesPage,
})

const invitedProjectViewSubmissionsRoute = createRoute({
    getParentRoute: () => invitedProjectViewRoute,
    path: '/submissions',
    component: InvitedProjectViewSubmissionsPage,
})

const invitedProjectViewRevitRoute = createRoute({
    getParentRoute: () => invitedProjectViewRoute,
    path: '/revit',
    component: InvitedProjectViewRevitTakeoffPage,
})

const invitedProjectViewQuotesRoute = createRoute({
    getParentRoute: () => invitedProjectViewRoute,
    path: '/quotes',
    component: InvitedProjectViewQuotesPage,
})

const invitedProjectViewAddendasRoute = createRoute({
    getParentRoute: () => invitedProjectViewRoute,
    path: '/addendas',
    component: InvitedProjectViewAddendasPage,
})

const projectAddRoute = createRoute({
    getParentRoute: () => dashboardRoute,
    path: '/projects/add',
    component: ProjectAddLayout,
})

const projectAddStep1Route = createRoute({
    getParentRoute: () => projectAddRoute,
    path: '/step-1',
    component: ProjectAddStepOne,
})

const projectAddStep2Route = createRoute({
    getParentRoute: () => projectAddRoute,
    path: '/step-2',
    component: ProjectAddStepTwo,
})

const projectAddStep3Route = createRoute({
    getParentRoute: () => projectAddRoute,
    path: '/step-3',
    component: ProjectAddStepThree,
})

const projectAddStep4Route = createRoute({
    getParentRoute: () => projectAddRoute,
    path: '/step-4',
    component: ProjectAddStepFour,
})

const projectAddStep5Route = createRoute({
    getParentRoute: () => projectAddRoute,
    path: '/step-5',
    component: ProjectAddStepFive,
})

const projectViewRoute = createRoute({
    getParentRoute: () => dashboardRoute,
    path: '/projects/view',
    component: ProjectViewLayout,
})

const projectViewDashboardRoute = createRoute({
    getParentRoute: () => projectViewRoute,
    path: '/dashboard',
    component: ProjectDashboardCardPage,
})

const projectViewInitialFilesRoute = createRoute({
    getParentRoute: () => projectViewRoute,
    path: '/initial-files',
    component: ProjectViewInitialFilesPage,
})

const projectViewSubmissionsRoute = createRoute({
    getParentRoute: () => projectViewRoute,
    path: '/submissions',
    component: ProjectViewSubmissionsPage,
})

const projectViewIntervenantsRoute = createRoute({
    getParentRoute: () => projectViewRoute,
    path: '/intervenants',
    component: ProjectViewIntervenantsPage,
})

const projectViewServiceRequestsRoute = createRoute({
    getParentRoute: () => projectViewRoute,
    path: '/service-requests',
    component: ProjectViewServiceRequestsPage,
})

const projectViewRevitRoute = createRoute({
    getParentRoute: () => projectViewRoute,
    path: '/revit',
    component: ProjectViewRevitTakeoffPage,
})

const projectViewTendersRoute = createRoute({
    getParentRoute: () => projectViewRoute,
    path: '/tenders',
    component: ProjectViewTendersPage,
})

const projectViewAddendasRoute = createRoute({
    getParentRoute: () => projectViewRoute,
    path: '/addendas',
    component: ProjectViewAddendasPage,
})

const projectViewTenderReportsRoute = createRoute({
    getParentRoute: () => projectViewRoute,
    path: '/tenders/reports/$tenderId',
    component: ProjectViewTenderReportsPage,
})

const projectViewTenderSendRoute = createRoute({
    getParentRoute: () => projectViewRoute,
    path: '/tenders/send',
    component: ProjectViewTenderSendPage,
})

const routeTree = rootRoute.addChildren([
    authRoute.addChildren([loginRoute, forgotPasswordRoute]),
    dashboardRoute.addChildren([
        dashboardIndexRoute,
        projectsRoute,
        invitedProjectsRoute,
        invitedProjectViewRoute.addChildren([
            invitedProjectViewInitialFilesRoute,
            invitedProjectViewSubmissionsRoute,
            invitedProjectViewRevitRoute,
            invitedProjectViewQuotesRoute,
            invitedProjectViewAddendasRoute,
        ]),
        projectAddRoute.addChildren([
            projectAddStep1Route,
            projectAddStep2Route,
            projectAddStep3Route,
            projectAddStep4Route,
            projectAddStep5Route,
        ]),
        projectViewRoute.addChildren([
            projectViewDashboardRoute,
            projectViewInitialFilesRoute,
            projectViewSubmissionsRoute,
            projectViewIntervenantsRoute,
            projectViewServiceRequestsRoute,
            projectViewRevitRoute,
            projectViewTendersRoute,
            projectViewAddendasRoute,
            projectViewTenderReportsRoute,
            projectViewTenderSendRoute,
        ]),
    ]),
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}
