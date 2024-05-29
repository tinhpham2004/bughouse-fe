import ShowNostis from '@/utils/show-noti'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, CircularProgress, TextField } from '@mui/material'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { StyledDesc, StyledLabelWrap, StyledListImage, StyledResetForm, StyledTitle, StyledWrap } from './style'

interface IFormValues {
	email: string
}
const schema = yup.object().shape({
	email: yup.string().required().email().trim(),
})
const PasswordContainer: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<IFormValues>({ resolver: yupResolver(schema) })

	const { t } = useTranslation()

	const onSubmit: SubmitHandler<IFormValues> = async (values) => {
		try {
			// await forgotPasswordApi(values.email)
			ShowNostis.success('Please check your email address')
			reset()
		} catch (error) {
			// Custom show error in here
			ShowNostis.error('data.message')
		}
	}

	return (
		<StyledWrap>
			<div className="wrapForm">
				<form action="#" onSubmit={handleSubmit(onSubmit)} noValidate className="form">
					<StyledListImage>
						<img
							src="https://dashboard.pilotpractice.com/static/media/image41.ac4627e7.svg"
							alt="Inbox"
							className="imageBox"
						/>
						<div className="wrapSend">
							<img
								src="https://dashboard.pilotpractice.com/static/media/image42.bce44278.svg"
								alt="Send"
								className="imageSend"
							/>
						</div>
					</StyledListImage>
					<StyledTitle>{t('AUTH.Forgot_Your_Pass')}</StyledTitle>
					<StyledDesc>{t('AUTH.METHOD_RESET_PASS')}</StyledDesc>
					<StyledResetForm>
						<StyledLabelWrap>
							<p className="label">{t('AUTH.ENTER_EMAIL')}</p>
						</StyledLabelWrap>

						<TextField
							variant="outlined"
							type="email"
							id="email"
							placeholder={t('AUTH.ENTER_INPUT_FORGOT') || 'Enter username or email address'}
							// feedbackText={errors?.email?.message}
							// state={hasKey(errors, 'email') ? 'error' : 'success'}
							{...register('email')}
						/>
						{/* {hasKey(errors, 'email') && (
							<StyledFeedback>
								<Feedback state="error" showErrorOnly showState>
									{errors?.email?.message}
								</Feedback>
							</StyledFeedback>
						)} */}

						<Button
							className="button__forgot"
							variant="contained"
							disabled={isSubmitting}
							type="submit"
							color="primary"
						>
							{isSubmitting ? <CircularProgress size="sm" color="info" /> : 'Send link'}
						</Button>
					</StyledResetForm>
				</form>
			</div>
		</StyledWrap>
	)
}

export default PasswordContainer
