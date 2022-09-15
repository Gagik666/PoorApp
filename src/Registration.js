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
import { getDatabase, ref, set, onValue} from "firebase/database";
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
  const [companyList, setCompanyList] = useState([]);
  const [modalWindow, setModalWindow] = useState(false);
  const registerUser = async (email, password) => {
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(create(firstName, lastName, companyName));
    } catch (error) {
      alert(error.mesage);
    }
  };

  const create = (firstName, lastName, companyName) => {
    let uid = `${firstName}${uuid.v4()}`;
    const db = getDatabase();
    set(ref(db, "users/" + uid), {
      firstName: firstName,
      lastName: lastName,
      companyName: companyName,
    });

    if (inpVisible == "") {
      set(ref(db, "company/" + companyName), {
        companyName: companyName,
      });
    }
  };

  const selectManager = () => {
    const db = getDatabase();

    if (inpVisible == "none") {
      setinpVisible("");
    } else {
      setinpVisible("none");
    }

    const sRef = ref(db, "company/")
    onValue(sRef, (sp) => {
      const data = sp.size
      sp.forEach(i => {
        setCompanyList([...companyList, i.key])
      })
    })
  };
  const selectWorker = () => {
    if (modalWindow == false) {
      setModalWindow(true);
    } else {
      setModalWindow(false);
    }

    
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
          onChangeText={(companyName) => setCompanyName(companyName)}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <SelectUser selectManager={selectManager} selectWorker={selectWorker} companyList = {companyList}/>
      <ModalWindow mWindow={modalWindow} selectWorker={selectWorker} />
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
