export interface Training {
	id: Number
	type: TrainingType
	duration: Number
	calories: Number
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
	id: Number
	trainingId: Number
	activeTrainingId: Number
	name: String
	sets: ExerciseSet[]
	laps: ExerciseLap[]
}

export interface ExerciseSet {
	id: Number
	exerciseId: Number

	reps: Number
	weight: Number
	approach: Number
}

export interface ExerciseLap {
	id: Number
	exerciseId: Number

	lapNumber: Number
	duration: Number
	distance: Number | null
}
