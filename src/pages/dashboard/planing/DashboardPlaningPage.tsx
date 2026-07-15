import { Progress } from '@/shared/ui/progress'
import { useActiveTrainingsStore } from '@/store/activeTrainings.store'
import { CreateTrainingPlaceholderModal } from './modals/CreateTrainigPlaceholder'
import { CreateTrainingModal } from './modals/CreateTraining'
import { TrainingView } from './modals/TrainigView'

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
					<CreateTrainingModal />
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
						<TrainingView key={Number(training.id)} training={training} />
					))}
					{Array.from({
						length: Math.max(0, 10 - trainingStore.trainings.length),
					}).map((_, i) => (
						<CreateTrainingPlaceholderModal key={`placeholder-${i}`} />
					))}
				</div>
			</section>
		</main>
	)
}
