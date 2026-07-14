import { create } from 'zustand'

type UserStore = {
	isAuth: boolean
	setIsAuth: (isAuth: boolean) => void
}

export const useUserStore = create<UserStore>()(set => ({
	isAuth: false,

	setIsAuth: (isAuth: boolean) => set({ isAuth }),
}))
