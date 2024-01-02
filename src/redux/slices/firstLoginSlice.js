import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    first: false
}

export const firstLoginSlice = createSlice({
  name: 'firstLogin',
  initialState,
  reducers: {
    updateState: (state, action) => {
        state.first = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateState } = firstLoginSlice.actions

export default firstLoginSlice.reducer