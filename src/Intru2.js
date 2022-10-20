import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

 export const Intru2 = ({navigation}) => {
    return (
        <View style = {styles.container}>
            <Text onPress={() => navigation.navigate("Intru3")}>Intru2</Text>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
})
