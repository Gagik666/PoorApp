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
    let regName = /^[A-Z]{1}[A-Za-z]{1,19}$/;
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
    } if (userName === "") {
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

  return (
    <View style={styles.container}>
      <Loading loading={loadingVisible} />
      <Text style={{ fontWeight: "bold", fontSize: 26 }}>Registration</Text>
      <View style={{ width: "80%", alignItems: "center" }}>
        <Input placeHolder={"Name"} type={""} secrete={false} text={userName} />
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
        <Text style={{ fontWeight: "bool", fontSize: 22 }}>REGISTRATION</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("login")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ fontWeight: "bool", fontSize: 16 }}>
          I already have an account. Log In now
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
    width: "100%",
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  button: {
    marginTop: 30,
    height: 70,
    width: 250,
    backgroundColor: "#026efd",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  txtMessage: {
    color: "red",
    marginTop: 16,
  },
});
