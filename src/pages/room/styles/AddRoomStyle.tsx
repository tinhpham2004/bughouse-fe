import { styled } from '@mui/system'
import { Grid, Typography, Box } from '@mui/material'

export const GroupButton = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	marginTop: '40px',
	gap: '15px',

	'& > button': {
		border: 'none',
		outline: 'none',
		padding: '15px 40px',
		minWidth: '100px',
		background: '#F7346F',
		color: 'white',
		borderRadius: '8px',
		fontSize: '16px',
	},
})

export const FileManager = styled(Box)({
	height: '100%',
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	background: '#fff',
	flex: '1 1 0',
	border: '2px dashed black',
	borderRadius: '4px',

	'&.active': {
		borderStyle: 'solid',
	},
})

export const DisplayResultImages = styled(Grid)({
	display: 'flex',
	flexDirection: 'column',
	maxHeight: '100px',
	overflow: 'auto',
	marginBottom: '20px',
})

export const StyledBoxInput = styled(Box)`
	width: 100%;
	border: 1px solid;
	border-radius: 10px;
	overflow: hidden;
	margin-top: 5px;
	background-color: #dedfe1;

	input {
		outline: none;
		font-size: 14px;
		border: none;
		padding: 15px;
		width: 100%;
		flex: 1 1 0;
	}
`
