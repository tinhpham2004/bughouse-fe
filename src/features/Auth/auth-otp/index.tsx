import { authApi } from '@/api/authApi'
import { deleteToken } from '@/api/axiosClient'
import { useAppSelector } from '@/app/hook'
import Illustration from '@/assets/images/Illustration.svg'
import { maskPhone } from '@/utils/index'
import ShowNostis from '@/utils/show-noti'
import { Box, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input'
import { useNavigate } from 'react-router-dom'
import { StyledButtonOtp, StyledHeading, StyledMainOtp, StyledWrapOTP } from './styles'
const AuthOtpContainer = () => {
	const [otp, setOtp] = useState('')
	const [isResent, setIsResent] = useState<any>()

	const navigate = useNavigate()
	const verifyInfo = useAppSelector((state) => state.authSlice.verifyInfo)
	useEffect(() => {
		if (!verifyInfo) {
			navigate('/login')
		}
	}, [verifyInfo])

	const handleChange = (otpTyping: string) => {
		setOtp(otpTyping)
	}

	const handleResetOtp = async () => {
		try {
			const response = await authApi.resetOtp({ username: verifyInfo?.username || '' })
			//@ts-ignore
			ShowNostis.success(response?.message)
			setIsResent(Date.now())
		} catch (error: any) {
			ShowNostis.error(error.data.message)
		}
	}

	return (
		<StyledWrapOTP>
			<img src={Illustration} alt="" />

			<StyledHeading>
				<Box className="main-heading">OTP Verification</Box>
				<Box className="sub-heading">Code sent via phone to {maskPhone(verifyInfo?.phone || '')}</Box>
			</StyledHeading>

			<StyledMainOtp>
				<Box className="heading">OTP Number</Box>

				<Box className="content">
					<OtpInput
						value={otp}
						inputStyle={{
							border: '1px solid transparent',
							borderRadius: '8px',
							background: '#F8FAFC',
							width: '54px',
							height: '54px',
							fontSize: '12px',
							color: '#000',
							fontWeight: '400',
							caretColor: 'blue',
						}}
						focusStyle={{
							outline: 'none',
							background: '#F8FAFC',
							border: '1px solid #0E4160',
							borderRadius: '12px',
						}}
						onChange={handleChange}
						numInputs={6}
						separator={<span style={{ padding: '0px 2px' }}> - </span>}
						shouldAutoFocus
					/>
				</Box>
			</StyledMainOtp>

			<StyledButtonOtp>
				<Button className="button-continue" variant="contained">
					Continue
				</Button>

				<p className="button-resend" onClick={handleResetOtp}>
					Resend code
				</p>

				<p className="button-resend" onClick={deleteToken}>
					Logout
				</p>
			</StyledButtonOtp>
		</StyledWrapOTP>
	)
}

export default AuthOtpContainer
