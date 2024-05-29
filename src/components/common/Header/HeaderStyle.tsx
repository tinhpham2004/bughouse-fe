import { styled, Box } from '@mui/system'

export const HeaderContainer = styled(Box)({
	padding: '0 40px',
	height: 78,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	background: '#FAFAFA',
})

export const NavHeader = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	gap: 10,
	cursor: 'pointer',
})

export const paperProps = {
	elevation: 0,

	sx: {
		filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
		mt: 1.5,
		minWidth: '240px',
		borderRadius: '3px',
		overflow: 'hidden',
		gap: 2,

		'& .MuiList-root': {
			padding: 0,
		},

		'& .MuiSvgIcon-root': {
			color: '#777E90',
		},

		'& .MuiButtonBase-root': {
			gap: '10px',
		},

		'& .MuiMenuItem-root': {
			padding: '15px 20px',
		},

		'& .MuiAvatar-root': {
			width: 32,
			height: 32,
			ml: -0.5,
			mr: 1,
		},

		'&:before': {
			content: '""',
			display: 'block',
			position: 'absolute',
			top: 0,
			right: 14,
			width: 10,
			height: 10,
			bgcolor: 'background.paper',
			transform: 'translateY(-50%) rotate(45deg)',
			zIndex: 0,
		},
	},
}

export const StyledNotificationItem = styled(Box)`
	padding: 20px 25px;
	display: flex;
	justify-items: space-between;

	gap: 20px;
	margin-bottom: 10px;
	transition: all 0.3s;
	background-color: #fff;
	border-bottom: 1px solid #e7e7e7;
	border-radius: 3px;

	& .headingNotification {
		font-weight: bold;
	}
	&.notCheck {
		&:hover {
			cursor: pointer;
			background-color: white;
			box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
		}
	}

	& .middle {
		flex: 1;
	}

	& .check-notification {
		display: flex;
		align-items: center;
	}

	&.success {
	}

	&.warning {
	}

	&.error {
	}

	&.checked {
		background: rgb(247, 255, 250);
	}
`

export const StyledContentDrawer = styled(Box)`
	width: 450px;
	padding: 10px;

	.Heading {
		text-align: center;
		padding: 20px;
		font-weight: bold;
		font-size: 24px;
	}
`

export const StyledWrapHeader = styled(Box)`
	display: flex;
	align-items: center;
	gap: 20px;

	& .avatar {
		width: 32px;
		height: 32px;
	}

	& .icon_notification {
		font-size: 30px;
		cursor: pointer;
	}

	& .name_heading {
		font-weight: 600;
		font-size: 14px;
		margin-right: 2px;
		text-transform: capitalize;
	}
`

export const StyledWrapModal = styled(Box)`
	border-radius: 8px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 450px;
	box-shadow: 24px 24px 0 rgba(0, 0, 0, 0.2);
	background: white;
	padding: 40px 25px 10px 25px;

	& .heading_changepassword {
		text-align: center;
		font-size: 30px;
		font-weight: 600;
		margin-bottom: 10px;
	}
`

export const StyledMiddleContent = styled('div')`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	width: 100%;
	height: 80vh;

	& .wrapContent {
		display: flex;
		align-items: center;
		justify-items: center;
		gap: 10px;
		flex-direction: column;

		font-size: 14px;
		color: '#333';
		font-style: italic;

		& .heading {
			font-size: 26px;
			font-weight: bold;
		}

		& .img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
`
