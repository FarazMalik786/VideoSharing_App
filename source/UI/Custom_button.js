import React, { useState } from 'react'
import { Text, View, Pressable, StyleSheet } from 'react-native'

function Custom_button({ text, color, btn_height, btn_width, radius, btn_backgroundColor, onpress, borderwidth }) {
    const [pressed, setpressed] = useState("white");
    
    return (
        <Pressable onPress={onpress} >
            <View style={[styles.container, { height: btn_height, width: btn_width, borderRadius: radius, borderWidth: borderwidth, backgroundColor: btn_backgroundColor }]}>
                <Text style={{ color: btn_backgroundColor === "white" ? "black" : "white" }}>{text}</Text>
            </View>
        </Pressable>
    )
}

export default Custom_button
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        borderColor: "black"
    },

})