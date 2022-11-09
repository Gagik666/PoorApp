import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const SaveLocation = ({ visible, click }) => {
  return (
    <>
      <View
        style={{
          backgroundColor: "#000",
          height: "60%",
          width: "100%",
          opacity: 0.4,
        }}
      ></View>
      <View style={[styles.contaniner, { display: `${visible}` }]}>
        <TouchableOpacity onPress={() => click()}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#FFF" }}>
            Save Location
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: "#000",
          height: "40%",
          width: "100%",
          opacity: 0.4,
        }}
      ></View>
    </>
  );
};

const styles = StyleSheet.create({
  contaniner: {
    width: "60%",
    height: 50,
    paddingHorizontal: 30,
    backgroundColor: "#26294C",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginTop: -50,
  },
});
