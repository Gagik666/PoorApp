import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";
import { getDatabase, ref, set, onValue } from "firebase/database";

export const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(firebase.auth().currentUser);
  loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      .then(getUserInfo())
    } catch (error) {
      alert(error.mesage);
    }
  };

    const getUserInfo = () => {
      const db = getDatabase();
      onValue(ref(db, '/users/' + firebase.auth().currentUser.uid), (r) => {
          navigation.navigate(`${r.val().user}Page`)
      })
    };
  

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 26 }}>Login</Text>

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
      <TouchableOpacity
        onPress={() => loginUser(email, password)}
        style={styles.button}
      >
        <Text style={{ fontWeight: "bool", fontSize: 22 }}>Login</Text>
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
    width:'85%',
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginHorizontal:20,
    borderRadius:8,
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