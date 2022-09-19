import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";


export const SplashScreen = () => {
    const navigation = useNavigation();
    navigation.navigate("login")
    
    
    return (
        <View>
            <Text>
                SplashScreen
            </Text>
        </View>
    )
}