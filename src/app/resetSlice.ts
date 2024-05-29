import { createSlice } from '@reduxjs/toolkit'

const resetSlice = createSlice({
	name: 'reset',
	initialState: {},
	reducers: {
		reset: () => ({ type: 'RESET' }),
	},
})

export const { reset } = resetSlice.actions

export default resetSlice.reducer
