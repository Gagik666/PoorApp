import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { Headers } from "../components/Headers";

export const WorkerPage = () => {
    return (
        <View style={styles.container}>
            <Headers />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})