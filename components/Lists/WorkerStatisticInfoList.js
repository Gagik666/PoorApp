import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export const WorkerStatisticInfoList = ({ workerStatisticInfoList }) => {
  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <View style={styles.item}>
          <View style={styles.column}>
            <Text>FullDate</Text>
          </View>
          <View style={styles.column}>
            <Text>Visit</Text>
          </View>
          <View style={styles.column}>
            <Text>Finish</Text>
          </View>
          <View style={styles.column}>
            <Text>Worked</Text>
          </View>
        </View>
      </View>
      <View style={{ width: "100%" }}>
        <FlatList
          data={workerStatisticInfoList}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={styles.column}>
                <Text>{item.fullDate}</Text>
              </View>
              <View style={styles.column}>
                <Text>{item.time}</Text>
              </View >
              <View style={styles.column}>
                <Text>{item.timeF}</Text>
              </View>
              <View style={styles.column}>
                <Text>{item.worked}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  item: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "gray",
  },
  column: {
    flex: 1,
    alignItems: "center",
    borderStartWidth: 1,
    borderEndWidth: 1,
    borderColor: "gray",
    padding: 5,
  },
});
