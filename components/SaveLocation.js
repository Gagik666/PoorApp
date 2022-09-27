import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const SaveLocation = ({visible, click}) => {
    return (
        <View style = {[styles.contaniner, {display: `${visible}`}]}>
            <TouchableOpacity onPress={() => click()}>
                <Text style = {{fontSize: 24, fontWeight: "bold"}}>
                    SaveLocation
                </Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    contaniner: {
        width: "100%",
        justifyContent: "center"
    }
})