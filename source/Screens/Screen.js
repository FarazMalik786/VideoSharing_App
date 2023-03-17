import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { View } from 'react-native'
import Welcome_Screen from './Auth/Welcome_Screen'
import Login from './Auth/Login'
import Signup from './Auth/Signup'
import Main from './Main/Main'
import Add_Post from './Main/Add_Post'
import User_Video from '../UI/User_Video'
import Other_User_Profile from './Main/Other_User_Profile'
import { Provider } from 'react-redux';
import { mystore } from '../Redux/Store'

const Stack = createNativeStackNavigator();
function Screen() {
  return (
    <NavigationContainer>
      <Provider store={mystore}>
        <Stack.Navigator>
          <Stack.Screen name='welcome' component={Welcome_Screen} options={{ headerShown: false }} />
          <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="signup" component={Signup} options={{ headerShown: false }} />
          <Stack.Screen name="main" component={Main} options={{ headerShown: false }} />
          <Stack.Screen name="addpost" component={Add_Post} options={{ headerShown: false }} />
          <Stack.Screen name="uservideo" component={User_Video} options={{ headerShown: false }} />
          <Stack.Screen name="otheruserprofile" component={Other_User_Profile} options={{ headerShown: false }} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )
}

export default Screen
