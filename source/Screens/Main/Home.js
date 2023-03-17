import { Video } from 'expo-av'
import React from 'react'
import { ActivityIndicator, Button, Dimensions, FlatList, RefreshControl, StatusBar, StyleSheet, Text, View } from 'react-native'
import { allfeeds, getallfeeds } from '../../Firebase/Firestore'
import { doc, getDocs, collection, startAfter } from "firebase/firestore";
import { db } from '../../Firebase/Config';
import { query, orderBy, limit } from "firebase/firestore";
import { useState } from 'react';
import { async } from '@firebase/util';
import { useEffect } from 'react';
import User_Video from '../../UI/User_Video';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { useRef } from 'react';
import { useLayoutEffect } from 'react';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useIsFocused } from "@react-navigation/core"

function Home() {
  const [userpost, setuserpost] = useState([]);
  const [currentindex, setcurrentindex] = useState(0);
  const [isloading, setisloading] = useState(true);
  const video_ref = useRef(null);
  const isFocused = useIsFocused();
  useEffect(() => {

    (async () => {
      const citiesRef = collection(db, "All_Post");
      const q = query(citiesRef, limit(12));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        userpost.push(doc.data());
        console.log(doc.data())
      });

      console.log(userpost.length)
      setisloading(false);
    })()

  }, []);


  async function morepost() {
    const lastVisible = userpost[userpost.length - 1];
    const next = query(collection(db, "All_Post"),
      orderBy("Post_Name"),
      startAfter(lastVisible.Post_Name),
      limit(10));
    const querySnapshot = await getDocs(next);
    querySnapshot.forEach((doc) => {
      userpost.push(doc.data());
    });
    console.log(userpost.length)
  }

  function renderitem({ item, index }) {
    return  <Video source={{ uri: item.Url }}
          style={{ height: Dimensions.get("window").height, width: Dimensions.get("window").width }}
          isBuffering={true}
          isLoaded={true}
          shouldPlay={index == currentindex}
          isLooping={true}
          resizeMode="cover"  
        />
      
  }

  return (
    <View style={styles.container}>
      {isFocused ?
        <View >
          {isloading ? (<ActivityIndicator />)

            : (<FlatList
              data={userpost}
              renderItem={renderitem}
              keyExtractor={item => item.Url}
              ref={video_ref}
              pagingEnabled={true}
              decelerationRate="fast"
              onScroll={(e) => {
                const currentIndex = Math.ceil(e.nativeEvent.contentOffset.y / Dimensions.get("window").height);
                setcurrentindex(currentIndex);
                
              }}
              onEndReached={morepost}
             
            />)

          }
        </View>
        : null}

      <StatusBar translucent={true} />
    </View>
  )
}

export default Home
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  video: {
    height: responsiveHeight(100),
    width: responsiveWidth(100)
  },
  video_text: {
    color: "white",
    fontSize: responsiveFontSize(5),
    position: "relative",
    bottom: responsiveHeight(6)
  }
})