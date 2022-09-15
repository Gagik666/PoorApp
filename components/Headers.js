import { View, StyleSheet } from "react-native";
import React from "react";
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export const Headers = () => {
    return (
        <View style = {styles.container}>
            <Entypo
                name="menu"
                size={24}
                color="black"
            />

            <View style = {{flexDirection: 'row'}}>
                <Ionicons
                name="notifications"
                size={24}
                color="#d9864b" />
                <View style = {styles.viewNote}>
                </View>
            </View>
            
                
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingTop: 45,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    viewNote: {
        backgroundColor: "red",
        height: 6,
        width: 6,
        borderRadius: 50,
        marginLeft: -7
    }
})