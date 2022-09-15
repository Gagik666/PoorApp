import React from "react";
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const ModalWindow = ({mWindow, selectWorker, companyList}) => {
    
    console.log(companyList);
    
    return (
        <Modal visible = {mWindow}>
            <View style = {styles.container}>
                <TouchableOpacity onPress={selectWorker}>
                    <Text>BAck</Text>
                    <FlatList
                        data={companyList}
                        renderItem = {({item}) => <Text>{item}</Text>}
                    />
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 40,
        paddingHorizontal: 20
    }
})