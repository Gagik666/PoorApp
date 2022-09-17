import {
    StyleSheet,
    SafeAreaView,
    FlatList
} from 'react-native'
import React from 'react'
import { UserItem } from '../Items/UserItem'
import { DATA } from '../data/DATA';

<DATA />

const Item = () => (
    <UserItem />
);

const WorkersList = () => {

    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

export default WorkersList

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
})
const styless = StyleSheet.create({
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