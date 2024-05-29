import { authApi } from '@/api/authApi'
import { setUserInfo, setVerifiedInfo } from '@/app/authSlice'
import { useAppDispatch, useAppSelector } from '@/app/hook'
import FormInputText from '@/components/common/Input/FormInputText'
import SEO from '@/components/seo'
import { FormValuesSignIn, ResponseSignIn, VerifyType } from '@/models/auth'
import ShowNostis from '@/utils/show-noti'
import { CircularProgress, Grid } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { ButtonAuth, HeaderSignUp, LinkSignIn, Wrapper } from './styles'

const SignIn = () => {
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting, isValid },
	} = useForm<FormValuesSignIn>({
		// resolver: yupResolver(schema),
	})

	const { verifyInfo } = useAppSelector((state) => ({
		verifyInfo: state.authSlice.verifyInfo,
	}))

	const dataVerified = JSON.parse(localStorage.getItem('dataVerified') as string)
	useEffect(() => {
		if (!verifyInfo && dataVerified) {
			dispatch(setVerifiedInfo(dataVerified))
		}

		if (dataVerified && !dataVerified.isOtp) {
			if (dataVerified.isIdentity) {
				navigate('/registerAuth')
			}
			navigate('/authOtp')
		}
	}, [verifyInfo, dataVerified])

	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const handleSignIn = async (data: FormValuesSignIn) => {
		try {
			const response = await authApi.login(data)
			// @ts-ignore
			if (response.data.accessToken) {
				dispatch(setUserInfo(response.data as ResponseSignIn))

				localStorage.setItem('dataUser', JSON.stringify(response?.data as ResponseSignIn))
				ShowNostis.success('Login successfully!!!')
				return navigate('/')
			}

			// @ts-ignore
			if (!response.data.isOTP) {
				localStorage.setItem('dataVerified', JSON.stringify(response?.data as VerifyType))
				dispatch(setVerifiedInfo(response?.data as VerifyType))
				return navigate('/authOtp')
			}

			// @ts-ignore
			if (!response.data.isIdentity) {
				localStorage.setItem('dataVerified', JSON.stringify(response?.data as VerifyType))
				dispatch(setVerifiedInfo(response.data as VerifyType))
				return navigate('/registerAuth')
			}
		} catch (error: any) {
			if (error) ShowNostis.error(error?.data.message || 'something went wrong')
		}
	}

	const { t } = useTranslation()

	return (
		<>
			<SEO title="Bughoue - Sign in" />
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
						container
						item
						direction="column"
						alignContent="center"
						justifyContent="center"
						xs={6}
						gap={7}
					>
						<img src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signin-image.jpg" />
						<LinkSignIn to="/register">{t('AUTH.Not_Have_Account')}</LinkSignIn>
					</Grid>

					<Grid item width="100%" xs={6}>
						<form
							onSubmit={handleSubmit(handleSignIn)}
							style={{
								display: 'flex',
								flexDirection: 'column',
								width: '100%',
								gap: 10,
								padding: 60,
							}}
						>
							<HeaderSignUp variant="h2">{t('AUTH.LOGIN')}</HeaderSignUp>

							<FormInputText
								control={control}
								name="username"
								label="Username"
								error={errors.username?.message || null}
							/>

							<FormInputText
								control={control}
								name="password"
								label={t('AUTH.Password')}
								type="password"
								error={errors.password?.message || null}
							/>

							<Link
								to="/forgot-password"
								style={{
									textAlign: 'right',
									fontSize: 12,
									textDecoration: 'unset',
								}}
							>
								{t('AUTH.Forgot_Your_Pass')} ?
							</Link>

							<ButtonAuth disabled={isSubmitting || !isValid} type="submit" variant="contained">
								{isSubmitting ? <CircularProgress size={25} /> : t('AUTH.LOGIN') + ' ' + t('NOW')}
							</ButtonAuth>
						</form>
					</Grid>
				</Wrapper>
			</Grid>
		</>
	)
}

export default SignIn
