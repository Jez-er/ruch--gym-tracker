export interface Training {
	id: number
	type: TrainingType
	duration: number
	calories: number
	date: Date
}

export type TrainingType =
	| 'RUNNING'
	| 'SWIMMING'
	| 'CYCLING'
	| 'GYM'
	| 'STRETCHING'
	| 'YOGA'

export interface Exercise {
	id: number
	trainingId: number
	activeTrainingId: number
	name: string
	sets: ExerciseSet[]
	laps: ExerciseLap[]
}

export interface ExerciseSet {
	id: number
	exerciseId: number

	reps: number
	weight: number
	approach: number
}

export interface ExerciseLap {
	id: number
	exerciseId: number

	lapNumber: number
	duration: number
	distance: number | null
}
