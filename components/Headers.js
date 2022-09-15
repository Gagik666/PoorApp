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
            <Ionicons
                name="notifications"
                size={24}
                color="black" />
                
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingTop: 40
    }
})