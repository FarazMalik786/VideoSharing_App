import React, { useEffect, useMemo, useState } from 'react'
import { View, StyleSheet, Image, FlatList, Text, Alert, ActivityIndicator, Pressable } from 'react-native'
import { doc, getDoc, getDocs, collection, updateDoc } from "firebase/firestore";
import { db } from '../../Firebase/Config';
import { async } from '@firebase/util';
import { useSelector } from 'react-redux'
import { Video } from 'expo-av'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Custom_button from '../../UI/Custom_button';
import Activity_Indicator from '../../UI/Activity_Indicator';

function Other_User_Profile({ route, navigation }) {
    const { Uid } = route.params;
    const [data, setdata] = useState([]);
    const [post, setpost] = useState([]);
    const [existing, setexisting] = useState(false);
    const [isloading, setisloading] = useState(true);
    const profile = useSelector((state) => state.user_information);

    useEffect(() => {
            console.log("ok")
             getUserDetails();
             
    }, []);


    const getUserDetails = async () => {

        const docRef = doc(db, "User", Uid);
        const docSnap = await getDoc(docRef);
         setdata(docSnap.data());
        
    }
    useMemo(()=>{
        if (data.length !== 0) {
            (async () => {
                const querySnapshot = await getDocs(collection(db, "Post", data.Uid, data.Email_id));
                querySnapshot.forEach((doc) => {
                     post.push(doc.data());
                   
                });
                setisloading(false)
            }
            )();
        }
    },[data])
        
    
    profile.Following.forEach(element => {
        if (element == Uid) {
            setexisting(true);
        }
    });

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
    async function presshandler() {
        if (existing == false) {
            try {

                await profile.Following.push(data.Uid);
                await user.Followers.push(data.Uid)
                await updateDoc(doc(db, "User", profile.Uid), {
                    Following: profile.Following,
                });
                await updateDoc(doc(db, "User", data.Uid), {
                    Followers: data.Followers,
                });

                
                setexisting(true);
            } catch (error) {
                Alert.alert("try again later")
            }

        } else {
            setexisting(false)
        }
    }
    return (
        <View style={styles.container}>
            {isloading ? ( <Activity_Indicator/> )
                : (<View >

                    <Text style={styles.header_text}>profile</Text>
                    <View style={styles.profile}>
                        <Image source={{ uri: data.Image }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <Text style={styles.username}>{data.Username}</Text>
                    </View>
                    <View style={styles.profile_details}>
                        <View>
                            <Text style={styles.count}>{data.Following.length}</Text>
                            <Text>Following</Text>
                        </View>
                        <View>
                            <Text style={styles.count}>{data.Followers.length}</Text>
                            <Text>Followers</Text>
                        </View>
                        <View>
                            <Text style={styles.count}>0</Text>
                            <Text>Likes</Text>
                        </View>
                    </View>
                    <View style={{ alignSelf: "center" }}>
                        <Custom_button text={existing ? "Following" : "Follow"} btn_backgroundColor={existing ? "white" : "black"} btn_height={responsiveHeight(8)} btn_width={responsiveWidth(50)} onpress={presshandler} borderwidth={responsiveWidth(0.5)} />
                    </View>
                    <FlatList
                        data={post}
                        keyExtractor={item => item.Unique_Id}
                        renderItem={renderitem}
                        key={item => item.Unique_Id}
                        numColumns={3}
                        columnWrapperStyle={{ margin: responsiveWidth(0.5) }}
                    />

                </View>)
            }
        </View>

    )
}

export default Other_User_Profile
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