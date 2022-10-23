import {
  View,
  Text,
  SafeAreaView,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { firebase } from "../config";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from '@expo/vector-icons';
import { getDatabase, ref, set, onValue } from "firebase/database";


export const Headers = () => {
  const navigation = useNavigation();
  const [shouldShow, setShouldShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const scale = useRef(new Animated.Value(0)).current;
  const [notify, setNotify] = useState(false);

  useEffect(() => {
    const db = getDatabase();
    let userType = "";
    try {
      onValue(ref(db, "/users/" + firebase.auth().currentUser.uid), (r) => {
        userType = `${r.val().user}`;
      });
      if (userType === "Worker") setShouldShow(false);
      else if (userType === "Manager") setShouldShow(true);
    } catch (e) {}
  }, []);

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
        if (firebase.auth().currentUser === null) {
          setTimeout(() => {
            navigation.navigate("login");
          }, 1000);
          clear();
        }
      });
  };



  function resizeBox(to) {
    to === 1 && setVisible(true);
    Animated.timing(scale, {
      toValue: to,
      useNativeDriver: true,
      duration: 200,
      easing: Easing.linear,
    }).start(() => to === 0 && setVisible(false));
  }

  function showNotify(to) {
    to === 1 && setNotify(true);
    Animated.timing(scale, {
      toValue: to,
      useNativeDriver: true,
      duration: 200,
      easing: Easing.linear,
    }).start(() => to === 0 && setNotify(false));
  }

  const DATA = [
    {
      name: "Armen Minasyan",
      mail: "armen@mail.ru",
      imgUri: "https://reactnative.dev/img/tiny_logo.png",
    },
    {
      name: "Anna Varpeyan",
      mail: "anna@mail.ru",
      imgUri: "https://reactnative.dev/img/tiny_logo.png",
    },
    {
      name: "Vigen Sanosyan",
      mail: "vigen@mail.ru",
      imgUri: "https://reactnative.dev/img/tiny_logo.png",
    },
  ];

  const renderItem = ({ item }) => <NotyfiItem title={item} />;

  const NotyfiItem = ({ title }) => (
    <View style={styles.item}>
      <Image
        style={{ height: 20, width: 20, borderRadius: 50 }}
        source={{ uri: title.imgUri }}
      />
      <Text style={{}}>{title.name + "\n" + title.mail}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View>
        {shouldShow ? (
          <TouchableOpacity
            onPress={() => {
              showNotify(1);
            }}
          >
            <View
              style={{
                backgroundColor: "red",
                height: 5,
                width: 5,
                borderRadius: 50,
                position: "absolute",
                top: 15,
                left: 18,
              }}
            >
            </View>
            <MaterialIcons name="notifications" size={24} color="#d9864b" />
          </TouchableOpacity>
        ) : null}
      </View>
      <Modal transparent visible={notify}>
        <SafeAreaView
          onTouchStart={() => {
            showNotify(0);
          }}
          style={{ flex: 1 }}
        >
          <Animated.View style={styles.notify}>
            <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </Animated.View>
        </SafeAreaView>
      </Modal>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            resizeBox(1);
          }}
        >
          <Ionicons name="menu" size={24} color="#FFF" />
        </TouchableOpacity>
        <Modal transparent visible={visible}>
          <SafeAreaView
            onTouchStart={() => {
              resizeBox(0);
            }}
            style={{ flex: 1 }}
          >
            <Animated.View style={styles.popup}>
              {shouldShow ? (
                <TouchableOpacity
                  onPress={() => navigation.navigate("MapPage")}
                  style={styles.menuItemStyle}
                >
                  <Item title={"Set Location"} />
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                onPress={() => alert("About")}
                style={styles.menuItemStyle}
              >
                <Item title={"About"} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => logAuth()}
                style={styles.menuItemStyle}
              >
                <Item title={"Log Out"} />
              </TouchableOpacity>
            </Animated.View>
          </SafeAreaView>
        </Modal>
      </View>
    </View>
  );
};

const Item = (props) => <Text>{props.title}</Text>;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#26294C",
    width: "100%",
    paddingTop: 40,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.4,
    paddingBottom: 8,
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
    paddingBottom: 5,
    width: 200,
  },
  notify: {
    borderRadius: 8,
    borderColor: "#333",
    borderWidth: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    position: "absolute",
    top: 50,
    left: 20,
    paddingBottom: 5,
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
  item: {
    flexDirection: "row",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
});
