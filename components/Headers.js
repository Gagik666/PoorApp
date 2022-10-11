import {
  View,
  Text,
  SafeAreaView,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { firebase } from "../config";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Headers = () => {
  const navigation = useNavigation();

  const clear = async () => {
    try {
      await AsyncStorage.setItem("day", "");
      await AsyncStorage.setItem("curentUser", "false");
      await AsyncStorage.setItem("email", " ");
      await AsyncStorage.setItem("password", " ");
    } catch (eror) {
      console.log(eror);
    }
  };

  const logAuth = () => {
    console.log(firebase.auth().currentUser);
    firebase
      .auth()
      .signOut()
      .then(() => {
        clear();
        if (firebase.auth().currentUser === null) {
          navigation.navigate("login");
        }
      });
  };

  const [visible, setVisible] = useState(false);
  const scale = useRef(new Animated.Value(0)).current;

  function resizeBox(to) {
    to === 1 && setVisible(true);
    Animated.timing(scale, {
      toValue: to,
      useNativeDriver: true,
      duration: 200,
      easing: Easing.linear,
    }).start(() => to === 0 && setVisible(false));
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => logAuth()}>
        <Entypo name="menu" size={24} color="black" />
      </TouchableOpacity>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            resizeBox(1);
          }}
        >
          <Ionicons name="menu" size={24} color="#d9864b" />
        </TouchableOpacity>
        <Modal transparent visible={visible}>
          <SafeAreaView
            onTouchStart={() => {
              resizeBox(0);
            }}
            style={{ flex: 1 }}
          >
            <Animated.View style={styles.popup}>
            <TouchableOpacity onPress={() => alert('Log Out')} style={styles.menuItemStyle}>
              <Item title={"Log Out"} /></TouchableOpacity>
            </Animated.View>
          </SafeAreaView>
        </Modal>
      </View>
    </View>
  );
};

const Item = (props) => (<Text>{props.title}</Text>);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 45,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewNote: {
    backgroundColor: "red",
    height: 6,
    width: 6,
    borderRadius: 50,
    marginLeft: -7,
  },
  popup: {
    borderRadius: 8,
    borderColor: "#333",
    borderWidth: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    position: "absolute",
    top: 50,
    right: 20,
    height: 200,
    width: 200,
  },
  menuItemStyle: {
    marginTop: 5,
    width: "100%",
    height: 30,
    backgroundColor: "#999999",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
