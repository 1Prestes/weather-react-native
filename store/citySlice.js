import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchWeatherByCity = createAsyncThunk(
  'city/fetchWeatherByCity',
  async city => {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?key=e85809527b0341b18712ec1bacc3aab9&q=${city}`
    )
    return response.json()
  }
)

export const citySlice = createSlice({
  name: 'city',
  initialState: {
    city: null,
    error: null,
    previousSarches: []
  },
  reducers: {
    addCity: (state, action) => {
      state.city = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchWeatherByCity.fulfilled, (state, action) => {
      //   console.log(action.payload.results)
      const { results } = action.payload
      console.log(results)
      return state
    })

    builder.addCase(fetchWeatherByCity.rejected, (state, action) => {
      console.log(action)
      return state
    })
  }
})

export const { addCity } = citySlice.actions
export default citySlice.reducer
