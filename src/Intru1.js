import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IntruBottom } from "../components/intruBottom/IntruBottom";

export const Intru1 = ({ navigation }) => {
  const intru = async () => {
    try {
      await AsyncStorage.setItem("intru", "true");
    } catch (eror) {
      console.log(eror);
    }
  };

  const intruSkip = async () => {
    try {
      await AsyncStorage.setItem("intru", "false");
    } catch (eror) {
      console.log(eror);
    }
  };

  const skip = () => {
    navigation.navigate("login");
    intruSkip();
  };

  const next = () => {
    navigation.navigate("Intru2");
    intru();
  };

  const prev = () => {
    console.log("");
  };

  const dataItem = [
    { size: 30, color: "#17223B" },
    { size: 10, color: "rgba(23, 34, 59, 0.2)" },
    { size: 10, color: "rgba(23, 34, 59, 0.2)" },
  ];
  return (
    <View style={styles.container}>
      <View style = {styles.viewSkip}>
        <TouchableOpacity onPress={() => skip()}>
          <Text style={styles.txtSkip}>Skip</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewTop}>
        <Image style={styles.image} source={require("../assets/intru1.png")} />
      </View>
      <View style={styles.viewBottom}>
        <IntruBottom
          title="Shop Online Products"
          text="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
          txtPrev=""
          txtNext="Next"
          dataItem={dataItem}
          next={next}
          prev={prev}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#26294C",
  },
  viewTop: {
    flex:6,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  viewBottom: {
    flex: 4
  },
  image: {
    width: "90%",
    height: "70%"
  },
  txtSkip: {
    color: "#6B778D",
    textAlign: "right",
    marginTop: 50,
    marginEnd: 50,
    fontWeight: "700",
  },
  viewSkip: {
   flex:1,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
});
