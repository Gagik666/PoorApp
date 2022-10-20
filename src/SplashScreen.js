import React, { useEffect, useState } from "react";
import { Image, View, StyleSheet } from "react-native";
import { firebase } from "../config";
import { getDatabase, ref, set, onValue } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const SplashScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    autoLogin();
  });

  useEffect(() => {
    setTimeout(() => {
      getCurentUserInfo();
    }, 3000);
  }, [email, password]);

  const getCurentUserInfo = async () => {
    try {
      await AsyncStorage.getItem("curentUser").then((value) => {
        if (value === "true") {
          loginUser(email, password);
        }  
        if (value === "false") {
          navigation.navigate("login");
        }
      });
    } catch (eror) {
      console.log(eror);
    }finally{

    }
  };

  const autoLogin = async () => {
    try {
      await AsyncStorage.getItem("email").then((value) => {
        setEmail(value);
      });
      await AsyncStorage.getItem("password").then((value) => {
        setPassword(value);
      });
    } catch (eror) {
      console.log(eror);
    }
  };

  loginUser = async (email, password) => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          setTimeout(() => {
            getUserInfo();
          }, 2000)
        );
    } catch (error) {}
  };

  const getUserInfo = () => {
    const db = getDatabase();
    try {
      onValue(ref(db, "/users/" + firebase.auth().currentUser.uid), (r) => {
        navigation.navigate(`${r.val().user}Page`);
      });
    } catch {}
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



////

