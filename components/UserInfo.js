import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../config";
import { getDatabase, ref, onValue } from "firebase/database";

const UserInfo = () => {
  const [userName, setUserName] = useState("userName");
  const [user, setUser] = useState("user");
  const [email, setEmail] = useState("email")

  const getUserInfo = () => {
    const db = getDatabase();
    onValue(ref(db, "/users/" + firebase.auth().currentUser.uid), (r) => {
      setUserName(r.val().userName);
      setEmail(r.val().email);
      setUser(r.val().user);
    });
  };

  useEffect(() => {
    if (firebase.auth().currentUser !== null) {
        getUserInfo();
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image style={styles.image} source={require("../assets/person.png")} />
      </View>
      <View style={styles.textView}>
        <Text style = {styles.txtUser}>{user}</Text>
        <Text style = {styles.txtUserName}>{userName}</Text>
        <Text style = {styles.txtEmail}>{email}</Text>
      </View>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: "#26294C",
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40
  },
  image: {
    width: 120,
    height: 120,
  },
  imageView: {
    justifyContent: "center",
    width: 120,
    height: 120,
    borderRadius: 150,
  },
  textView: {
    justifyContent: "center",
    marginStart: 15,
  },
  txtUser: {
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 15,
    color: "#FFF",
    textTransform: "uppercase"
  },
  txtUserName: {
    color: "#FCFCFC",
    fontWeight: "700",
    fontSize: 16
  },
  txtEmail: {
    color: "#FFF",
    fontWeight: "400",
    fontSize: 12
  }
});
