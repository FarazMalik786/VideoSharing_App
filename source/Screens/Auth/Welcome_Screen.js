import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import Custom_button from '../../UI/Custom_button';
import { responsiveHeight, responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
function Welcome_Screen({ navigation }) {
  const [btncolor , setbtncolor] = useState("white")
  const PressHandler =(screen)=>{
   return navigation.navigate(screen)
  }
  return (
    <View style={styles.container}>
      <FontAwesome name="music" size={responsiveHeight(20)} color="black" style={styles.icon} />
      <Text style={styles.txt}>Welcome to your app</Text>
      <View style={styles.btn}>
        <Custom_button text="Log In" btn_height={responsiveHeight(7)}
          btn_width={responsiveWidth(60)} btn_backgroundColor={"white"} borderwidth={responsiveWidth(0.5)}
          radius={responsiveWidth(2)} onpress={()=>{ PressHandler("login")}}
          />
      </View>
      <View style={styles.btn}>
        <Custom_button text="Sign Up" btn_height={responsiveHeight(7)}
          btn_width={responsiveWidth(60)} btn_backgroundColor={"white"} borderwidth={responsiveWidth(0.5)}
          radius={responsiveWidth(2)} onpress={()=>{ PressHandler("signup")}}
          />
      </View>

    </View>
  )
}

export default Welcome_Screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  icon: {
    marginTop: responsiveHeight(19),
    marginVertical: responsiveHeight(7)
  },
  txt: {
    fontSize: responsiveFontSize(4),
    marginVertical: responsiveHeight(3)
  },
  btn:{
    marginVertical: responsiveHeight(1)
  }
})