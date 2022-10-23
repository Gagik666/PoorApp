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
      <View style = {styles.statisticView}>
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
      
        
          <Text style = {styles.txtRating}>{rating}</Text>
       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row", 
    justifyContent: "space-evenly", 
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
   statisticView: {
    backgroundColor: "rgba(22, 23, 27, 0.45)",
    width: 180,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 40
  }
});
