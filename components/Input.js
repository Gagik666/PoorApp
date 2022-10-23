import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const Input = ({ placeHolder, text, type, secrete, secr}) => {

  const [eye, setEye] = useState("")
  const [color, setColor] = useState("white")
  useEffect(() => {
    secrete ? setEye("eye") : setEye("eye-off")
    if (placeHolder == "Password") {
      setColor("#C1B9B9") 
    } else {
      setColor("#F6F6F6")
    }
  })

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
      <TouchableOpacity onPress={() => secr()}>
        <Ionicons name={eye} size={24} color={color} style={styles.eye} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#F6F6F6",
    width: "100%",
    borderRadius: 50,
    alignItems: "center",
    margin: 12,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    elevation: 20,
  },
  textInput: {
    width: "100%",
    height: 50,
    padding: 10,
  },
  eye: {
    marginStart: -40,
  },
});
