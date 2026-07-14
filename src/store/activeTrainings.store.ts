import type { Training } from '@/types/Trainings'
import { create } from 'zustand'

type ActiveTrainingsStore = {
	trainings: Training[]
	setTrainings: (trainings: Training[]) => void
	deleteTraining: (trainingId: number) => void
	addTraining: (training: Training) => void
	editTraining: (training: Training) => void
}

export const useActiveTrainingsStore = create<ActiveTrainingsStore>()(set => ({
	trainings: [
		{ id: 1, type: 'RUNNING', calories: 300, duration: 30, date: new Date() },
		{ id: 2, type: 'SWIMMING', calories: 400, duration: 45, date: new Date() },
		{ id: 3, type: 'CYCLING', calories: 500, duration: 60, date: new Date() },
	],

	setTrainings: trainings => set({ trainings }),

	deleteTraining: trainingId =>
		set(state => ({
			trainings: state.trainings.filter(training => training.id !== trainingId),
		})),

	addTraining: training =>
		set(state => ({
			trainings: [...state.trainings, training],
		})),

	editTraining: training =>
		set(state => ({
			trainings: state.trainings.map(t =>
				t.id === training.id ? training : t,
			),
		})),
}))
