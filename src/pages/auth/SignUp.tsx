import { authApi } from '@/api/authApi'
import FormInputText from '@/components/common/Input/FormInputText'
import SEO from '@/components/seo'
import { FormValuesSignUp } from '@/models/auth'
import { signUp } from '@/schemas/Auth'
import { convertPhone84 } from '@/utils/index'
import ShowNostis from '@/utils/show-noti'
import { yupResolver } from '@hookform/resolvers/yup'
import { Grid } from '@mui/material'
import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ButtonAuth, HeaderSignUp, LinkSignIn, Wrapper } from './styles'

const defaultValues = {
	username: '',
	email: '',
	contactInfo: '',
	password: '',
	confirmPass: '',
}

const SignUp = () => {
	const { t } = useTranslation()

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting, isValid },
	} = useForm<FormValuesSignUp>({
		defaultValues,
		resolver: yupResolver(signUp),
	})

	const navigate = useNavigate()

	const handleSignUp = async (data: any) => {
		const dataRegister = { ...data, contactInfo: convertPhone84(data.contactInfo) }
		try {
			const response = await authApi.register(dataRegister)

			if (response) {
				ShowNostis.success('Create Successfully!!!!, we will redirect you to login page in 5s')

				setTimeout(() => {
					navigate('/login')
				}, 5000)
			}
		} catch (error: any) {
			const { username, email, contactInfo } = error?.data?.message
			ShowNostis.error(username || email || contactInfo || 'Something went wrong !!!')
		}
	}

	return (
		<>
			<SEO title="Bughoue - Sign up" />
			<Grid
				container
				direction="column"
				alignContent="center"
				justifyContent="center"
				height="100vh"
				style={{ background: '#f8f8f8' }}
			>
				<Wrapper container direction="row" alignItems="center" justifyContent="center">
					<Grid
						item
						container
						direction="column"
						alignContent="center"
						justifyContent="center"
						width="100%"
						xs={6}
						style={{ padding: '0 60px' }}
					>
						<form
							onSubmit={handleSubmit(handleSignUp)}
							style={{ gap: 7, display: 'flex', flexDirection: 'column', width: '100%' }}
						>
							<HeaderSignUp variant="h2">{t('AUTH.REGISTER')}</HeaderSignUp>
							<FormInputText
								control={control}
								name="username"
								label={t('AUTH.Full_Name')}
								error={errors.username?.message}
							/>
							<FormInputText control={control} name="email" label="Email" error={errors.email?.message} />
							<FormInputText
								control={control}
								name="contactInfo"
								label={t('AUTH.Phone')}
								error={errors.contactInfo?.message}
							/>
							<FormInputText
								control={control}
								type="password"
								name="password"
								label={t('AUTH.Password')}
								error={errors.password?.message}
							/>
							<FormInputText
								control={control}
								type="password"
								name="confirmPass"
								label={t('AUTH.Confirm_Pass')}
								error={errors.confirmPass?.message}
							/>
							<ButtonAuth
								style={{ marginTop: 20 }}
								disabled={isSubmitting}
								type="submit"
								variant="contained"
								loading={isSubmitting}
							>
								{t('AUTH.REGISTER')}
							</ButtonAuth>
						</form>
					</Grid>
					<Grid
						container
						item
						direction="column"
						alignContent="center"
						justifyContent="center"
						xs={6}
						gap={7}
					>
						<img src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signup-image.jpg" />
						<LinkSignIn to="/login">{t('AUTH.Have_Account')}</LinkSignIn>
					</Grid>
				</Wrapper>
			</Grid>
		</>
	)
}

SignUp.GridCommon = ({ children, ...props }: { props: any; children: ReactNode }) => {
	return (
		<Grid container direction="column" alignContent="center" justifyContent="center" width="100%" {...props}>
			{children}
		</Grid>
	)
}

export default SignUp
