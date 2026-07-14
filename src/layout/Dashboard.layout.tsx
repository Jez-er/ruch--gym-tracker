import { $PAGES } from '@/app/router/Router.config'
import { Dumbbell, LayoutGrid, SquareChartGantt } from 'lucide-react'
import { NavLink, Outlet } from 'react-router'

export const DashboardLayout = () => {
	return (
		<div className='flex w-full h-screen'>
			<aside className='w-80 bg-card/95 backdrop-blur-lg p-5 border-r border-border/50'>
				<div className='flex items-center gap-2'>
					<div className='rounded-xl p-2 bg-gradient-to-br from-primary to-primary/60 shadow-lg shadow-primary/20 flex items-center justify-center text-primary-foreground'>
						<Dumbbell />
					</div>
					<h2 className='text-lg font-semibold'>Ruch</h2>
				</div>
				<div className='flex flex-col gap-4 mt-8'>
					<NavLink
						to={$PAGES.DASHBOARD}
						className={({ isActive }) =>
							`group p-2 rounded-lg duration-300 transition-all flex items-center gap-2 ${
								isActive
									? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
									: 'bg-transparent text-muted-foreground hover:bg-primary/10 hover:text-primary'
							}`
						}
					>
						<LayoutGrid className="transition-transform duration-300 group-hover:scale-110" />
						Dashboard
					</NavLink>
					<NavLink
						to={$PAGES.PLANING}
						className={({ isActive }) =>
							`group p-2 rounded-lg duration-300 transition-all flex items-center gap-2 ${
								isActive
									? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
									: 'bg-transparent text-muted-foreground hover:bg-primary/10 hover:text-primary'
							}`
						}
					>
						<SquareChartGantt className="transition-transform duration-300 group-hover:scale-110" />
						Planing
					</NavLink>
				</div>
			</aside>
			<Outlet />
		</div>
	)
}
