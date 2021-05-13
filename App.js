import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as Location from 'expo-location'

import WeatherInfo from './components/WeatherInfo'

const WEATHER_API_KEY = '9d23b93fc30e76ae3791aa49d3defb43'
const BASE_URL_WEATHER = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App () {
  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitsSystem, setUnitsSystem] = useState('metric')

  useEffect(() => {
    load()
  }, [])

  async function load () {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        setErrorMessage('Acces to location is needed to run the app')
        return
      }

      const location = await Location.getCurrentPositionAsync()
      const { latitude, longitude } = location.coords
      const uri = `${BASE_URL_WEATHER}lat=${latitude}&lon=${longitude}&lang=pt_br&units=${unitsSystem}&appid=${WEATHER_API_KEY}`
      const response = await fetch(uri)
      const result = await response.json()

      if (response.ok) {
        setCurrentWeather(result)
      } else {
        setErrorMessage(result.message)
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  if (currentWeather) {
    const {
      main: { temp }
    } = currentWeather

    return (
      <View style={styles.container}>
        <StatusBar style='auto' />
        <View style={styles.main}>
          <WeatherInfo currentWeather={currentWeather} />
        </View>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
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
