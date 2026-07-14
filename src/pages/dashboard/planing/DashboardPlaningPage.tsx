import { Button } from '@/shared/ui/button'
import { Progress } from '@/shared/ui/progress'
import { useActiveTrainingsStore } from '@/store/activeTrainings.store'
import { Dumbbell, Plus } from 'lucide-react'
import { TrainingCard } from './widgets/TrainigCard'

export const DashboardPlanningPage = () => {
	const trainingStore = useActiveTrainingsStore()

	return (
		<main className='flex flex-col w-full min-h-screen p-8 bg-background'>
			<header className='flex items-center justify-between w-full mb-8'>
				<div>
					<h1 className='text-2xl font-bold'>Plan your workout</h1>
					<h3 className='text-base font-normal text-muted-foreground'>
						Plan up to 10 workouts in advance — and always know what's next
					</h3>
				</div>
				<div>
					<Button className='w-52 h-10 text-base flex items-center gap-2'>
						<Plus /> Add Training
					</Button>
				</div>
			</header>
			<section>
				<div className='p-4 bg-card/80 backdrop-blur-md text-card-foreground border border-border shadow-sm rounded-lg flex flex-col gap-2'>
					<div className='flex items-center justify-between'>
						<p className='font-medium text-sm text-muted-foreground'>
							Trainings planed
						</p>
						<p className='font-medium text-sm text-foreground'>
							{trainingStore.trainings.length} / 10
						</p>
					</div>
					<Progress
						className='w-full h-2'
						value={trainingStore.trainings.length * 10}
					/>
				</div>
			</section>
			<section>
				<div className='grid grid-cols-2 grid-rows-5 gap-4 mt-5'>
					{trainingStore.trainings.map(training => (
						<TrainingCard key={Number(training.id)} training={training} />
					))}
					{Array.from({ length: Math.max(0, 10 - trainingStore.trainings.length) }).map((_, i) => (
						<div
							key={`placeholder-${i}`}
							className='rounded-lg border-2 border-dashed border-border/50 bg-card/20 p-4 shadow-sm flex items-center justify-center cursor-pointer hover:bg-card/40 hover:border-border transition-all duration-300 min-h-[100px] group'
						>
							<div className='bg-background/50 p-3 rounded-full group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110'>
								<Plus className='text-muted-foreground group-hover:text-primary transition-colors duration-300 w-6 h-6' />
							</div>
						</div>
					))}
				</div>
			</section>
		</main>
	)
}
