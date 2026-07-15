import { Plus } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/shared/ui/button'
import { Calendar } from '@/shared/ui/calendar'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog'
import { Field, FieldGroup } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui/select'
import { useActiveTrainingsStore } from '@/store/activeTrainings.store'
import type { TrainingType } from '@/types/Trainings'

type FormValues = {
	type: TrainingType
	duration: number
	calories: number
	date: Date
}

const trainingTypes: { title: string; value: TrainingType }[] = [
	{ title: 'Running', value: 'RUNNING' },
	{ title: 'Swimming', value: 'SWIMMING' },
	{ title: 'Cycling', value: 'CYCLING' },
	{ title: 'Gym', value: 'GYM' },
	{ title: 'Stretching', value: 'STRETCHING' },
	{ title: 'Yoga', value: 'YOGA' },
]

export const CreateTrainingPlaceholderModal = () => {
	const addTraining = useActiveTrainingsStore(state => state.addTraining)

	const { register, handleSubmit, control, reset } = useForm<FormValues>({
		defaultValues: {
			type: 'GYM',
			duration: 0,
			calories: 0,
			date: new Date(),
		},
	})

	const onSubmit = (data: FormValues) => {
		addTraining({
			...data,
			date: data.date,
		})

		reset({
			type: 'GYM',
			duration: 0,
			calories: 0,
			date: new Date(),
		})
	}

	return (
		<Dialog>
			<DialogTrigger
				render={
					<div className='rounded-lg border-2 border-dashed border-border/50 bg-card/20 p-4 shadow-sm flex items-center justify-center cursor-pointer hover:bg-card/40 hover:border-border transition-all duration-300 min-h-[100px] group'>
						<div className='bg-background/50 p-3 rounded-full group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110'>
							<Plus className='text-muted-foreground group-hover:text-primary transition-colors duration-300 w-6 h-6' />
						</div>
					</div>
				}
			/>

			<DialogContent className='sm:max-w-sm'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogHeader>
						<DialogTitle>Add training</DialogTitle>
						<DialogDescription>
							Create a new training session.
						</DialogDescription>
					</DialogHeader>

					<FieldGroup>
						<Field>
							<Label htmlFor='type'>Training type</Label>

							<Controller
								name='type'
								control={control}
								render={({ field }) => (
									<Select value={field.value} onValueChange={field.onChange}>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder='Select training type' />
										</SelectTrigger>

										<SelectContent>
											<SelectGroup>
												<SelectLabel>Types</SelectLabel>

												{trainingTypes.map(item => (
													<SelectItem key={item.value} value={item.value}>
														{item.title}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								)}
							/>
						</Field>

						<Field>
							<Label htmlFor='duration'>Duration</Label>

							<Input
								id='duration'
								min={0}
								placeholder='Time in minutes'
								{...register('duration', {
									valueAsNumber: true,
								})}
							/>
						</Field>

						<Field>
							<Label htmlFor='calories'>Calories</Label>

							<Input
								id='calories'
								min={0}
								placeholder='Calories in kcal'
								{...register('calories', {
									valueAsNumber: true,
								})}
							/>
						</Field>

						<Field>
							<Controller
								name='date'
								control={control}
								render={({ field }) => (
									<Calendar
										mode='single'
										selected={field.value}
										onSelect={date => date && field.onChange(date)}
										captionLayout='dropdown'
										className='rounded-lg border'
									/>
								)}
							/>
						</Field>
					</FieldGroup>

					<DialogFooter>
						<DialogClose render={<Button variant='outline'>Cancel</Button>} />

						<Button type='submit'>Save training</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
