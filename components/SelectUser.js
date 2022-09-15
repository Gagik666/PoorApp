import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

export const SelectUser = ({selectManager, selectWorker}) => {

  

  return (
    <View style = {styles.container}>
      <TouchableOpacity onPress={() => selectWorker()}>
        <Text>Worker</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => selectManager()}>
        <Text>Manager</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})
