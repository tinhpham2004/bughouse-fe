import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { Link } from 'react-router-dom'

export const Wrapper = styled(Grid)({
	maxWidth: '900px',
	height: '600px',
	width: '100%',
	boxShadow: '0 15px 16.83px 0.17px rgb(0 0 0 / 5%)',

	borderRadius: '20px',
	background: '#fff',
})

export const LinkSignIn = styled(Link)({
	fontSize: 14,
	color: '#222',
	display: 'block',
	textAlign: 'center',
})

export const HeaderSignUp = styled(Typography)({
	lineHeight: '1.66',
	margin: 0,
	padding: 0,
	fontWeight: 700,
	color: '#222',
	fontFamily: 'Nunito, san-serif',
	fontSize: 36,
})

export const Input = styled(TextField)({
	width: '100%',
})

export const ButtonAuth = styled(LoadingButton)`
	display: 'flex';
	align-items: center;
	text-transform: none;
	padding: 10px 20px;
	background: #f73486;
	transition: all 0.3s;

	&:hover {
		background: rgba(247, 52, 134, 0.8);
		box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	}
`

export const FormControl = styled('form')(() => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	width: '100%',
	gap: 10,
	padding: 80,
}))

export const StyledButton = styled(Button)`
	text-transform: none;
	padding: 5px 20px;
`

export const StyledTypography = styled('p')`
	font-size: 14px;
	line-height: 18px;
	color: #232323;
`

export const StyledGroupButton = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 5px;
`

export const StyledWrapUpdateID = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	flex-direction: column;

	& .description_updateId {
		color: red;
		font-weight: 600;
		font-size: 18px;
		margin: 20px 0;
		text-align: center;
	}

	& .heading {
		font-style: normal;
		font-weight: bold;
		font-size: 30px;
		line-height: 130%;

		text-align: center;
		letter-spacing: -0.002em;
		color: #061e2d;
	}
`

export const StyledMiddle = styled(Box)`
	width: 100%;
	display: flex;
	justify-content: center;
`

export const StyledButtonUpdateId = styled(Button)`
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
	margin: 40px auto;
	cursor: pointer;

	&.disabled {
		color: white;
	}

	&:hover {
		background: #0e4160;
	}
`

export const StyledWrapTop = styled(Box)`
	position: absolute;
	width: 100%;
	height: 50vh;
	background: #f8fafc;
	z-index: 1;
	top: 0;
	left: 0;
`

export const StyledContainerWrap = styled(Box)`
	height: 100vh;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`
