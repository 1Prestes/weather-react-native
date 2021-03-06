import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'

import store from './store/store'
import Home from './pages/Home'
import Search from './pages/Search'

const Stack = createStackNavigator()

export default function App () {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Search'>
          <Stack.Screen name='Search' component={Search} />
          <Stack.Screen name='Home' component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
