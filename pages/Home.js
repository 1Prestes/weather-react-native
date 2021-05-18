import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { WEATHER_API_KEY } from '@env'
import { useDispatch } from 'react-redux'

import WeatherInfo from '../components/WeatherInfo'
import UnitsPicker from '../components/UnitsPicker'
import { colors } from '../utils/index'
import ReloadIcon from '../components/ReloadIcon'
import WeatherDetails from '../components/WeatherDetails'

const BASE_URL_WEATHER = 'https://api.openweathermap.org/data/2.5/weather?'

export default function Home ({ route }) {
  const { queryFetch } = route.params

  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitsSystem, setUnitsSystem] = useState('metric')
  const dispatch = useDispatch()

  useEffect(() => {
    load()
  }, [unitsSystem])

  async function load () {
    setCurrentWeather(null)
    setErrorMessage(null)

    try {
      if (queryFetch) {
        const fetchCity = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?key=e85809527b0341b18712ec1bacc3aab9&q=${queryFetch}`
        )
        const resultCity = await fetchCity.json()

        const {
          components: { country, state, state_code },
          geometry: { lat, lng }
        } = resultCity.results[0]
        // const previousSarches = {
        //   country,
        //   state,
        //   state_code,
        //   lat,
        //   lng
        // }
        dispatch(addPreviousSarches({ country, state, state_code, lat, lng }))
        const uri = `${BASE_URL_WEATHER}lat=${lat}&lon=${lng}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`

        const response = await fetch(uri)
        const result = await response.json()
        if (response.ok) {
          setCurrentWeather(result)
        } else {
          setErrorMessage(result.message)
        }
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  if (currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style='auto' />
        <View style={styles.main}>
          <UnitsPicker
            unitsSystem={unitsSystem}
            setUnitsSystem={setUnitsSystem}
          />
          <ReloadIcon load={load} />
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <WeatherDetails
          currentWeather={currentWeather}
          unitsSystem={unitsSystem}
        />
      </View>
    )
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>{errorMessage}</Text>
        <StatusBar style='auto' />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color={colors.PRIMARY_COLOR} />
        <StatusBar style='auto' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  main: {
    justifyContent: 'center',
    flex: 1
  }
})
