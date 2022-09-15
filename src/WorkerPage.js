import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { Headers } from "../components/Headers";

export const WorkerPage = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Headers />
            <Text>Gagik666</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})