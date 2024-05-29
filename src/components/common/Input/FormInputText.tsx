import { TextField, Typography } from '@mui/material'
import React from 'react'
import { Control, Controller } from 'react-hook-form'

interface Iprops {
	name: string
	control: Control<any>
	label: string
	type?: 'text' | 'password'
	variant?: string
	error?: string | null | undefined
}

const FormInputText = ({ name, control, label, type, error = null }: Iprops) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value } }) => (
				<>
					<TextField
						onChange={onChange}
						value={value}
						label={label}
						type={type}
						variant="standard"
						error={!!error}
						sx={{
							width: '100%',
						}}
					/>
					{error && (
						<Typography variant="caption" color="error">
							{error}
						</Typography>
					)}
				</>
			)}
		/>
	)
}

export default FormInputText
