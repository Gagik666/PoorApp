import { StyleSheet, Text, View, Image } from 'react-native'

export const UserItem = () => {
    return (
        <View style={styles.container}>
            <View style={styles.imageView}>
                <Image
                    style={styles.image}
                    source={require('../../images/userImage.png')}
                />
            </View>
            <View style={styles.textView}>
                <Text>First Name</Text>
                <Text>Last Name</Text>
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
        width: 80,
        height: 80,
        borderRadius: 150
    },
    textView: {
        justifyContent: 'center',
        marginStart: 15
    }
})