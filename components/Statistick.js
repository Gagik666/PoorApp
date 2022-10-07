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
      <CircularProgress
        value={countDay}
        maxValue={month[d.getMonth()]}
        radius={windowWidth / 5}
        textColor={"#fff"}
        activeStrokeColor={"green"}
        inActiveStrokeColor={"red"}
        inActiveStrokeOpacity={1}
        inActiveStrokeWidth={15}
        activeStrokeWidth={15}
        title={`${Math.round((countDay * 100) / month[d.getMonth()])}%`}
        titleColor={"green"}
        titleStyle={{ fontSize: 22 }}
      />
        
          <Text style = {styles.txtRating}>{rating}</Text>
       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", 
    justifyContent: "space-around", 
    alignItems: "center"
  },
  txtRating: {
    fontSize: 22,
    fontWeight: "bold"
  },
  redStyle: {
    height: 15,
    width: 15,
    backgroundColor: "red",
    borderRadius: 100,
  },
  greenStyle: {
    height: 15,
    width: 15,
    backgroundColor: "green",
    borderRadius: 100,
  },
  ststStyles: {
    height: 35,
    justifyContent: "space-between",
  },
});
