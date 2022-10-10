import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../config";
import { getDatabase, ref, set, onValue } from "firebase/database";

export const WorkerInfo = ({ firstName, lastName, status }) => {
  const [color, setColor] = useState("red");
  useEffect(() => {
    updateStatus();
  }, [status]);
  const updateStatus = () => {
    if (status == "is present") {
      setColor("green");
    } else {
      setColor("red");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.imageView}>
          <Image
            style={styles.image}
            source={require("../images/userImage.png")}
          />
        </View>
        <View style={styles.textView}>
          <Text>{firstName}</Text>
          <Text>{lastName}</Text>
        </View>
      </View>

      <View style={styles.infoView}>
        <Text style={{ color: color }}>{status}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    width: "100%",
    flexDirection: "row",
    paddingTop: 16,
  },
  image: {
    width: 80,
    height: 80,
  },
  imageView: {
    justifyContent: "center",
    borderRadius: 150,
  },
  textView: {
    justifyContent: "center",
    marginStart: 15,
  },
  infoView: {
    justifyContent: "center",
  },
});
