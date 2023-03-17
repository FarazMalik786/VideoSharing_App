import React from 'react'
import { StyleSheet, Text , View} from 'react-native'
import { Video } from 'expo-av'
function User_Video({ route, navigation , video_url}) {
  const { url } = route.params;
  const isRoutePresent = !!route;
  console.log(isRoutePresent)
  return (
    <View style={styles.container}>
      <Video source={{uri: isRoutePresent ? url : video_url }}
      resizeMode="cover"
      style={styles.video}
      shouldPlay={true}
      isLooping={true}
      />
    </View>
  )
}

export default User_Video
const styles = StyleSheet.create({
  container:{
    flex:1,

  },
  video:{
    flex:1,
  }
})