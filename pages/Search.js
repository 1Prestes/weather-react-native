import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import * as Location from 'expo-location'

import { colors } from '../utils/index'
import { useSelector } from 'react-redux'

const { PRIMARY_COLOR } = colors

export default function Search ({ navigation }) {
  const [city, setCity] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const previousSarches = useSelector(state => state.city.previousSarches)

  useEffect(() => {
    setIsLoading(false)
  }, [previousSarches])

  const handleChange = text => {
    setCity(text)
  }

  const handleSubmit = () => {
    setCity(null)
    if (city) return navigation.navigate('Home', { queryFetch: city })

    return alert('Please, type your city or select on GPS')
  }

  const handleLocation = async () => {
    setIsLoading(true)
    let { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== 'granted') {
      setIsLoading(false)
      setErrorMessage('Acces to location is needed to run the app')
      return
    }

    const location = await Location.getCurrentPositionAsync()
    const { latitude, longitude } = location.coords

    navigation.navigate('Home', {
      queryFetch: `${latitude},${longitude}`
    })
  }

  const handlePreviousSarches = queryFetch => {
    return navigation.navigate('Home', {
      queryFetch
    })
  }

  if (!isLoading) {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.searchContainer}>
          <Text style={styles.title}>Type your location here:</Text>
          <TextInput
            style={styles.input}
            type='text'
            value={city}
            onChangeText={handleChange}
            placeholder='Ex: New York'
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text
              style={{ textAlign: 'center', fontWeight: 'bold', color: '#fff' }}
            >
              Submit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLocation}>
            <Text style={{ textAlign: 'center', color: '#fff' }}>
              <MaterialIcons name='gps-fixed' size={24} color='white' />
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.previousSearchesContainer}>
          {!previousSarches.length && (
            <Text style={styles.previousTitle}>No Previous Searches</Text>
          )}
          {!!previousSarches.length && (
            <>
              <Text style={styles.previousTitle}>Previous Searches</Text>
              {previousSarches.map((city, index) => (
                <View key={index} style={styles.previousSearch}>
                  <View style={styles.city}>
                    <Text style={styles.titleText}>{city.city}</Text>
                    <Text>
                      {city.state_code}, {city.country}
                    </Text>
                  </View>
                  <AntDesign
                    name='arrowright'
                    size={24}
                    color={PRIMARY_COLOR}
                    onPress={() =>
                      handlePreviousSarches(`${city.lat},${city.lng}`)
                    }
                  />
                </View>
              ))}
            </>
          )}
        </View>
      </View>
    )
  } else {
    return (
      <View style={styles.locationContainer}>
        <StatusBar style='auto' />
        <ActivityIndicator size='large' color={colors.PRIMARY_COLOR} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
    marginHorizontal: 10
  },
  searchContainer: {
    marginBottom: 16
  },
  locationContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 16
  },
  input: {
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    borderRadius: 8
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  button: {
    borderRadius: 8,
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 15,
    paddingHorizontal: 40
  },
  previousSearchesContainer: {
    marginVertical: 20
  },
  previousTitle: {
    fontSize: 20,
    marginVertical: 15,
    fontWeight: 'bold'
  },
  previousSearch: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: '#dbdbdb'
  },
  city: {
    borderLeftWidth: 3,
    paddingHorizontal: 10,
    borderColor: PRIMARY_COLOR
  },
  titleText: {
    fontWeight: 'bold'
  }
})
