import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'

import { colors } from '../utils/index'

const { PRIMARY_COLOR } = colors

export default function Search ({ navigation }) {
  const [city, setCity] = useState(null)

  const handleChange = text => {
    setCity(text)
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchContainer}>
        <Text style={styles.title}>Type your location here: {city}</Text>
        <TextInput
          style={styles.input}
          type='text'
          value={city}
          onChangeText={handleChange}
          placeholder='Ex: New York'
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text
            style={{ textAlign: 'center', fontWeight: 'bold', color: '#fff' }}
          >
            Submit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={{ textAlign: 'center', color: '#fff' }}>
            <MaterialIcons name='gps-fixed' size={24} color='white' />
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.previousSearchesContainer}>
        <Text style={styles.previousTitle}>Previous Searches</Text>

        <View style={styles.previousSearch}>
          <View style={styles.city}>
            <Text style={styles.titleText}>Rio de Janeiro</Text>
            <Text>RJ, Brazil</Text>
          </View>
          <AntDesign name='arrowright' size={24} color={PRIMARY_COLOR} />
        </View>

        <View style={styles.previousSearch}>
          <View style={styles.city}>
            <Text style={styles.titleText}>Rio de Janeiro</Text>
            <Text>RJ, Brazil</Text>
          </View>
          <AntDesign name='arrowright' size={24} color={PRIMARY_COLOR} />
        </View>

        <View style={styles.previousSearch}>
          <View style={styles.city}>
            <Text style={styles.titleText}>Rio de Janeiro</Text>
            <Text>RJ, Brazil</Text>
          </View>
          <AntDesign name='arrowright' size={24} color={PRIMARY_COLOR} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
    marginHorizontal: 10
  },
  searchContainer: {
    marginBottom: 16
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
