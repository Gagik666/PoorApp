import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { firebase } from "../config";
import { getDatabase, ref, set, onValue } from "firebase/database";

export const WorkerInfo = ({firstName, lastName}) => {
    console.log("stacvec");
    return (
        <View style={styles.container}>
            <View style={styles.imageView}>
                <Image
                    style={styles.image}
                    source={require('../images/userImage.png')}
                />
            </View>
            <View style={styles.textView}>
                <Text>{firstName}</Text>
                <Text>{lastName}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: 'row',
        paddingTop: 16
    },
    image: {
        width: 80,
        height: 80
    },
    imageView: {
        justifyContent: 'center',
        borderRadius: 150
    },
    textView: {
        justifyContent: 'center',
        marginStart: 15
    }
})