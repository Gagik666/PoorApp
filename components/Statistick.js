import CircularProgress from "react-native-circular-progress-indicator";
import { Dimensions, Text } from "react-native";
import React from "react";
import { StyleSheet, View } from "react-native";
import * as Progress from "react-native-progress";

export const Statistic = ({ countDay, rating }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const d = new Date();

  const month = [31, 28, 30, 31, 31, 30, 31, 31, 30, 31, 30, 31];
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.statisticView,
          { width: windowWidth / 2.3, height: windowWidth / 2.3 },
        ]}
      >
        <CircularProgress
          value={countDay}
          maxValue={month[d.getMonth()]}
          radius={windowWidth / 5}
          textColor={"#fff"}
          activeStrokeColor={"#14387C"}
          inActiveStrokeColor={"#000"}
          inActiveStrokeOpacity={1}
          inActiveStrokeWidth={10}
          activeStrokeWidth={15}
          title={`${Math.round((countDay * 100) / month[d.getMonth()])}%`}
          titleColor={"#FFF"}
          titleStyle={{ fontSize: 22 }}
        />
      </View>
      <View
        style={[
          styles.viewRating,
          { width: windowWidth / 4, height: windowWidth / 4 },
        ]}
      >
        <Text style={styles.txtRating}>{rating}</Text>
      </View>
       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  txtRating: {
    fontWeight: "400",
    fontSize: 30,
    lineHeight: 36,
    color: "#FFF",
    fontWeight: "bold",
  },
  statisticView: {
    backgroundColor: "rgba(22, 23, 27, 0.45)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  viewRating: {
    backgroundColor: "#058DD9",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#6ca5cf",
  },
});
