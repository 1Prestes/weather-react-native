import { createSlice } from '@reduxjs/toolkit'

// export const fetchWeatherByCity = createAsyncThunk(
//   'city/fetchWeatherByCity',
//   async city => {
//     console.log(city)
//     const response = await fetch(
//       `https://api.opencagedata.com/geocode/v1/json?key=e85809527b0341b18712ec1bacc3aab9&q=${city}`
//     )
//     return response.json()
//   }
// )

export const citySlice = createSlice({
  name: 'city',
  initialState: {
    error: null,
    previousSarches: []
  },
  reducers: {
    addPreviousSarches: (state, action) => {
      if (previousSarches.length >= 3) {
        previousSarches.unshift(action.payload)
        previousSarches.length = 3
      } else {
        previousSarches.unshift(action.payload)
      }
    }
  }
})

export const { addPreviousSarches } = citySlice.actions
export default citySlice.reducer
