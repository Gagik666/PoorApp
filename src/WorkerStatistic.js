import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import React from "react";
import UserInfo from "../components/UserInfo";
import { Statistic } from "../components/Statistick";
import { Headers } from "../components/Headers";

const WorkerStatistic = () => {
  const [color, setColor] = useState("green");
  return (
    <View style={styles.container}>
      <Headers />
      <UserInfo />
      <View style={{marginTop:50}}>
        <Statistic />
      </View>
      <View
        style={{
          height: "50%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity style={{ padding: 10 }}>
            <Text style={[styles.btnStyle,{backgroundColor: `green`,}]} onPress={() => change()}>
              Positive
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10 }}>
            <Text style={[styles.btnStyle, {backgroundColor: `red`,}]} onPress={() => change()}>
              Negative
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnStyle: {
    color: "white",
    borderRadius: 20,
    padding: 10,
    fontSize: 16,
  },
});

export default WorkerStatistic;
