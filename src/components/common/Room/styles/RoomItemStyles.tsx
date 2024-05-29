import { Box, Button, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { Link } from 'react-router-dom'

export const CardRoomItem = styled(Link)({
	padding: '13px 0',
	borderBottom: '1px solid #CDCDCD',
	display: 'flex',
	gap: '16px',
	textDecoration: 'none',
	color: 'black',

	'& > .roomItemImage': {
		width: '216px',
		height: '152px',
		borderRadius: '8px',
		objectFit: 'cover',
		overflow: 'hidden',

		'& > img': {
			width: '100%',
			height: '100%',
		},
	},

	'& > .roomItemContent': {
		display: 'flex',
		flexDirection: 'column',
		flex: '1 1 0',
		alignItems: 'flex-start',
		height: '100%',
		gap: '20px',
		fontWeight: 'bold',

		'@media only screen and (max-width: 765px)': {
			gap: '5px',
		},
	},

	'@media only screen and (max-width: 765px)': {
		flexDirection: 'column',

		'& > .roomItemImage': {
			width: '100%',
			height: '250px',
		},
	},
})

export const CardRoomSkeleton = styled(Box)({
	padding: '13px 0',
	borderBottom: '1px solid #CDCDCD',
	display: 'flex',
	gap: '16px',
	textDecoration: 'none',
	color: 'black',

	'& > .roomItemImage': {
		width: '216px',
		height: '152px',
		borderRadius: '8px',
		objectFit: 'cover',
		overflow: 'hidden',

		'& > img': {
			width: '100%',
			height: '100%',
		},
	},

	'& > .roomItemContent': {
		display: 'flex',
		flexDirection: 'column',
		flex: '1 1 0',
		alignItems: 'flex-start',
		height: '100%',
		gap: '20px',

		'@media only screen and (max-width: 765px)': {
			gap: '5px',
		},
	},

	'@media only screen and (max-width: 765px)': {
		flexDirection: 'column',

		'& > .roomItemImage': {
			width: '100%',
			height: '250px',
		},
	},
})

export const RoomItemHeading = styled(Typography)({
	color: 'black',
	fontSize: '18px',
	fontFamily: 'Nunito',
	fontWeight: 'bold',
	margin: 0,
	textTransform: 'capitalize',
})

export const RoomPreviews = styled(Box)({
	gap: '16px',
	display: 'flex',
	flexDirection: 'column',
	color: '#666666',
	fontSize: '16px',
	fontWeight: '100',
	width: '100%',

	'@media only screen and (max-width: 900px)': {
		gap: '10px',
	},
})

export const RoomPreviewItem = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	gap: '15px',
	fontWeight: '600',
	fontFamily: 'Nunito',
	textTransform: 'capitalize',
})

export const RoomPrice = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	color: '#F73486',
	textAlign: 'center',
	flexDirection: 'column',
	justifyContent: 'center',

	'& > span': {
		fontSize: '48px',
		lineHeight: '68px',
		fontWeight: 'bold',
	},
})

export const StyledOwner = styled(Box)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	flex: 1;
	gap: 10px;
`

export const StyledButtonOwner = styled('span')`
	text-align: center;
	border: 1px solid #f73486;
	width: fit-content;
	font-size: 14px;
	padding: 5px 10px;
	border-radius: 10px;
	color: #f73486;
	transition: all 0.3s;
	overflow: hidden;
	min-width: 100px;

	&.cancel_contract {
	}

	&:hover {
		background: #f73486;
		color: white;
	}

	& svg {
		color: #f73486;
	}
`

export const StyledStatus = styled('span')`
	font-weight: bold;

	&.green {
		color: green;
	}

	&.red {
		color: red;
	}

	&.yellow {
		color: yellow;
	}

	&.info {
		color: #385898;
	}

	&.rented {
		color: #ff6f91;
	}

	&.request {
		color: #d65db1;
	}
`

export const StyledContractDrawer = styled(Box)`
	max-width: 70vw;
	width: 100%;
	padding: 30px;
	padding-bottom: 10px;
	position: relative;

	@media only screen and (max-width: 990px) {
		max-width: 100%;
	}
`

export const StyledCloseButton = styled('div')`
	position: fixed;
	top: 0;
	right: 0;

	padding: 10px;
	margin-right: 10px;
	cursor: pointer;
	display: none;

	@media only screen and (max-width: 990px) {
		display: block;
	}
`

export const StyledModalForm = styled('form')`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: white;
	padding: 20px;
	border-radius: 8px;
	outline: none;
	width: 60vw;
	min-width: 800px;
	border: none;

	& .headerForm {
		font-weight: bold;
		margin-bottom: 20px;
		font-size: 36px;
		text-align: center;
	}

	& .descriptionForm {
		font-weight: 100;
		font-size: 16px;
		margin-bottom: 20px;
	}
`

export const StyledWrapServices = styled('div')`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
`

export const StyledButtonService = styled(Button)`
	background-color: #f73486;
	color: white;
	text-transform: none;
	padding: 10px 20px;
	transition: all 0.4s;

	&:hover {
		background-color: #f73486;
		opacity: 0.7;
	}

	&.disabled {
		display: none;
	}
`

export const StyledWrapMoreService = styled(Box)`
	margin-bottom: 20px;
	display: flex;
	align-items: center;
	gap: 10px;
	flex-wrap: wrap;
`

export const StyledInfoOfOwner = styled(Box)`
	margin-top: 24px;
	gap: 8px;
	display: flex;
	align-items: center;

	img,
	.img {
		width: 60px;
		height: 60px;
		object-fit: cover;
		border-radius: 30px;
	}

	.img {
		box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	}

	& .main-content {
		border-right: 1px solid #cdcdcd;
		padding-right: 24px;
		text-transform: lowercase;

		p:first-of-type {
			text-transform: capitalize;
			font-weight: bold;
		}

		p:last-child {
			font-size: 14px;
		}
	}
`

export const StyledWrapInfo = styled(Box)`
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	width: 100%;
	gap: 10px;
	.text {
		flex: 1;
	}

	.right {
		text-align: right;
	}
`

export const StyledText = styled('p')``

export const StyledModalReOpenContract = styled('form')`
	background: white;
	width: 100%;
	max-width: 450px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	border-radius: 3px;

	& .modal-heading {
		font-weight: 600;
		border-bottom: 1px solid #ccc;
		padding: 10px 20px;
	}

	& .modal-body {
		padding: 20px;
		border-bottom: 1px solid #ccc;

		& .modal-body__textfeild {
			&--label {
				color: #001737;
				font-size: 14px;
				font-style: normal;
				font-weight: 500;
				line-height: 21px;
				display: block;
				margin-bottom: 8px;
			}

			input,
			select,
			textarea {
				display: flex;
				align-items: center;
				width: 100%;
				padding: 8px 10px;
				gap: 8px;
				border: 1px solid #c0ccda;
				border-radius: 4px;
				margin-bottom: 10px;
				outline: none;
				resize: none;

				&:focus {
					border: 1px solid #ccc;
				}

				&.error {
					border: 1px solid red;

					&::placeholder {
						color: red;
					}
				}
			}
		}

		.modal-body__error {
			display: block;
			margin-top: -10px;
			margin-bottom: 10px;
			font-size: 14px;
			font-style: italic;
			color: red;
		}
	}

	& .modal-footer {
		padding: 15px 20px;
		display: flex;
		align-item: center;
		justify-content: flex-end;
		gap: 10px;

		& button {
			text-transform: unset;
			padding: 3px 15px;
		}
	}
`
