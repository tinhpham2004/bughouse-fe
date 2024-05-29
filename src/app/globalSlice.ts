import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const globalSice = createSlice({
	name: 'global',
	initialState,
	reducers: {
		reset: (state) => {
			return initialState
		},
	},
})

export default globalSice.reducer
