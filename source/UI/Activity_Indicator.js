import React from 'react'
import { ActivityIndicator ,View} from 'react-native'

function Activity_Indicator() {
  return (
    <View style={{flex:1 ,justifyContent:"center" , alignItems:"center"}}>
      <ActivityIndicator size={"large"} color={"black"}/>
    </View>
  )
}

export default Activity_Indicator
