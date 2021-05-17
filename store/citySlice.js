import { createSlice } from '@reduxjs/toolkit'

export const citySlice = createSlice({
  name: 'city',
  initialState: {
    city: null,
    error: null
  },
  reducers: {
    addCity: (state, action) => {
      state.city = action.payload
    }
  },
  extraReducers: {}
})

export const { addCity } = citySlice.actions
export default citySlice.reducer
