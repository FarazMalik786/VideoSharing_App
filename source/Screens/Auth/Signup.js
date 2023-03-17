import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Alert, Image, Pressable } from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Custom_button from '../../UI/Custom_button';
import { signup } from '../../Firebase/Auth';
import { useDispatch } from "react-redux";
import { fetchUserById } from '../../Redux/User_Info';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../Firebase/Config';
import { Add_Data } from '../../Firebase/Firestore';
import { db } from '../../Firebase/Config';
import { doc, setDoc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker'

function Signup({ navigation }) {
  const dispatch = useDispatch();
  const [image, setimage] = useState("https://thumbs.dreamstime.com/b/upload-profile-vector-icon-elements-mobile-concept-web-apps-thin-line-icons-website-design-development-app-premium-pack-146390668.jpg");
  const [input, setinput] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function PressHandler() {
    if (input.email == "" || input.password == "" || input.name == "") {
      Alert.alert("Invalid Email Or Password");
    } else {
      
      createUserWithEmailAndPassword(auth, input.email, input.password)
        .then(async (userCredential) => {
          // Signed in 
          const user = userCredential.user;
          
          await setDoc(doc(db, "User", user.uid),
            {
              Username: input.name,
              Email_id: input.email,
              Password: input.password,
              Uid: user.uid,
              Image: image,
              Followers: [],
              Following: [],
            }).then(() => {
              dispatch(fetchUserById(user.uid));
              navigation.navigate("main");
            }).catch((e) => {
              console.log(e);
            })


          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
          // ..
        });
    }
  }

  async function uploadimage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setimage(result.assets[0].uri);
      }

    }
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create new account</Text>
      <Pressable onPress={uploadimage}>
        <Image source={{ uri: image }}
          style={styles.image}
        />
      </Pressable>

      <TextInput placeholder='Name'
        placeholderTextColor="lightgray"
        onChangeText={(v) => {
          setinput(previousState => {
            return { ...previousState, name: v }
          });
        }}
        value={input.name}
        style={styles.textinput}
      />
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
        <Custom_button text="Create new account" btn_height={responsiveHeight(7)}
          btn_width={responsiveWidth(80)} btn_backgroundColor="white" borderwidth={responsiveWidth(0.5)}
          radius={responsiveWidth(8)} onpress={PressHandler}
        />
      </View>
    </View>
  )
}

export default Signup
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
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
  text: {
    fontSize: responsiveFontSize(4),
    fontWeight: "bold",
    marginTop: responsiveHeight(15),
    marginBottom: responsiveHeight(4)
  },
  btn: {
    marginVertical: responsiveHeight(3)
  },
  image: {
    height: responsiveHeight(10),
    width: responsiveWidth(20)
  }
})