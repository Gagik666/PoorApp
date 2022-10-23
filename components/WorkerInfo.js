import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";

export const WorkerInfo = ({
  userName,
  status,
  email,
  backgroundColor,
  txtColor,
}) => {
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
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <View style={styles.itemView}>
        <View style={styles.imageView}>
          <Image
            style={styles.image}
            source={require("../assets/person.png")}
          />
        </View>
        <View style={styles.textView}>
          <Text style={{ color: color }}>{status}</Text>
          <Text style={[styles.txtUserName, {color: txtColor}]}>{userName}</Text>
          <Text style={[styles.txtEmail, {color: txtColor}]}>{email}</Text>
        </View>
      </View>
      <View style={styles.borderBottomView}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
  },
  itemView: {
    width: "100%",
    flexDirection: "row",
    paddingTop: 16,
    margin: 10,
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
  borderBottomView: {
    width: "80%",
    marginStart: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#ABABC1",
  },
  txtUser: {
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 15,
    textTransform: "uppercase",
  },
  txtUserName: {
    fontWeight: "700",
    fontSize: 16,
  },
  txtEmail: {
    fontWeight: "400",
    fontSize: 12,
  },
});
