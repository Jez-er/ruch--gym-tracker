import { Plus, Trash2 } from 'lucide-react'

import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import type {
	Exercise,
	ExerciseLap,
	ExerciseSet,
	TrainingType,
} from '@/types/Trainings'

interface ExerciseItemProps {
	exercise: Exercise
	trainingType: TrainingType
	onUpdate: (exercise: Exercise) => void
	onDelete: (id: number) => void
}

export const ExerciseItem = ({
	exercise,
	trainingType,
	onUpdate,
	onDelete,
}: ExerciseItemProps) => {
	const isLapsType = ['RUNNING', 'SWIMMING', 'CYCLING'].includes(trainingType)

	const addSet = () => {
		const newSet: ExerciseSet = {
			id: Date.now(),
			exerciseId: exercise.id,
			reps: 0,
			weight: 0,
			approach: exercise.sets.length + 1,
		}
		onUpdate({ ...exercise, sets: [...exercise.sets, newSet] })
	}

	const addLap = () => {
		const newLap: ExerciseLap = {
			id: Date.now(),
			exerciseId: exercise.id,
			lapNumber: exercise.laps.length + 1,
			duration: 0,
			distance: 0,
		}
		onUpdate({ ...exercise, laps: [...exercise.laps, newLap] })
	}

	const updateSet = (
		setId: number,
		field: keyof ExerciseSet,
		value: number,
	) => {
		const updatedSets = exercise.sets.map(s =>
			s.id === setId ? { ...s, [field]: value } : s,
		)
		onUpdate({ ...exercise, sets: updatedSets })
	}

	const updateLap = (
		lapId: number,
		field: keyof ExerciseLap,
		value: number,
	) => {
		const updatedLaps = exercise.laps.map(l =>
			l.id === lapId ? { ...l, [field]: value } : l,
		)
		onUpdate({ ...exercise, laps: updatedLaps })
	}

	const deleteSet = (setId: number) => {
		const updatedSets = exercise.sets.filter(s => s.id !== setId)
		// update approach numbers
		const renumbered = updatedSets.map((s, index) => ({
			...s,
			approach: index + 1,
		}))
		onUpdate({ ...exercise, sets: renumbered })
	}

	const deleteLap = (lapId: number) => {
		const updatedLaps = exercise.laps.filter(l => l.id !== lapId)
		// update lap numbers
		const renumbered = updatedLaps.map((l, index) => ({
			...l,
			lapNumber: index + 1,
		}))
		onUpdate({ ...exercise, laps: renumbered })
	}

	return (
		<div className='flex flex-col gap-4 rounded-lg border bg-card text-card-foreground shadow-sm p-4'>
			<div className='flex items-center justify-between'>
				<div className='font-semibold text-lg'>{exercise.name}</div>
				<Button
					size='icon'
					variant='ghost'
					className='text-destructive hover:text-destructive hover:bg-destructive/10'
					onClick={() => onDelete(exercise.id)}
				>
					<Trash2 className='h-4 w-4' />
				</Button>
			</div>

			<div className='space-y-3'>
				{!isLapsType ? (
					<>
						{exercise.sets.length > 0 && (
							<div className='space-y-2'>
								<div className='grid grid-cols-[3rem_1fr_1fr_2.5rem] gap-2 text-xs font-medium text-gray-500 px-1'>
									<div className='text-center'>Set</div>
									<div>Weight (kg)</div>
									<div>Reps</div>
									<div></div>
								</div>
								{exercise.sets.map(set => (
									<div
										key={set.id}
										className='grid grid-cols-[3rem_1fr_1fr_2.5rem] gap-2 items-center'
									>
										<div className='text-center font-medium text-sm'>
											{set.approach}
										</div>
										<Input
											className='h-8'
											value={set.weight || ''}
											onChange={e =>
												updateSet(set.id, 'weight', Number(e.target.value))
											}
											placeholder='0'
										/>
										<Input
											className='h-8'
											value={set.reps || ''}
											onChange={e =>
												updateSet(set.id, 'reps', Number(e.target.value))
											}
											placeholder='0'
										/>
										<Button
											size='icon'
											variant='ghost'
											className='h-8 w-8 text-muted-foreground hover:text-destructive'
											onClick={() => deleteSet(set.id)}
										>
											<Trash2 className='h-4 w-4' />
										</Button>
									</div>
								))}
							</div>
						)}
						<Button
							variant='outline'
							size='sm'
							className='w-full border-dashed mt-2'
							onClick={addSet}
						>
							<Plus className='h-4 w-4 mr-2' />
							Add Set
						</Button>
					</>
				) : (
					<>
						{exercise.laps.length > 0 && (
							<div className='space-y-2'>
								<div className='grid grid-cols-[3rem_1fr_1fr_2.5rem] gap-2 text-xs font-medium text-gray-500 px-1'>
									<div className='text-center'>Lap</div>
									<div>Duration (m)</div>
									<div>Distance (km)</div>
									<div></div>
								</div>
								{exercise.laps.map(lap => (
									<div
										key={lap.id}
										className='grid grid-cols-[3rem_1fr_1fr_2.5rem] gap-2 items-center'
									>
										<div className='text-center font-medium text-sm'>
											{lap.lapNumber}
										</div>
										<Input
											className='h-8'
											value={lap.duration || ''}
											onChange={e =>
												updateLap(lap.id, 'duration', Number(e.target.value))
											}
											placeholder='0'
										/>
										<Input
											className='h-8'
											value={lap.distance || ''}
											onChange={e =>
												updateLap(lap.id, 'distance', Number(e.target.value))
											}
											placeholder='0'
										/>
										<Button
											size='icon'
											variant='ghost'
											className='h-8 w-8 text-muted-foreground hover:text-destructive'
											onClick={() => deleteLap(lap.id)}
										>
											<Trash2 className='h-4 w-4' />
										</Button>
									</div>
								))}
							</div>
						)}
						<Button
							variant='outline'
							size='sm'
							className='w-full border-dashed mt-2'
							onClick={addLap}
						>
							<Plus className='h-4 w-4 mr-2' />
							Add Lap
						</Button>
					</>
				)}
			</div>
		</div>
	)
}
