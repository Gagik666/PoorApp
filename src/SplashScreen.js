import React, { useEffect, useState } from "react";
import { Image, View, StyleSheet } from "react-native";
import { firebase } from "../config";
import { getDatabase, ref, onValue } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    getCurentUserInfo();
  });

  const getCurentUserInfo = async () => {
    try {
      var email = await AsyncStorage.getItem("email");
      var password = await AsyncStorage.getItem("password");
      var intru = await AsyncStorage.getItem("intru");
      var status = await AsyncStorage.getItem("status");
      await AsyncStorage.getItem("curentUser").then((value) => {
        console.log(value);

        if (intru == "false") {
          if (value === "true") {
            loginUser(email, password, status);
          }
          if (value === null || value === "false") {
            navigation.navigate("login");
          }
        }
        else if (intru === "true" || intru === null) {
          navigation.navigate("Intru1");
        }
      });
    } catch (eror) {
      console.log(eror);
    } finally {
    }
  };

  loginUser = (email, password, status) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          setTimeout(() => {
            navigation.navigate(`${status}Page`);
            console.log(status);
          }, 3000)
        );
    } catch (error) {}
  };

  const getUserInfo = () => {
   
    // const db = getDatabase();
    // try {
    //   onValue(ref(db, "/users/" + firebase.auth().currentUser.uid), (r) => {
    //     
    //     setTimeout(() => {
    //       console.log("!!!!!!");
    //       console.log(`${r.val().user}Page`);
    //     }, 3000)
    //   });
    // } catch {}


  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../images/logo.png")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
});
