import * as React from 'react'

import { Button } from '@/shared/ui/button'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/shared/ui/drawer'

import type { Exercise, Training } from '@/types/Trainings'
import { ExerciseItem } from '../widgets/ExerciseItem'
import { TrainingCard } from '../widgets/TrainingCard'

export const TrainingView = ({ training }: { training: Training }) => {
	const [open, setOpen] = React.useState(false)

	const [exercises, setExercises] = React.useState<Exercise[]>([])

	const [exerciseName, setExerciseName] = React.useState('')

	const addExercise = () => {
		if (!exerciseName.trim()) return

		const newExercise: Exercise = {
			id: Date.now(),
			trainingId: training.id,
			activeTrainingId: training.id,
			name: exerciseName,
			sets: [],
			laps: [],
		}

		setExercises(prev => [...prev, newExercise])

		setExerciseName('')
	}

	const deleteExercise = (id: number) => {
		setExercises(prev => prev.filter(item => item.id !== id))
	}

	return (
		<Drawer open={open} onOpenChange={setOpen} swipeDirection='right'>
			<DrawerTrigger render={<TrainingCard training={training} />} />

			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>{training.type} exercises</DrawerTitle>

					<DrawerDescription>
						Manage your exercises and track your performance
					</DrawerDescription>
				</DrawerHeader>

				<div className='px-4 mt-4 space-y-4 flex-1 overflow-y-auto min-h-0 pb-4'>
					{/* Add exercise */}
					<div className='flex gap-2'>
						<input
							className='
								flex
								h-9
								w-full
								flex-1
								rounded-md
								border border-input
								bg-transparent
								px-3
								py-1
								text-sm
								shadow-sm
								transition-colors
								placeholder:text-muted-foreground
								focus-visible:outline-none
								focus-visible:ring-1
								focus-visible:ring-ring
							'
							placeholder='Exercise name'
							value={exerciseName}
							onChange={e => setExerciseName(e.target.value)}
							onKeyDown={e => {
								if (e.key === 'Enter') {
									addExercise()
								}
							}}
						/>

						<Button size='sm' className='h-9 px-4' onClick={addExercise}>
							Add
						</Button>
					</div>

					{/* Exercises list */}
					<div className='space-y-4 overflow-auto'>
						{exercises.length === 0 && (
							<div
								className='
									text-center
									text-sm
									text-gray-500
									py-6
								'
							>
								No exercises yet
							</div>
						)}

						{exercises.map(exercise => (
							<ExerciseItem
								key={exercise.id}
								exercise={exercise}
								trainingType={training.type}
								onUpdate={updatedExercise => {
									setExercises(prev =>
										prev.map(item =>
											item.id === updatedExercise.id ? updatedExercise : item,
										),
									)
								}}
								onDelete={deleteExercise}
							/>
						))}
					</div>
				</div>

				<DrawerFooter>
					<div className='flex gap-2 pt-2'>
						<Button
							variant='secondary'
							className='
								flex-1
							'
						>
							Edit
						</Button>

						<Button
							variant='destructive'
							className='
								flex-1
							'
						>
							Delete training
						</Button>
					</div>

					<Button>Save</Button>

					<DrawerClose render={<Button variant='outline'>Cancel</Button>} />
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
