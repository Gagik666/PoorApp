import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Intru3 = ({ navigation }) => {
  const intru = async () => {
    try {
      await AsyncStorage.setItem("intru", "false");
    } catch (eror) {
      console.log(eror);
    }
  };

  const next = () => {
    navigation.navigate("login");
    intru();
  };

  return (
    <View style={styles.container}>
      <Text onPress={() => next()}>Intru3</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
