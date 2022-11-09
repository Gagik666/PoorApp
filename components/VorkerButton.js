import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

export const VorkerButton = ({text, display, click}) => {
  return (
    <>
      <TouchableOpacity
        style={{
          height: 60,
          width: 150,
          display: display,
        }}
        onPress={() => click()}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "red",
            backgroundColor: "#058DD9",
            borderRadius: 50,
            borderWidth: 4,
            borderColor: "#26294C",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 32, fontWeight: "bold", color: "#26294C" }}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({});
