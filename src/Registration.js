import { View, Text } from "react-native";
import React from "react";
import { firebase } from "../config";

export const Registration = () => {

    firebase.auth().createUserWithEmailAndPassword("tst3@mail.ru", "1234567")


    return (
        <View>
            <Text></Text>
        </View>
    )
}