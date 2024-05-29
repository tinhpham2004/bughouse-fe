import AuthOtpContainer from '@/features/Auth/auth-otp'
import { StyledContainerWrap, StyledWrapTop } from './styles'

const AuthenPage = () => {
	return (
		<StyledContainerWrap>
			<StyledWrapTop />

			<AuthOtpContainer />
		</StyledContainerWrap>
	)
}

export default AuthenPage
