import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { Loading } from "../components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input } from "../components/Input";

export const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingVisible, setLoadingVisible] = useState("none");
  const [messageVisible, setMessageVisible] = useState("none");

  
  
  loginUser = async (email, password) => {
    intru();
    setCurentUserInfo("true", email, password);
    setLoadingVisible("flex");
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

  const intru = async () => {
    try {
      await AsyncStorage.setItem("intru", "false");
    } catch (eror) {
      console.log(eror);
    }
  };


  const getUserInfo = () => {
    const db = getDatabase();
    try {
      setLoadingVisible("none");
      onValue(ref(db, "/users/" + firebase.auth().currentUser.uid), (r) => {
        navigation.navigate(`${r.val().user}Page`);
        setMessageVisible("none");
        userStatus(`${r.val().user}Page`)
      });
    } catch {
      setMessageVisible("flex");
      setLoadingVisible("none");
    }
  };

  const setCurentUserInfo = async (curentUser, email, password) => {
    try {
      await AsyncStorage.setItem("intru", "false");
      await AsyncStorage.setItem("curentUser", curentUser);
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("password", password);
    } catch (eror) {
      console.log(eror);
    }
  };

  const userStatus = async (status) => {
    try {
      await AsyncStorage.setItem("status", status);
    } catch (eror) {
      console.log(eror);
    }
  };

  const userEmail = (text) => {
    setEmail(text);
  };

  const userPassword = (text) => {
    setPassword(text)
  } 

  const validate = () => {
    if (email === "" || password === "") {
      setMessageVisible("flex");
    } else {
      return loginUser(email, password)
    }
  }

  return (
    <View style={styles.container}>
      <Loading loading={loadingVisible} />
      <Text style={{ fontWeight: "bold", fontSize: 26 }}>Login</Text>
      <View style={{ width: "80%", alignItems: "center" }}>
      <Input
        placeHolder={"Email"}
        type={"email-address"}
        secrete={false}
        text={userEmail}
      />
      <Input
        placeHolder={"Password"}
        type={" "}
        secrete={true}
        text={userPassword}
      />
       </View>
      <Text style={[styles.txtMessage, { display: messageVisible }]}>
        invalid email or password
      </Text>
      <TouchableOpacity
        onPress={() => validate()}
        style={styles.button}
      >
        <Text style={{ fontWeight: "bool", fontSize: 22 }}>LOG IN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Registration")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ fontWeight: "bool", fontSize: 16 }}>
          Dont't have an account? Register Now
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
  },
  textInput: {
    width: "85%",
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  button: {
    marginTop: 50,
    height: 70,
    width: 250,
    backgroundColor: "#026efd",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  txtMessage: {
    color: "red",
  },
});
