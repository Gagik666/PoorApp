import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { SelectUser } from "../components/SelectUser";
import { ModalWindow } from "../components/ModalWindow";
import uuid from "react-native-uuid";
import { Loading } from "../components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input } from "../components/Input";

export const Registration = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userNam, setUserName] = useState("");
  const [inpVisible, setinpVisible] = useState("none");
  const [companyName, setCompanyName] = useState("t9");
  const [company, setCompany] = useState([""]);
  const [user, setUser] = useState("");
  const [userPage, setUserPage] = useState("");
  const [modalWindow, setModalWindow] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState("none");
  const [messageVisible, setMessageVisible] = useState("flex");
  const [messageText, setMessageText] = useState(" ");
  const [secrete, setSecrete] = useState(true)

  const registerUser = async (email, password) => {
    setCurentUserInfo("true", email, password);
    setLoadingVisible("flex");
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          create(userNam, companyName, user, email);
          userStatus(user);
        });
    } catch (error) {
      // setMessageVisible("flex");
      setMessageText("invalid email or password");
      setLoadingVisible("none");
    }
  };

  const create = (userNam, companyName, user, email) => {
    
    const db = getDatabase();
    set(ref(db, "users/" + firebase.auth().currentUser.uid), {
      userName: userNam,
      companyName: companyName,
      email: email,
      user: user,
      saveLocation: "flex",
      status: "",
      disabled: false,
      uid: firebase.auth().currentUser.uid,
      day: 0,
      dayRating: 1,
      countDay: 0,
      rating: 1,
    }).then(() => {
      navigation.navigate(userPage);
      setLoadingVisible("none");
      // setMessageVisible("none");
      setMessageText("");
    });

    if (inpVisible == "flex") {
      set(ref(db, "company/" + companyName), {
        companyName: companyName,
        latitude: 0,
        longitude: 0,
      });
    }
  };

  const selectManager = () => {
    if (inpVisible == "none") {
      setinpVisible("flex");
      setUser("Manager");

      setUserPage("ManagerPage");
    } else {
      setinpVisible("none");
      setUser("");
    }
  };
  const selectWorker = () => {
    if (modalWindow == false) {
      setModalWindow(true);
      setinpVisible("none");
      setUser("Worker");

      setUserPage("WorkerPage");
    } else {
      setModalWindow(false);
    }
    setCompany("");
    CompanyName();
  };

  const CompanyName = () => {
    const db = getDatabase();
    const sRef = ref(db, "company/");
    onValue(sRef, (sp) => {
      sp.forEach((i) => {
        setCompany((prev) => [...prev, { id: uuid.v4(), text: i.key }]);
      });
    });
  };

  const selectCompany = (company, user) => {
    setCompanyName(company);
    setUser(user);
  };

  const setCurentUserInfo = async (curentUser, email, password) => {
    try {
      await AsyncStorage.setItem("curentUser", curentUser);
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("password", password);
    } catch (eror) {
      console.log(eror);
    }
  };

  const userName = (text) => {
    setUserName(text);
  };

  const userEmail = (text) => {
    setEmail(text);
  };

  const userPassword = (text) => {
    setPassword(text);
  };

  const validate = () => {
    if (user === "" || user == " ") {
      setMessageText("select user status");
    }
    if (userName === "") {
      setMessageText("user nmae is empty");
    } else {
      return registerUser(email, password);
    }
  };

  const userStatus = async (status) => {
    try {
      await AsyncStorage.setItem("status", status);
    } catch (eror) {
      console.log(eror);
    }
  };

  const secretePassword = () => {
    secrete ? setSecrete(false) : setSecrete(true)
  }

  return (
    <View style={styles.container}>
      <Loading loading={loadingVisible} />
      <View style={styles.registerTop}>
        <Text style = {styles.txtTitle}>Create Account!</Text>
      </View>
      <View style={styles.registerView}>
        <View style={{ width: "90%", alignItems: "center" }}>
          <View style={styles.signUpView}>
            <Text style={styles.signUpTxt}>Sign up</Text>
          </View>
          <Input
            placeHolder={"Name"}
            type={""}
            secrete={false}
            text={userName}
            secr = {secretePassword}
          />
          <Input
            placeHolder={"Email"}
            type={"email-address"}
            secrete={false}
            text={userEmail}
            secr = {secretePassword}
          />
          <Input
            placeHolder={"Password"}
            type={""}
            secrete={secrete}
            text={userPassword}
            secr = {secretePassword}
          />

          <TextInput
            style={[styles.textInput, { display: inpVisible }]}
            placeholder=" Company name"
            onChangeText={(text) => setCompanyName(text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <SelectUser selectManager={selectManager} selectWorker={selectWorker} />
        <ModalWindow
          mWindow={modalWindow}
          selectWorker={selectWorker}
          cmpanyName={company}
          selectCompany={selectCompany}
        />
        <Text style={[styles.txtMessage, { display: messageVisible }]}>
          {messageText}
        </Text>
        <TouchableOpacity onPress={() => validate()} style={styles.button}>
          <Text style={styles.btnTxtColor}>REGISTRATION</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("login")}
          style={{ marginTop: 20 }}
        >
          <Text style={{ fontWeight: "600", fontSize: 18, lineHeight: 27, color: "#26294C" }}>
            I already have an account. Login now
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
  registerTop: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  txtTitle: {
    color: "#FFF",
    width: "90%",
    marginBottom: 16,
    fontWeight: "600",
    fontSize: 32,
    height: 48
  },
  registerView: {
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
  button: {
    marginTop: 30,
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
    lineHeight: 24
  },
  txtMessage: {
    color: "red",
    marginTop: 16,
  },
  signUpView: {
    width: "100%",
    marginTop: 20,
  },
  signUpTxt: {
    fontWeight: "800",
    fontSize: 35,
    lineHeight: 43,
    color: "#26294C",
  },
});
