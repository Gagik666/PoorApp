import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
export const SplashScreen = ({ navigation }) => {
    setTimeout(function () { navigation.navigate("login") }, 3000)
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../images/logo.png')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 100,
        height: 100
    }
})
