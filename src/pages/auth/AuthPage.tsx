import { $PAGES } from '@/app/router/Router.config'
import { Button } from '@/shared/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import { useUserStore } from '@/store/user.store'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

export const AuthPage = () => {
	const userStore = useUserStore()
	const router = useNavigate()

	const username = import.meta.env.VITE_USER_NAME
	const password = import.meta.env.VITE_USER_PASSWORD

	const { register, handleSubmit } = useForm({
		defaultValues: {
			username: '',
			password: '',
		},
	})

	const onSubmit = handleSubmit(data => {
		if (data.username === username && data.password === password) {
			alert('Login successful!')
			userStore.setIsAuth(true)
			router($PAGES.DASHBOARD)
		} else {
			alert('Invalid username or password')
		}
	})

	return (
		<main className='flex flex-col items-center justify-center w-full h-screen gap-6'>
			<div className='w-96'>
				<Card>
					<CardHeader>
						<CardTitle>Login to your account</CardTitle>
						<CardDescription>
							Enter your username below to login to your account
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={onSubmit}>
							<FieldGroup>
								<Field>
									<FieldLabel htmlFor='username'>Username</FieldLabel>
									<Input
										id='username'
										type='text'
										placeholder='john_doe'
										required
										{...register('username')}
									/>
								</Field>
								<Field>
									<FieldLabel htmlFor='password'>Password</FieldLabel>
									<Input
										id='password'
										type='password'
										placeholder='••••••••'
										required
										{...register('password')}
									/>
								</Field>
								<Field>
									<Button type='submit'>Login</Button>
								</Field>
							</FieldGroup>
						</form>
					</CardContent>
				</Card>
			</div>
		</main>
	)
}
