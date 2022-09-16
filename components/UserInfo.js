import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const UserInfo = () => {
    return (
        <View style={styles.container}>
            <View style={styles.imageView}>
                <Image
                    style={styles.image}
                    source={require('../images/userImage.png')}
                />
            </View>
            <View style={styles.textView}>
                <Text>First Name</Text>
                <Text>Last Name</Text>
            </View>
        </View>
    )
}

export default UserInfo

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: 'row',
        paddingTop: 16
    },
    image: {
        width: 120,
        height: 120
    },
    imageView: {
        justifyContent: 'center',
        width: 120,
        height: 120,
        borderRadius: 150
    },
    textView: {
        justifyContent: 'center',
        marginStart: 15
    }
})