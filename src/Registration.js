import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { SelectUser } from "../components/SelectUser";
import { ModalWindow } from "../components/ModalWindow";
import uuid from "react-native-uuid";

export const Registration = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [inpVisible, setinpVisible] = useState("none");
  const [companyName, setCompanyName] = useState("");
  const [company, setCompany] = useState([""]);
  const [user, setUser] = useState("");
  const [userPage, setUserPage] = useState("");
  const [modalWindow, setModalWindow] = useState(false);
  const registerUser = async (email, password) => {
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          setTimeout(function () {
            create(firstName, lastName, companyName, user);
          }, 3000)
        );
    } catch (error) {
      alert(error.mesage);
    }
    navigation.navigate(userPage);
  };

  const create = (firstName, lastName, companyName, user) => {
    const db = getDatabase();
    set(ref(db, "users/" + firebase.auth().currentUser.uid), {
      firstName: firstName,
      lastName: lastName,
      companyName: companyName,
      user: user,
      stat: 0
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
      setUserPage("MapPage");
    } else {
      setinpVisible("none");
      setUser("");
    }
  };
  const selectWorker = () => {
    if (modalWindow == false) {
      setModalWindow(true);
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
      <View style={{ marginTop: 40 }}>
        <TextInput
          style={styles.textInput}
          placeholder="FirstName"
          onChangeText={(firsName) => setFirstName(firsName)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder="LastName"
          onChangeText={(lastName) => setLastName(lastName)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={(Password) => setPassword(Password)}
          autoCapitalize="name"
          secureTextEntry={true}
        />
        <TextInput
          style={[styles.textInput, { display: inpVisible }]}
          placeholder="Company name"
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
      <TouchableOpacity
        onPress={() => registerUser(email, password)}
        style={styles.button}
      >
        <Text style={{ fontWeight: "bool", fontSize: 22 }}>Registration</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("login")}
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
    padding: 5,
    width: 4000,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 10,
    textAlign: "center",
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
});
