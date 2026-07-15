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

export const CreateTrainingModal = () => {
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
					<Button className='flex h-10 w-52 items-center gap-2 text-base'>
						<Plus />
						Add Training
					</Button>
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
