import { Grid } from '@mui/material'
import React from 'react'

interface IProps {
	label: string
	value: string
	xs?: number
	md?: number
	highlight?: 'active' | 'unactive' | 'normal'
}

const RoomDetailInfo: React.FC<IProps> = ({ label, value, xs = 12, md, highlight = 'normal' }) => {
	const colorValue = highlight === 'active' ? '#1EDB4C' : highlight === 'unactive' ? '#DB1E1E' : '#333333'

	return (
		<Grid item xs={xs} md={md}>
			<span style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>{label}</span>
			<br />
			{/* @ts-ignore */}
			<span
				style={{ fontSize: '16px', color: colorValue, fontWeight: highlight != 'normal' ? 'bold' : 'normal' }}
			>
				{value}
			</span>
		</Grid>
	)
}

export default RoomDetailInfo
