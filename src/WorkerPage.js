import React, { useEffect, useState } from "react";
import { firebase } from "../config";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Headers } from "../components/Headers";
import UserInfo from "../components/UserInfo";
import { Statistic } from "../components/Statistick";
import * as Location from "expo-location";
import { getDatabase, ref, onValue } from "firebase/database";

export const WorkerPage = () => {
  const [company, setCompany] = useState("");
  const [companyLat, setCompanyLat] = useState(1);
  const [lat, setLat] = useState(2);
  const [companyLong, setCompanyLong] = useState(3);
  const [long, setLong] = useState(4);
  const [color, setColor] = useState("gray");
  useEffect(() => {
    if (firebase.auth().currentUser !== null) {
      getCompanyInfo();
    }
  });

   

  useEffect(() => {
    console.log(company);
    getLocation()
    getCompanyLatLong()
  }, [company]);

  const getCompanyInfo = () => {
    const db = getDatabase();
    onValue(ref(db, "/users/" + firebase.auth().currentUser.uid), (r) => {
      setCompany(r.val().companyName);
    });
  };

  const getCompanyLatLong = () => {
    console.log("company");
    const db = getDatabase();
    onValue(ref(db, "/company/" + company), (r) => {
      setCompanyLat(r.val().latitude);
      setCompanyLong(r.val().longitude);
    });
  };

  const getLocation = async () => {
    console.log("location");
    try {
      await Location.requestForegroundPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      setLat(("" + latitude).slice(0, 7));
      setLong(("" + longitude).slice(0, 7));
    } catch (error) {
      Alert.alert("error", "eror location");
    }
  };

  const updateColor = () => {
     
    if (lat === companyLat && long === companyLong) {
      console.log("update color");
      setColor("green")
    } else {
      setColor("red")
    }
     
  }

  
  
  const change = () => {
    getLocation()
    getCompanyLatLong()
     setTimeout(() => {
      updateColor()
     }, 5000);
    
  }

  return (
    <View style={styles.container}>
      <Headers />
      <UserInfo />
      <View>
        <Statistic />
      </View>
      <View
        style={{
          height: "50%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
       
        <TouchableOpacity style = {{backgroundColor: `${color}`, padding: 10}}>
          <Text style={styles.btnStyle} onPress = {() => change()}>Click me</Text>
        </TouchableOpacity>
        <Text>{companyLat}</Text>
        <Text>{companyLong}</Text>
        <Text>{lat}</Text>
        <Text>{long}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnStyle: {
    backgroundColor: "#0088ff",
    color: "white",
    borderRadius: 20,
    padding: 10,
    fontSize: 16,
  },
});
