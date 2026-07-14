import { DashboardLayout } from '@/layout/Dashboard.layout'
import { AuthPage } from '@/pages/auth/AuthPage'
import { DashboardHomePage } from '@/pages/dashboard/home/DashboardHomePage'
import { DashboardPlanningPage } from '@/pages/dashboard/planing/DashboardPlaningPage'
import { createBrowserRouter } from 'react-router'
import { $PAGES } from './Router.config'

const router = createBrowserRouter([
	{
		path: $PAGES.AUTH,
		Component: AuthPage,
	},
	{
		path: '/dashboard',
		Component: DashboardLayout,
		children: [
			{
				path: $PAGES.DASHBOARD,
				Component: DashboardHomePage,
			},
			{
				path: $PAGES.PLANING,
				Component: DashboardPlanningPage,
			},
		],
	},
])

export default router
