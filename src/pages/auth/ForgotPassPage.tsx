import SEO from '@/components/seo'
import PasswordContainer from '@/features/Auth/forgot-password'
import React from 'react'

import { StyledContainerWrap } from './styles'

const ForgotPassPage = () => {
	return (
		<StyledContainerWrap>
			<SEO title="Bughoue - Forgot password" />
			<PasswordContainer />
		</StyledContainerWrap>
	)
}

export default ForgotPassPage
