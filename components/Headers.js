import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { firebase } from "../config";
import { useNavigation } from "@react-navigation/native";

export const Headers = () => {
  const navigation = useNavigation();
  const auth = () => {
    console.log(firebase.auth().currentUser);
    firebase
      .auth()
      .signOut()
      .then(() => {
        if (firebase.auth().currentUser === null) {
          navigation.navigate("login");
        }
      });

  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => auth()}>
        <Entypo name="menu" size={24} color="black" />
      </TouchableOpacity>

      <View style={{ flexDirection: "row" }}>
        <Ionicons name="notifications" size={24} color="#d9864b" />
        <View style={styles.viewNote}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 45,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewNote: {
    backgroundColor: "red",
    height: 6,
    width: 6,
    borderRadius: 50,
    marginLeft: -7,
  },
});
