import React from 'react'
import { useEffect } from 'react'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { Audio } from 'expo-av'
import * as ImagePicker from 'expo-image-picker'
import { useIsFocused } from "@react-navigation/core"
import { useState } from 'react'
import { Camera, CameraType, FlashMode } from 'expo-camera'
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'

function Post({ navigation }) {
  const [hasCameraPermissions, sethasCameraPermissions] = useState(false);
  const [hasAudioPermissions, sethasAudioPermissions] = useState(false);
  const [hasGalleryPermissions, sethasGalleryPermissions] = useState(false);
  const [galleryItems, setgalleryItems] = useState([]);
  const [CameraRef, setCameraRef] = useState(null);
  const [Cameratype, setCameratype] = useState(CameraType.back);
  const [Cameraflash, setCameraflash] = useState(FlashMode.off);
  const isFocused = useIsFocused();
  
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      sethasCameraPermissions(cameraStatus.status === "granted");

      const audioStatus = await Audio.requestPermissionsAsync();
      sethasAudioPermissions(audioStatus.status === "granted");

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      sethasGalleryPermissions(galleryStatus.status === "granted");
    })()
  });
  function toggleCameraType() {
    setCameratype(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  function toggleFlash() {
    setCameraflash(current => (current === FlashMode.off ? FlashMode.torch : FlashMode.off))
  }

  async function TakeVideo() {
    if (CameraRef) {
      try {
        const data = await CameraRef.recordAsync({
          maxDuration: 30,
          mute: false,
        });
        if (data) {
          navigation.navigate("addpost", {
            video_uri: data.uri,
          })
        }
      } catch (error) {
        Alert.alert(error);
      }
    }
  }


  const pickVideo = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

  

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      navigation.navigate("addpost", {
        video_uri: result.assets[0].uri,
      })

    }
  };
  return (
    <View style={styles.container}>
      {isFocused ?
        <Camera style={styles.camera}
          ref={ref => setCameraRef(ref)}
          ratio={'16:9'}
          type={Cameratype}
          flashMode={Cameraflash}
        >
          <MaterialIcons name="flip-camera-android" size={responsiveWidth(12)} color="white" style={styles.icon} onPress={toggleCameraType} />
          <Ionicons name="flash" size={responsiveWidth(12)} color="white" style={styles.icon_flash} onPress={toggleFlash} />
          <Pressable style={styles.video_button} onPress={TakeVideo}>
            <View ></View>
          </Pressable>
          <Ionicons name="images-outline" size={responsiveWidth(12)} color="white" style={styles.gallery_icon} onPress={pickVideo} />
        </Camera>
        : null}
    </View>
  )
}

export default Post
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    backgroundColor: "black",
    
  },
  icon: {
    position: "relative",
    top: responsiveHeight(6),
    left: responsiveWidth(85)
  },
  icon_flash: {
    position: "relative",
    top: responsiveHeight(9),
    left: responsiveWidth(85)
  },
  video_button: {
    height: responsiveHeight(10),
    width: responsiveWidth(20),
    backgroundColor: "red",
    borderRadius: responsiveWidth(10),
    position: "relative",
    top: responsiveHeight(60),
    alignSelf: "center",
  },
  gallery_icon: {
    position: "relative",
    top: responsiveHeight(52),
    left: responsiveWidth(71)
  }
})