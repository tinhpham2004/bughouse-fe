import { Box } from '@mui/system'
import React, { PropsWithChildren } from 'react'

interface IProps extends PropsWithChildren {
	isPadding?: boolean
}

const Card: React.FC<IProps> = ({ children, isPadding = true }) => {
	return (
		<Box
			style={{ padding: isPadding ? '32px' : 0, background: '#ffffff', borderRadius: '20px', overflow: 'hidden' }}
		>
			{children}
		</Box>
	)
}

export default Card
