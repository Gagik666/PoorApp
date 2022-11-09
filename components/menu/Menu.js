import React, { useEffect, useState } from "react";

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MenuButton } from "./MenuButton";
import { logAuth } from "../../functions/LogOuth";
import { useNavigation } from "@react-navigation/native";
import { getDatabase, ref, onValue } from "firebase/database";

export const Menu = ({ click, user }) => {
  const navigation = useNavigation();
  const [changeLocationDisplay, setChangeLocationDisplay] = useState("none");
  const [userName, setUserName] = useState("firstNAme, lastName")
  const [email, setEmail] = useState("email")
  useEffect(() => {
    console.log(user);
  }, []);

  useEffect(() => {
    const db = getDatabase();
    let userType = "";
    try {
      onValue(ref(db, "/users/" + user), (r) => {
        if (r.val().user === "Manager") {
           setChangeLocationDisplay("flex");
        } else {
          setChangeLocationDisplay("none");
        }
        setUserName(r.val().userName)
        setEmail(r.val().email)
      });
      
    } catch (e) {}
  }, []);

  const editProfile = () => {
    alert("Edit profile");
  };
  const changeLocation = () => {
    click();
    navigation.navigate("MapPage")
  };
  const aboutUs = () => {
    alert("About us");
  };
  const logOut = () => {
    logAuth();
    click();
    setTimeout(() => {
      navigation.navigate("login");
    }, 1000);
  };
  const deleteAccount = () => {
    alert("Delete account");
  };

  return (
    <>
      <TouchableOpacity
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "#000",
          opacity: 0.2,
          marginBottom: -40,
        }}
        onPress={() => click()}
      >
        <Text> </Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.menuTop}>
          <TouchableOpacity onPress={() => click()}>
            <Ionicons name="chevron-down" size={24} color="#383A69" />
          </TouchableOpacity>
          <Text style={styles.txtSetings}>Setings</Text>
          <View style={styles.menuUserInfo}>
            <Image
              style={styles.image}
              source={require("../../assets/person.png")}
            />
            <View>
              <Text></Text>
              <Text style={styles.txtUserName}>{userName}</Text>
              <Text style={styles.txtEmail}>{email}</Text>
            </View>
          </View>
        </View>
        <View style={styles.menuBottom}>
          <MenuButton text="Edit profile" click={editProfile} />
          <View
            style={{
              width: "100%",
              marginStart: 70,
              display: changeLocationDisplay,
            }}
          >
            <MenuButton text="Change location" click={changeLocation} />
          </View>

          <MenuButton text="About us" click={aboutUs} />
          <MenuButton text="Log out" display="none" click={logOut} />
          <MenuButton
            text="Delete account"
            display="none"
            click={deleteAccount}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F2F2F2",
    width: "100%",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
  },
  menuTop: {
    height: 150,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderBottomWidth: 0.5,
    borderBottomColor: "#B1AEAE",
    paddingBottom: 30,
  },
  txtSetings: {
    fontWeight: "900",
    fontSize: 25,
    lineHeight: 29,
    color: "#383A69",
  },
  image: {
    width: 70,
    height: 70,
    borderWidth: 5,
    borderRadius: 100,
    borderColor: "#383A69",
    marginEnd: 15,
  },
  menuUserInfo: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  txtUserName: {
    color: "#060A18",
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 19,
  },
  txtEmail: {
    color: "#000",
    fontWeight: "400",
    size: 10,
    lineHeight: 12,
  },
  menuBottom: {
    alignItems: "center",
    paddingBottom: 40,
    paddingStart: 30,
  },
});
