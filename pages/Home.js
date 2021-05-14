import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import * as Location from 'expo-location'
import { WEATHER_API_KEY } from '@env'

import WeatherInfo from '../components/WeatherInfo'
import UnitsPicker from '../components/UnitsPicker'
import { colors } from '../utils/index'
import ReloadIcon from '../components/ReloadIcon'
import WeatherDetails from '../components/WeatherDetails'

const BASE_URL_WEATHER = 'https://api.openweathermap.org/data/2.5/weather?'

export default function Home () {
  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitsSystem, setUnitsSystem] = useState('metric')

  useEffect(() => {
    load()
  }, [unitsSystem])

  async function load () {
    setCurrentWeather(null)
    setErrorMessage(null)

    try {
      let { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        setErrorMessage('Acces to location is needed to run the app')
        return
      }

      const location = await Location.getCurrentPositionAsync()
      const { latitude, longitude } = location.coords
      const uri = `${BASE_URL_WEATHER}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`
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
