import styled from '@emotion/styled'
import { Box } from '@mui/material'

export const StyledWrapOTP = styled(Box)`
	z-index: 10;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 40px;
	gap: 44px;
	isolation: isolate;

	width: 480px;
	background: #ffffff;
	border: 1px solid #f0f5f5;
	box-shadow: 0px 0px 4px 1px rgba(16, 24, 24, 0.03);
	border-radius: 14px;
`

export const StyledHeading = styled(Box)`
	.main-heading {
		font-style: normal;
		font-weight: 600;
		font-size: 24px;
		text-align: center;
		letter-spacing: -0.002em;
		color: #061e2d;
	}

	.sub-heading {
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 20px;
		text-align: center;

		color: #8392a5;
		margin-top: 8px;
	}
`

export const StyledMainOtp = styled(Box)`
	.heading {
		font-style: normal;
		font-weight: 500;
		font-size: 16px;
		line-height: 140%;
		text-align: center;

		color: #001f1c;
		margin-bottom: 10px;
	}

	.content {
	}
`

export const StyledButtonOtp = styled(Box)`
	.button-continue {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 16px 10px;
		gap: 10px;

		width: 320px;
		height: 50px;

		background: #0e4160;
		border-radius: 8px;
		cursor: pointer;

		&.disabled {
			color: white;
		}
	}

	.button-resend {
		font-style: normal;
		font-weight: bold;
		font-size: 16px;
		line-height: 140%;
		text-align: center;

		color: #0e4160;
		margin-top: 20px;
		cursor: pointer;
	}
`
