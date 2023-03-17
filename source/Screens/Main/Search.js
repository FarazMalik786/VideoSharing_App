import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../Firebase/Config';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useSelector } from 'react-redux'

function Search({ navigation }) {
    const [fetched_data, setfetched_data] = useState([]);
    const [userdata, setuserdata] = useState([]);
    const [textinput, setinput] = useState("");
    const [isloading, setisloading] = useState(true);
    const profile = useSelector((state) => state.user_information);

    useEffect(() => {
        (async () => {
            const querySnapshot = await getDocs(collection(db, "User"));
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
                userdata.push(doc.data());
                fetched_data.push(doc.data());
            });
            setisloading(false);
        })()

    }, [])

    function onSearch(v) {
        console.log(v)
        if (v != "") {
            const Searched = userdata.filter((value, i) => {
                return value.Email_id.toLowerCase().indexOf(v.toLowerCase()) > -1 || value.Username.toLowerCase().indexOf(v.toLowerCase()) > -1
            });
            setuserdata(Searched);
        }
        else {
            setuserdata(fetched_data);
        }
    }

    function renderitem({ item }) {
        function navigate_otheruser() {
            if (item.Uid == profile.Uid) {
                navigation.navigate("profile")
            }
            else{
                navigation.navigate("otheruserprofile", {
                    Uid: item.Uid
                });
            }
           
        }
        return (
            <Pressable onPress={navigate_otheruser}>
                <View style={{ flexDirection: "row", margin: responsiveHeight(1) }}>
                    <Image source={{ uri: item.Image }} style={styles.user_image} />
                    <View style={{ justifyContent: "center" }}>
                        <Text>{item.Username}</Text>
                        <Text>{item.Email_id}</Text>
                    </View>
                </View>
            </Pressable>
        )
    }
    return (
        <View style={styles.container}>
            <Text style={styles.hearder}>Discover</Text>
            <TextInput placeholder='search'
                onChangeText={(v) => {
                    setinput(v);
                    onSearch(v)
                }}
                value={textinput}
                style={styles.textinput}
            />
            {isloading ? (<ActivityIndicator size={"small"} color={"black"}/>)
                : (<FlatList
                    data={userdata}
                    keyExtractor={item => item.Uid}
                    renderItem={renderitem}
                />)}
        </View>

    )
}

export default Search
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    hearder: {
        textAlign: "center",
        textAlignVertical: "bottom",
        height: responsiveHeight(12),
        fontSize: responsiveFontSize(2),
        borderBottomColor: "lightgray",
        borderBottomWidth: responsiveWidth(0.5),
        paddingBottom: responsiveHeight(2),
        fontWeight: "bold"
    },
    textinput: {
        height: responsiveHeight(7),
        width: responsiveWidth(90),
        alignSelf: "center",
        borderWidth: responsiveWidth(0.3),
        borderRadius: responsiveWidth(6),
        borderColor: "black",
        marginVertical: responsiveHeight(2)
    },
    user_image: {
        height: responsiveHeight(10),
        width: responsiveWidth(20),
        borderRadius: responsiveHeight(6),
        marginHorizontal: responsiveWidth(2)
    }
})