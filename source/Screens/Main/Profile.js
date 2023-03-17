import React from 'react'
import { Image, Text, View, StyleSheet, FlatList, Pressable } from 'react-native'
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { useEffect } from 'react';
import { fetchUserPost } from '../../Redux/UserPost';
import { Video } from 'expo-av'
import { async } from '@firebase/util';
import { useIsFocused } from "@react-navigation/core"


function Profile({ navigation }) {
   const isFocused = useIsFocused();
    const profile = useSelector((state) => state.user_information);
console.log(isFocused)
    
    const Post = useSelector((state) => state.user_post);
    console.log(Post);
    function renderitem({ item, index }) {
        function uservideo() {
            navigation.navigate("uservideo", {
                url: item.Url
            })
        }
        return (
            <Pressable onPress={uservideo} >
                <Video source={{ uri: item.Url }}
                    resizeMode="cover"
                    style={styles.post}
                />
            </Pressable>
        )
    }

    return (
        <View style={styles.container}>

            <Text style={styles.header_text}>profile</Text>
            <View style={styles.profile}>
                <Image source={{ uri: profile.Image }}
                    style={styles.image}
                    resizeMode="cover"
                />
                <Text style={styles.username}>{profile.Username}</Text>
            </View>
            <View style={styles.profile_details}>
                <View>
                    <Text style={styles.count}>0</Text>
                    <Text>Following</Text>
                </View>
                <View>
                    <Text style={styles.count}>0</Text>
                    <Text>Followers</Text>
                </View>
                <View>
                    <Text style={styles.count}>0</Text>
                    <Text>Likes</Text>
                </View>
            </View>
           
                <FlatList
                    data={Post}
                    keyExtractor={item => item.Unique_Id}
                    renderItem={renderitem}
                    key={item => item.Unique_Id}
                    numColumns={3}
                 columnWrapperStyle={{margin: responsiveWidth(0.5)}}
                />
        </View>
    )
}

export default Profile
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",

    },
    image: {
        height: responsiveHeight(15),
        width: responsiveWidth(30),
        borderRadius: responsiveWidth(20),
        marginVertical: responsiveHeight(2)
    },
    header_text: {
        textAlign: "center",
        textAlignVertical: "bottom",
        height: responsiveHeight(12),
        borderBottomColor: "lightgray",
        borderBottomWidth: responsiveWidth(0.5),
        paddingBottom: responsiveHeight(2),
        fontWeight: "bold"
    },
    profile: {
        justifyContent: "center",
        alignItems: "center",
    },
    profile_details: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: responsiveHeight(15)

    },
    count: {
        textAlign: "center",
        marginBottom: responsiveHeight(1),
        fontWeight: "bold",
        fontSize: responsiveFontSize(2.5)
    },
    username: {
        fontWeight: "bold",
        fontSize: responsiveFontSize(3)
    },
    post: {
        height: responsiveHeight(25),
        width: responsiveWidth(32),
         marginHorizontal: responsiveHeight(0.2)
    },
   
})