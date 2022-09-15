import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { Headers } from "../components/Headers";
import UserInfo from "../components/UserInfo";

export const WorkerPage = () => {
    return (
        <View style={styles.container}>
            <Headers />
            <UserInfo />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    }
})