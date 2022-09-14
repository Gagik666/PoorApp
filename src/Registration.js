import { View, Text, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import React, { useState } from "react";
import { firebase } from "../config";

export const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firsName, setFirstName] = useState("");
  const [lastName, SetLastName] = useState("");

    

   const registerUser = async (email, password) => {
        try {
            firebase.auth().createUserWithEmailAndPassword(email, password)
          } catch (error) {
            alert(error.mesage);
          }
    }

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
          onChangeText={(lastName) => SetLastName(lastName)}
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
      </View>
      <TouchableOpacity
        onPress={() => registerUser(email, password)}
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
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      marginTop: 100,
    },
    textInput: {
      paddingTop: 20,
      paddingBottom: 20,
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