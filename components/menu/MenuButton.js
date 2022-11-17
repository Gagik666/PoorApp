import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Entypo } from '@expo/vector-icons';

export const MenuButton = ({text, display, click}) => {
    return (
        <View style = {styles.container}>
            <TouchableOpacity style = {styles.touchView} onPress = {() => click()}>
                <Text style = {styles.txtText}>{text}</Text>
                <Entypo style = {{display: display}} name="chevron-small-right" size={24} color="#4B4B4B" />
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: "80%",
        marginTop: 10,
        alignItems: "center",
    },
    touchView: {
        width: "95%",
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems: "center"
    },
    txtText: {
        fontWeight: "400",
        fontSize: 18,
        color: "#000"
    }
})
