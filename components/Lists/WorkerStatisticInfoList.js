import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export const WorkerStatisticInfoList = ({ workerStatisticInfoList }) => {
   
  return (
    <View>
      <FlatList
        data={workerStatisticInfoList}
        renderItem={({ item }) => 
          <View style = {styles.item}>
            <Text>{item.fullDate}</Text>
            <Text>{item.rating}</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
    item: {
        width: "70%",
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between"
    }
});
