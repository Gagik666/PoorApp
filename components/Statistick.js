import CircularProgress from "react-native-circular-progress-indicator";
import { Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import * as Progress from 'react-native-progress';

export const Statistic = () => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (
    <View style={{ flexDirection: "row" }}>
      <CircularProgress
        value={25}
        maxValue={30}
        radius={windowWidth / 5}
        textColor={"#fff"}
        activeStrokeColor={"green"}
        inActiveStrokeColor={"red"}
        inActiveStrokeOpacity={0.5}
        inActiveStrokeWidth={15}
        activeStrokeWidth={15}
        title={"Statistic"}
        titleColor={"green"}
        // titleStyle={{ fontWeight: "bold" }}
      />
      <View style={{ justifyContent: "space-between" }}>
        
        <View style={styles.ststStyles}>
          <View style={styles.greenStyle}/>
          <Progress.Bar progress={0.7} width={200} color={'green'}/>
        </View>

        <View style={styles.ststStyles}>
          <View style={styles.redStyle} />
          <Progress.Bar progress={0.3} width={200} color={'red'}/>
        </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  ststStyles:{
    height:35,
    justifyContent:'space-between'
  },

});