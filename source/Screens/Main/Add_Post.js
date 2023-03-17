import { Video } from 'expo-av'
import React from 'react'
import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Button, ActivityIndicator } from 'react-native'
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../Firebase/Config';
import { async } from '@firebase/util';
import { upload } from '../../Firebase/Storage';
import { fetchUserPost } from '../../Redux/UserPost';
import Profile from './Profile';
import Activity_Indicator from '../../UI/Activity_Indicator';

function Add_Post({ route, navigation }) {
    const [isLoading, setisLoading] = useState(false);
    const { video_uri } = route.params;
    const [description, setdescription] = useState("");
    const dispatch = useDispatch();
    const profile1 = useSelector((state) => state.user_information);
    if (isLoading) {
        return <Activity_Indicator />
    }

    async function share() {
        setisLoading(true);
        await upload(video_uri, profile1.Uid, profile1.Email_id, {
            Creater: profile1.Username,
            Creater_Uid: profile1.Uid,
            Creater_Email: profile1.Email_id,
            Description: description,
            Likes: 0,
            Comments: 0,
        });
        dispatch(fetchUserPost({ userId: profile1.Uid, email_id: profile1.Email_id }));
        navigation.navigate("feed");
        setisLoading(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => { navigation.goBack() }}>
                    <Text>Cancel</Text>
                </Pressable>
                <Text>New Post</Text>
                <Pressable onPress={share}>
                    <Text>Share</Text>
                </Pressable>
            </View>
            <View style={styles.newpost}>
                < Video style={styles.video}
                    resizeMode="cover"
                    source={{ uri: video_uri }}
                    shouldPlay={true}
                    isLooping={true}
                    
                />

                <TextInput placeholder='Description' style={styles.description}
                    onChangeText={v => setdescription(v)}
                    value={description}
                    textAlign={"center"}
                />
            </View>

        </View>
    )
}

export default Add_Post
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: responsiveHeight(2),
        height: responsiveHeight(10),
        borderBottomWidth: responsiveWidth(0.5),
        borderBottomColor: "lightgray",
        paddingHorizontal: responsiveWidth(5)
    },
    newpost: {
        alignItems: "center",

    },
    description: {
        height: responsiveHeight(10),
        width: responsiveWidth(90),

        marginTop: responsiveHeight(2)
    },
    video: {
        height: responsiveHeight(30),
        width: responsiveWidth(40)
    }
})