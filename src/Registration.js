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

export const Registration = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [inpVisible, setinpVisible] = useState("none");
  const [companyName, setCompanyName] = useState("t9");
  const [company, setCompany] = useState([""]);
  const [user, setUser] = useState("");
  const [userPage, setUserPage] = useState("");
  const [modalWindow, setModalWindow] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState("none");
  const [messageVisible, setMessageVisible] = useState("none");

  const registerUser = async (email, password) => {
    setLoadingVisible("flex");
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          create(firstName, lastName, companyName, user, email);
        });
    } catch (error) {
      setMessageVisible("flex");
      setLoadingVisible("none");
    }
  };

  const create = (firstName, lastName, companyName, user, email) => {
    const db = getDatabase();
    set(ref(db, "users/" + firebase.auth().currentUser.uid), {
      firstName: firstName,
      lastName: lastName,
      companyName: companyName,
      email: email,
      user: user,
      saveLocation: "flex",
      status: "",
      disabled: false,
      uid: firebase.auth().currentUser.uid,
      day: 0,
      dayRating: 0,
      countDay: 0,
      rating: 0,
    }).then(() => {
      navigation.navigate(userPage);
      setLoadingVisible("none");
      setMessageVisible("none");
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

  return (
    <View style={styles.container}>
      <Loading loading={loadingVisible} />
      <Text style={{ fontWeight: "bold", fontSize: 26 }}>Registration</Text>
      <View style={{ width: "80%", alignItems: "center" }}>
        <TextInput
          style={styles.textInput}
          placeholder="FirstName"
          onChangeText={(firsName) => setFirstName(firsName)}
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder="LastName"
          onChangeText={(lastName) => setLastName(lastName)}
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={(Password) => setPassword(Password)}
          autoCapitalize="none"
          secureTextEntry={true}
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
        invalid email or password
      </Text>
      <TouchableOpacity
        onPress={() => registerUser(email, password)}
        style={styles.button}
      >
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
