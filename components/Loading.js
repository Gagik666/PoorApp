
import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";


export const Loading = ({loading}) => {
    return (
        <View style = {[StyleSheet.absoluteFill, styles.container, {display: loading}]}>
            <ActivityIndicator size= "large" color="#08E8DE"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 1
    }
})