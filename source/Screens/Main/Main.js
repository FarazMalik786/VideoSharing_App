import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { View } from 'react-native'
import { BlurView } from 'expo-blur';
import Home from './Home';
import Post from './Post';
import Profile from './Profile';
import Search from './Search';
import { Octicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();
function Main() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false , tabBarActiveTintColor:"black" , tabBarInactiveTintColor:"grey"}}>
      <Tab.Screen name="feed" component={Home} 
      options={{tabBarIcon: ({color})=>{ return <Octicons name="home" size={24} color={color} /> }}}/>
      <Tab.Screen name="search" component={Search}  options={{tabBarIcon: ({color})=>{ return  <AntDesign name="search1" size={24} color={color} />}}}/>
      <Tab.Screen name="+" component={Post} options={{tabBarIcon: ({color})=>{ return <AntDesign name="plussquareo" size={24} color={color} />}}}/>
      <Tab.Screen name="profile" component={Profile}  options={{tabBarIcon: ({color})=>{ return <MaterialCommunityIcons name="account-circle" size={24} color={color} />}}}/>
    </Tab.Navigator>
  )
}

export default Main
