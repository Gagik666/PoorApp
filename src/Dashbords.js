import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { firebase, uid } from "../config";

export const Dashbords = () => {
  const click = () => {
    if (firebase.auth().currentUser != null) {
      console.log(console.log(firebase.auth().currentUser.uid));
    }
  };
  return (
    <View style={styles.constainer}>
      <TouchableOpacity>
        <Text onPress={click}>Click</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
