import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { login } from '../../Firebase/Auth';
import Custom_button from '../../UI/Custom_button';
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword , createUserWithEmailAndPassword} from "firebase/auth";
import { fetchUserById } from '../../Redux/User_Info';
import { auth } from '../../Firebase/Config';
import { fetchUserPost } from '../../Redux/UserPost';

function Login({ navigation }) {
  const [input, setinput] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const PressHandler = () => {
    if (input.email == "" || input.password == "") {
      Alert.alert("Invalid Email Or Password");
    } else {
      //login(input.email, input.password , navigation);
      signInWithEmailAndPassword(auth, input.email, input.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          dispatch(fetchUserById(user.uid));
          dispatch(fetchUserPost({ userId: user.uid, email_id: user.email }));
          navigation.navigate("main")
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
        });
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login</Text>
      <TextInput placeholder='E-mail'
        placeholderTextColor="lightgray"
        onChangeText={(v) => {
          setinput(previousState => {
            return { ...previousState, email: v }
          });
        }}
        value={input.email}
        style={styles.textinput}
      />
      <TextInput placeholder='Password'
        placeholderTextColor="lightgray"
        onChangeText={(v) => {
          setinput(previousState => {
            return { ...previousState, password: v }
          });
        }}
        value={input.password}
        style={styles.textinput}
      />
      <View style={styles.btn}>
        <Custom_button text="Log In" btn_height={responsiveHeight(7)}
          btn_width={responsiveWidth(80)} btn_backgroundColor="white" borderwidth={responsiveWidth(0.5)}
          radius={responsiveWidth(8)} onpress={PressHandler}
        />
      </View>
    </View>
  )
}

export default Login
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",

  },
  text: {
    fontSize: responsiveFontSize(5),
    fontWeight: "bold",
    marginTop: responsiveHeight(15),
    marginBottom: responsiveHeight(4)
  },

  textinput: {
    borderWidth: responsiveWidth(0.5),
    borderRadius: responsiveWidth(3),
    borderColor: "lightgray",
    height: responsiveHeight(8),
    width: responsiveWidth(80),
    marginVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(5)
  },
  btn: {
    marginVertical: responsiveHeight(3)
  }
})