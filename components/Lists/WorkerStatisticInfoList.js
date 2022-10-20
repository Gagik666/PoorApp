import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export const WorkerStatisticInfoList = ({ workerStatisticInfoList }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={workerStatisticInfoList}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.fullDate}</Text>
            <Text>{`     v - ${item.time}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  item: {
    width: "70%",
    flexDirection: "row",
  },
});
