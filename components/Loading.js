import AnimatedLottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";


export const Loading = ({loading}) => {
    return (
        <View style = {[StyleSheet.absoluteFill, styles.container, {display: loading}]}>
            <AnimatedLottieView source={require('../assets/loading.json')}
            autoPlay  />
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