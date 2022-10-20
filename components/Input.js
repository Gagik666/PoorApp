import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export const Input = ({ placeHolder, text, type, secrete }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder={placeHolder}
        keyboardType={type}
        autoCapitalize="none"
        onChangeText={(firstName) => text(firstName)}
        autoCorrect={false}
        secureTextEntry={secrete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  textInput: {
    width: "100%",
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 8,
  },
});
