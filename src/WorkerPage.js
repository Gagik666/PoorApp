import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Button, TouchableOpacity, Text } from "react-native";
import { Headers } from "../components/Headers";
import UserInfo from "../components/UserInfo";
import { Statistic } from "../components/Statistick";

export const WorkerPage = () => {
  return (
    <View style={styles.container}>
      <Headers />
      <UserInfo />
      <View>
        <Statistic />
      </View>
      <View
        style={{
          height: "50%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity>
          <Text style={styles.btnStyle}>Click me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnStyle: {
    backgroundColor: "#0088ff",
    color: "white",
    borderRadius: 20,
    padding: 10,
    fontSize: 16,
  },
});
