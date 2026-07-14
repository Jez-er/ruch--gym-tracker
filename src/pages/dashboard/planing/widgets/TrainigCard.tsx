import { useHover } from '@/hooks'
import type { Training } from '@/types/Trainings'
import {
	Bike,
	CircleCheck,
	CircleStar,
	Dumbbell,
	Signature,
	SportShoe,
	WavesHorizontal,
} from 'lucide-react'

const trainingConfig = {
	RUNNING: {
		label: 'Running',
		bg: 'bg-red-500/20',
		text: 'text-red-400',
		icon: <SportShoe />,
	},
	SWIMMING: {
		label: 'Swimming',
		bg: 'bg-blue-500/20',
		text: 'text-blue-400',
		icon: <WavesHorizontal />,
	},
	CYCLING: {
		label: 'Cycling',
		bg: 'bg-green-500/20',
		text: 'text-green-400',
		icon: <Bike />,
	},
	GYM: {
		label: 'Gym',
		bg: 'bg-yellow-500/20',
		text: 'text-yellow-400',
		icon: <Dumbbell />,
	},
	STRETCHING: {
		label: 'Stretching',
		bg: 'bg-purple-500/20',
		text: 'text-purple-400',
		icon: <Signature />,
	},
	YOGA: {
		label: 'Yoga',
		bg: 'bg-pink-500/20',
		text: 'text-pink-400',
		icon: <CircleStar />,
	},
} as const

export const TrainingCard = ({ training }: { training: Training }) => {
	const hover = useHover<HTMLButtonElement>()

	const config = trainingConfig[training.type] ?? {
		label: training.type,
		bg: 'bg-gray-500/20',
		text: 'text-gray-400',
		icon: <Dumbbell />,
	}

	const formattedDateWeekday = new Intl.DateTimeFormat('en-US', {
		weekday: 'short',
	}).format(new Date(training.date))

	const formattedDateDate = new Intl.DateTimeFormat('en-US', {
		day: '2-digit',
	}).format(new Date(training.date))
	return (
		<div className='rounded-lg border-2 border-border bg-card p-4 text-card-foreground shadow-sm flex items-center hover:-translate-y-1 hover:shadow-md transition-all duration-300'>
			<div
				className={`${config.bg} ${config.text} rounded-md p-2 flex flex-col items-center w-16 h-16`}
			>
				<div className='text-sm font-bold'>{formattedDateWeekday}</div>
				<div className='text-base font-bold'>{formattedDateDate}</div>
			</div>
			<div className='ml-4'>
				<h3 className='text-lg font-bold'>{config.label}</h3>
				<div className='flex gap-2 mt-2 items-center'>
					<h4 className='text-md text-muted-foreground'>
						{training.duration.toString()} min
					</h4>
					<div className='text-muted-foreground/50'>x</div>
					<h4 className='text-md text-muted-foreground'>
						{training.calories.toString()} kcal
					</h4>
				</div>
			</div>
			<div className='ml-auto'>
				<button
					ref={hover.ref}
					className={`${config.bg} ${config.text} p-2 rounded-md flex items-center justify-center hover:bg-green-500/20 hover:text-green-400 transition-all duration-300`}
				>
					{hover.value ? <CircleCheck className="animate-in zoom-in duration-300" /> : config.icon}
				</button>
			</div>
		</div>
	)
}
