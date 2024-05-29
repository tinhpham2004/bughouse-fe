import { Grid, Typography, Button, Box, styled } from '@mui/material'

export const RoomDetailContent = styled(Grid)({
	marginTop: '10px',
	color: '#666666',
	fontSize: '12px',
	display: 'flex',
})

export const HeadingCardDetail = styled(Typography)({
	fontSize: '24px',
	color: '#333333',
	fontWeight: 'bold',
	display: 'inline-flex',
	alignItems: 'center',
	gap: '15px',
	background: '#f6f7f9',
	padding: '10px 15px',
	borderRadius: '24px',
})

export const DetailRoom = styled(Grid)({
	marginTop: '10px',

	'@media only screen and (max-width: 900px )': {
		flexDirection: 'column-reverse',
	},
})

export const RoomUtiliti = styled(Grid)({
	display: 'flex',
	alignItems: 'center',
	gap: '10px',

	'& > svg': {
		fontSize: '32px',
		color: 'rgb(102, 102, 102)',
	},
})

export const RoomDetailGallary = styled(Box)({
	height: '500px',
	borderRadius: '20px',
	overflow: 'hidden',
	boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',

	'& > .cc_swiper_wrapper': {
		userSelect: 'none',
		height: '100%',
	},

	img: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	},
})

export const HeadingRoomBlock = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	marginTop: '32px',

	'& > .headingRoom': {
		margin: 0,
		padding: 0,
		fontSize: '30px',
		color: '#333333',
		fontWeight: 'bold',
		textTransform: 'capitalize',
	},
})

export const ButtonRent = styled(Button)({
	background: '#F73486',
	padding: '5px 15px',
	display: 'block',
	borderRadius: 15,

	color: 'white',
	textTransform: 'none',
	fontSize: '14px',
	transition: 'all .4s',

	'&:hover': {
		opacity: '0.6',
		background: '#F73486',
	},

	'&.disabled': {
		opacity: '0.6',
		background: '#fd7cb2',
		cursor: 'not-allowed',
	},
})

export const ModalContract = styled(Box)({
	//@ts-ignore
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	position: 'absolute',
	width: '75%',
	background: 'white',
	boxShadow: 24,
	borderRadius: '10px',
	padding: '20px',
	overflowY: 'scroll',
	height: '90vh',

	'&.parent': {
		'&::-webkit-scrollbar-track': {
			backgroundColor: '#f5f5f5',
		},

		'&::-webkit-scrollbar': {
			width: '5px',
			backgroundColor: '#f6f5f2',
		},

		'&::-webkit-scrollbar-thumb': {
			backgroundColor: '#ccc',
			borderRadius: '6px',
		},
	},
})

export const SignName = styled(Grid)`
	width: 100%;
	text-align: center;
	margin-top: 10px;

	display: flex;
	align-item: center;
`

export const SignNameItem = styled(Grid)({
	'& > .headingSign': {
		padding: '10px',
		border: '1pt solid rgb(221, 221, 221)',
	},

	'&> .signContent': {
		'& > p:first-of-type': {
			paddingTop: '10px',
			color: '#F73486',
			fontSize: '30px',
		},
	},
})

export const StyledAcceptTerm = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	user-select: none;
	margin-bottom: '-20px';
`

export const StyledLabelAcceptTerm = styled('label')`
	user-select: none;
`

export const StyledButtonAcceptTerm = styled(Button)`
	text-transform: none;
	background-color: #f73486;
	transition: all 0.4s;
	height: 30px;
	user-select: 'none';

	&:hover {
		background-color: #f73486;
		opacity: 0.8;
	}
`

export const StyledCheckBox = styled('input')``

export const StyledModalPayment = styled(Box)`
	width: 500px;
	transform: translate(-50%, -50%);
	position: absolute;
	left: 50%;
	top: 50%;
	background: white;
	border-radius: 6px;
	height: 300px;
	padding: 20px;
`

export const StyledHeadingPayment = styled(Typography)`
	font-size: 30px;
	text-align: center;
`

export const StyledListPayment = styled('ul')`
	list-style: none;
`
export const StyledItemListPayment = styled('li')`
	display: flex;
	align-items: center;
	justify-content: space-between;

	& .item-left {
		display: flex;
		align-items: center;
		font-size: 18px;
		font-weight: bold;
		gap: 10px;

		img {
			width: 100%;
			height: 50px;
		}
	}
`

export const StyledFeedbackRoom = styled('div')`
	display: flex;
	flex-direction: column;
	gap: 32px;
`

export const StyledInputSendFeedback = styled('form')`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 5px;

	input,
	select {
		display: flex;
		align-items: center;
		width: 100%;
		padding: 8px 10px;
		gap: 8px;
		border: 1px solid #c0ccda;
		border-radius: 4px;
		outline: none;

		&:focus {
			border: 1px solid #ccc;
		}
	}

	button {
		text-transform: unset;
		padding: 5px 5px;
		outline: none;
		border: none;
		cursor: pointer;
		background: transparent;

		display: flex;
		align-items: center;
		justify-content: center;

		min-width: 40px;
	}
`

export const StyledActionButton = styled('div')`
	margin-top: 20px;

	& button {
		height: 40px;
		min-width: 80px;
		text-transform: none;
	}
`

export const StyledWrapFeedback = styled(Box)``

export const StyledHeadingFeedback = styled('p')`
	margin-bottom: 10px;
	font-size: 18px;
	border-bottom: 1px solid #ccc;
	padding-bottom: 10px;
`

export const StyledItemFeedback = styled('div')`
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 20px;

	& .item__feedback--content {
		display: flex;
		flex-direction: column;

		p:first-of-type {
			text-transform: capitalize;
			font-weight: bold;
		}

		p:last-of-type {
			font-size: 14px;
		}
	}
`
