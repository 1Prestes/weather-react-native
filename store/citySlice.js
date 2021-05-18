import { createSlice } from '@reduxjs/toolkit'

export const citySlice = createSlice({
  name: 'city',
  initialState: {
    error: null,
    previousSarches: []
  },
  reducers: {
    addPreviousSarches: (state, action) => {
      if (state.previousSarches.length >= 3) {
        state.previousSarches.unshift(action.payload)
        state.previousSarches.length = 3
      } else {
        state.previousSarches.unshift(action.payload)
      }
    }
  }
})

export const { addPreviousSarches } = citySlice.actions
export default citySlice.reducer
