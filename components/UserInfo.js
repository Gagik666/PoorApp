import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../config";
import { getDatabase, ref, onValue } from "firebase/database";

const UserInfo = () => {
  const [firstName, setFirstName] = useState("firstname");
  const [lastName, setLastName] = useState("lastname");

  const getUserInfo = () => {
    const db = getDatabase();
    onValue(ref(db, "/users/" + firebase.auth().currentUser.uid), (r) => {
      setFirstName(r.val().firstName);
      setLastName(r.val().lastName);
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
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    paddingTop: 16,
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
});
