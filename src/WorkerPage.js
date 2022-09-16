import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Headers } from "../components/Headers";
import UserInfo from "../components/UserInfo";

export const WorkerPage = () => {
    return (
        <View style={styles.container}>
            <Headers />
            <UserInfo />
            <View>
                <TouchableOpacity>
                    <Text>Click</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})