import { Box, Button, Grid, styled } from '@mui/material'

export const StyledWalletCard = styled(Box)`
	height: 130px;
	align-items: center;
	display: flex;
	justify-content: center;
	flex-direction: column;
	border: 1px solid #3b71fe;
	color: #3b71fe;
	border-radius: 12px;

	& .textBlance {
		font-size: 26px;
		font-weight: medium;
		font-family: monospace;
	}
`

export const StyledWrapButtonGroupWallet = styled(Box)`
	margin-top: 30px;
	display: flex;
	gap: 10px;
	padding: 0 30px;
`

export const StyledButtonFilterWallet = styled('button')`
	text-transform: none;
	min-width: 100px;
	border-radius: unset;
	color: black;
	background-color: transparent !important;
	outline: none;
	padding: 10px 20px;
	border: none;
	cursor: pointer;
	font-size: 16px;
	transition: all 0.3s;
	border-bottom: 1px solid transparent;

	&:hover {
		color: #f73486;
	}

	&.active {
		border-bottom: 1px solid #f73486 !important;
		color: #f73486;
	}
`

export const ListItemTransaction = styled(Box)`
	height: 70%;
	overflow: auto;
	padding: 20px 30px 0;
	display: flex;
	flex-direction: column;
	gap: 25px;
	font-family: 'Nunito';
`

export const IconItemTransaction = styled(Box)`
	width: 50px;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	background: #3b71fe1f;
	color: #145ce6;
`

export const StyledWrapRightWallet = styled(Box)`
	background: #fff;
	box-shadow: 0px 32px 60px #d3d3d31f;
	height: 600px;
	border-radius: 20px;
	overflow: hidden;

	& .headingWallet {
		font-weight: 600;
		font-size: 34px;
		padding: 40px 30px 0;
	}
`

export const StyledButtonWallet = styled(Button)`
	text-transform: none;
`

export const StyledWrapInfoUser = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	border-bottom: 1px solid #f5f6f7;
	gap: 25px;
	width: 100%;
	padding-bottom: 20px;
`

export const StyledWrapIndentity = styled(Box)`
	display: flex;
	align-items: center;
	border-radius: 32px;
	padding: 10px 25px;
	gap: 10px;
	background: #f4f5f6;
	color: #777e90;
`

export const StyledWrapDetailInfo = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 25px;
	width: 100%;
	padding: 25px 0;

	& .DetailInfo__content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}
`

export const StyledButtonEdit = styled('button')`
	width: 100%;
	background: #878cff;
	border-radius: 5px;
	padding: 15px 0;
	color: white;
	border: none;
	outline: none;
	cursor: pointer;
	margin-top: 20px;
	font-weight: 500;

	&.w-inline {
		width: auto;
		padding: 15px 80px;
	}
`

export const StyledWrapStepCompleted = styled(Box)`
	width: 100%;
	border-radius: 20px;
	padding: 20px 30px;
	background: #ffffff;
	border: 1px solid #f3f3f3;
	box-shadow: 0px 10px 24px -15px rgba(27, 27, 27, 0.12);
	display: flex;
	flex-direction: column;
	gap: 15px;
	margin-bottom: 40px;

	&.heading__completed {
		font-family: Poppins;
		font-style: normal;
		font-weight: 400;
		font-size: 14px;
		line-height: 24px;
	}
`

export const StyledWrapButtonBottom = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	margin-top: 20px;
	margin-bottom: 40px;
`

export const StyledCardVerified = styled('span')`
	color: black;
	font-size: 14px;
	background: #e7ecf3;
	padding: 10px 25px;
	border-radius: 30px;
	display: flex;
	align-items: center;
	gap: 10px;
`

export const StyledGridLayout = styled(Grid)`
	border: 1px solid #e7ecf3;
	padding: 25px 30px;
	border-radius: 10px;
	align-items: center;
	flex-direction: column;
`

export const StyledWrapPage = styled(Box)`
	padding-bottom: 80px;
`
