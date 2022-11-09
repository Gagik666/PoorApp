import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IntruBottom } from "../components/intruBottom/IntruBottom";

export const Intru1 = ({ navigation }) => {

  const [pageNumber, setPageNumber] = useState(1)
  const [img1Display, setImg1Display] = useState("flex")
  const [img2Display, setImg2Display] = useState("none")
  const [img3Display, setImg3Display] = useState("none")
  const [prevText, setPrevText] = useState("none")
  const [dataItem, setDataItem] = useState([
    { size: 30, color: "#17223B" },
    { size: 10, color: "rgba(23, 34, 59, 0.2)" },
    { size: 10, color: "rgba(23, 34, 59, 0.2)" },
  ]);
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")

  useEffect(() => {
    if (pageNumber === 1) {
      setImg1Display("flex")
      setImg2Display("none")
      setImg3Display("none")
      setPrevText("")
      setDataItem([
        { size: 30, color: "#17223B" },
        { size: 10, color: "rgba(23, 34, 59, 0.2)" },
        { size: 10, color: "rgba(23, 34, 59, 0.2)" },
      ])
      setTitle("Attendance management")
      setText("Employee attendance management is extremely important for the smooth functioning of any team.")
    }
    if (pageNumber === 2) {
      setImg1Display("none")
      setImg2Display("flex")
      setImg3Display("none")
      setPrevText("Prev")
      setDataItem([
        { size: 10, color: "rgba(23, 34, 59, 0.2)" },
        { size: 30, color: "#17223B" },
        { size: 10, color: "rgba(23, 34, 59, 0.2)" },
      ])
      setTitle("Automation of work flows")
      setText(" Instead of manual entry, you can automatically track employee attendance.")
    }
    if (pageNumber === 3) {
      setImg1Display("none")
      setImg2Display("none")
      setImg3Display("flex")
      setPrevText("Prev")
      setDataItem([
        { size: 10, color: "rgba(23, 34, 59, 0.2)" },
        { size: 10, color: "rgba(23, 34, 59, 0.2)" },
        { size: 30, color: "#17223B" },
      ])
      setTitle("Increasing work efficiency")
      setText("Tracking attendance of your employees keeps them responsible, productive, and boosts the profitability of your business.")
    } 
    if (pageNumber === 4) {
      navigation.navigate("login");
      intruSkip();
    }
  },[pageNumber])

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
    setPageNumber(pageNumber + 1)
    intru()
  };


  const prev = () => {
    setPageNumber(pageNumber - 1)
  };

   
  return (
    <View style={styles.container}>
      <View style = {styles.viewSkip}>
        <TouchableOpacity onPress={() => skip()}>
          <Text style={styles.txtSkip}>Skip</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewTop}>
        <Image style={[styles.image, {display: img1Display}]} source={require("../assets/intru1.png")} />
        <Image style={[styles.image, {display: img2Display}]} source={require("../assets/intru2.png")} />
        <Image style={[styles.image, {display: img3Display}]} source={require("../assets/intru3.png")} />
      </View>
      <View style={styles.viewBottom}>
        <IntruBottom
          title={title}
          text={text}
          txtPrev={prevText}
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
    height: "70%",
    resizeMode: "contain"
  },
  txtSkip: {
    color: "#6B778D",
    textAlign: "right",
    marginTop: 40,
    marginEnd: 50,
    fontWeight: "700",
  },
  viewSkip: {
    flex:1,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
});
