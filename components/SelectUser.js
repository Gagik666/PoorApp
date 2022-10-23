import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

export const SelectUser = ({ selectManager, selectWorker }) => {
  const [workerBgColor, setWorBgkerColor] = useState("white");
  const [managerBgColor, setManagerBgColor] = useState("white");
  const [workerTxtColor, setWorkerTxtColor] = useState("#26294C");
  const [managerTxtColor, setMAnagerTxtColor] = useState("#26294C");

  const worker = () => {
    setWorBgkerColor("#26294C");
    setManagerBgColor("#FFF");
    setWorkerTxtColor("#FFF");
    setMAnagerTxtColor("#26294C");
  };

  const manager = () => {
    setManagerBgColor("#26294C");
    setWorBgkerColor("#FFF");
    setMAnagerTxtColor("#FFF");
    setWorkerTxtColor("#26294C")
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: workerBgColor }]}
        onPress={() => {
          selectWorker(), worker();
        }}
      >
        <Text style={[styles.txt, {color: workerTxtColor}]}>Worker</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: managerBgColor }]}
        onPress={() => {selectManager(), manager()}}
      >
        <Text style={[styles.txt, {color: managerTxtColor}]}>Manager</Text>
      </TouchableOpacity>
      {/* <View style = {styles.btn}></View>
      <View style = {styles.btn}></View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 40,
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    marginTop: 16,
  },
  btn: {
    width: "50%",
    height: "100%",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  txt: {
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 24,
  },
});
