import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { Loading } from "../components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input } from "../components/Input";
import { FontAwesome5 } from "@expo/vector-icons";

export const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingVisible, setLoadingVisible] = useState("none");
  const [messageVisible, setMessageVisible] = useState("none");
  const [secrete, setSecrete] = useState(true);

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
        navigation.navigate(`${r.val().user}Page`, {
          uid: firebase.auth().currentUser.uid
        });
        setMessageVisible("none");
        userStatus(r.val().user);
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
    setPassword(text);
  };

  const validate = () => {
    if (email === "" || password === "") {
      setMessageVisible("flex");
    } else {
      return loginUser(email, password);
    }
  };

  const secretePassword = () => {
    secrete ? setSecrete(false) : setSecrete(true);
  };

  return (
    <View style={styles.container}>
      <Loading loading={loadingVisible} />
      <View style={styles.logTop}>
        <Text style={styles.txtTitle}>Welcome Back!</Text>
      </View>
      <View style={styles.logBottom}>
        <View style={{ width: "80%", alignItems: "center" }}>
          <View style={styles.signInView}>
            <Text style={styles.signInTxt}>Sign in</Text>
          </View>
          <Input
            placeHolder={"Email"}
            type={"email-address"}
            secrete={false}
            text={userEmail}
            secr={secretePassword}
          />
          <Input
            placeHolder={"Password"}
            type={" "}
            secrete={secrete}
            text={userPassword}
            secr={secretePassword}
          />
        </View>
        <View style={styles.viewForget}>
          <TouchableOpacity>
            <Text style={styles.txtForget}>Forget Password?</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.txtMessage, { display: messageVisible }]}>
          invalid email or password
        </Text>
        <TouchableOpacity onPress={() => validate()} style={styles.button}>
          <Text style={styles.btnTxtColor}>LOG IN</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: "500",
            fontSize: 12,
            lineHeight: 15,
            color: "#555252",
          }}
        >
          Or Sign up Width
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity>
            <Image
              style={{ height: 50, width: 50 }}
              source={require("../assets/google.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome5 name="facebook" size={33} color="#1977F3" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Registration")}
          style={{ marginTop: 20 }}
        >
          <Text
            style={{
              fontWeight: "600",
              fontSize: 18,
              lineHeight: 27,
              color: "#26294C",
            }}
          >
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#26294C",
  },
  txtTitle: {
    color: "#FFF",
    width: "90%",
    marginBottom: 16,
    fontWeight: "600",
    fontSize: 32,
    height: 48,
  },
  logTop: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logBottom: {
    flex: 4,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#CED2E9",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
  },
  textInput: {
    width: "100%",
    backgroundColor: "#F6F6F6",
    height: 50,
    margin: 12,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 50,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
  },
  viewForget: {
    width: "80%",
    alignItems: "flex-end",
    marginVertical: 8,
  },
  txtForget: {
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 19,
    color: "#26294C",
  },
  button: {
    marginVertical: 30,
    height: 50,
    paddingHorizontal: 30,
    backgroundColor: "#26294C",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  btnTxtColor: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 24,
  },
  txtMessage: {
    color: "red",
  },
  signInView: {
    width: "100%",
    marginTop: 20,
  },
  signInTxt: {
    fontWeight: "800",
    fontSize: 35,
    lineHeight: 43,
    color: "#26294C",
  },
});
