import CircularProgress from "react-native-circular-progress-indicator";
import { Dimensions} from "react-native";
import React from "react";
import { StyleSheet, View } from "react-native";
import * as Progress from 'react-native-progress';

export const Statistic = ({countDay}) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const d = new Date()
  console.log(d.getMonth());
  const month = [31, 28, 30, 31, 31, 30 , 31, 31, 30, 31, 30, 31]

console.log(`countDay ${countDay}`);
  return (
    <View style={{ flexDirection: "row" }}>
      <CircularProgress
        value={countDay}
        maxValue={month[d.getMonth()]}
        radius={windowWidth/5}
        textColor={"#fff"}
        activeStrokeColor={"green"}
        inActiveStrokeColor={"red"}
        inActiveStrokeOpacity={1}
        inActiveStrokeWidth={15}
        activeStrokeWidth={15}
        title={`${Math.round(countDay * 100 / month[d.getMonth()])}%`}
        titleColor={"green"}
        titleStyle={{ fontSize: 22}}
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