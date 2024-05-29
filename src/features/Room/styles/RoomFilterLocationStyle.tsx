import { styled } from '@mui/system'

export const ListFilters = styled('form')({})

export const FilterItem = styled('div')({
	display: 'flex',
	justifyContent: 'space-between',
	flexDirection: 'column',
	cursor: 'pointer',
	fontSize: '20px',
	background: '#F6F7F9',
	borderBottom: '1px solid #ffffff',

	userSelect: 'none',
	transition: 'background .4s',

	'&:hover': {
		background: '#f0f0f0',
	},

	'& > .cc_title_item': {
		display: 'flex',
		justifyContent: 'space-between',
		padding: '16px 32px',

		'& > .cc_icon': {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			transition: 'transform .5s',

			'&.active': {
				transform: 'rotate(-90deg)',
			},
		},
	},
})

export const ButtonFilter = styled('button')`
	text-align: center;
	padding: 20px 0;
	background-color: #fff;
	display: block;
	width: 100%;
	border: none;
	outline: none;
	color: #4877f8;
	font-size: 16px;
	line-height: 24px;
	cursor: pointer;
`

export const StyledHeadingFilter = styled('p')`
	margin: 0;
	font-size: 24px;
	color: #333333;
	font-weight: bold;
	padding: 32px;
`
