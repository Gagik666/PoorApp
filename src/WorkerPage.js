import React, { useEffect, useState } from "react";
import { firebase } from "../config";
import { StyleSheet, View, TouchableOpacity, Text, Alert } from "react-native";
import { Headers } from "../components/Headers";
import UserInfo from "../components/UserInfo";
import { Statistic } from "../components/Statistick";
import * as Location from "expo-location";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { Loading } from "../components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const WorkerPage = () => {
  const [company, setCompany] = useState("");
  const [companyLat, setCompanyLat] = useState(1);
  const [lat, setLat] = useState(2);
  const [companyLong, setCompanyLong] = useState(3);
  const [long, setLong] = useState(4);
  const [color, setColor] = useState("gray");
  const [loadingVisible, setLoadingVisible] = useState("none");
  const [buttonInfo, setButtonInfo] = useState(false);
  const [day, setDay] = useState(0.1);
  const [countDay, setCountDay] = useState(0);
  let d = new Date();

  useEffect(() => {
    if (firebase.auth().currentUser !== null) {
      getCompanyInfo();
      getDayInfo();
      getLocation();
    }
  });

  useEffect(() => {
    getCompanyLatLong();
  }, [company]);

  useEffect(() => {
    if (day > 0.1) {
      updateDayInfo();
    }
  });

  useEffect(() => {
    if (countDay > 0.1) {
      updateCountDay()
    }
    
  })
  

  const updateCountDay = () => {
    const db = getDatabase();
    update(ref(db, "users/" + firebase.auth().currentUser.uid), {
      countDay: countDay,
      
    });
  }

  const setDayInfo = async (txt) => {
    try {
      await AsyncStorage.setItem("day", txt);
    } catch (eror) {
      console.log(eror);
    }
  };

  const getDayInfo = async () => {
    const db = getDatabase();
    try {
      await AsyncStorage.getItem("day").then((value) => {
        if (value == "is present") {
          setColor("green");
          
          setButtonInfo(true);
          update(ref(db, "users/" + firebase.auth().currentUser.uid), {
            status: value,
          });
        } else if (value == "is absent") {
          update(ref(db, "users/" + firebase.auth().currentUser.uid), {
            status: value,
          });
          setColor("red");
        } else {
          setColor("gray");
        }
      });
    } catch (eror) {
      console.log(eror);
    }
  };

  const updateDayInfo = () => {
    if (d.getDate() !== day) {

      
      setDayInfo("is absent");
      setButtonInfo(false);
    }
  };

  const getCompanyInfo = async () => {
    const db = getDatabase();
    onValue(ref(db, "/users/" + firebase.auth().currentUser.uid), (r) => {
      setCompany(r.val().companyName);
      setDay(r.val().day);
      setCountDay(r.val().countDay)
    });
  };

  const getCompanyLatLong = async () => {
    const db = getDatabase();
    onValue(ref(db, "/company/" + company), (r) => {
      setCompanyLat(r.val().latitude);
      setCompanyLong(r.val().longitude);
    });
  };

  const getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      setLat(latitude);
      setLong(longitude);
    } catch (error) {
      Alert.alert("error", "eror location");
    }
  };

  const chacke = () => {
    const R = 6371e3; // metres
    const φ1 = (companyLat * Math.PI) / 180; // φ, λ in radians
    const φ2 = (companyLong * Math.PI) / 180;
    const Δφ = ((lat - companyLat) * Math.PI) / 180;
    const Δλ = ((long - companyLong) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const updateStatus = () => {
    if (chacke() <= 20) {
      setCountDay(countDay + 1);
      setDayInfo("is present");
      setLoadingVisible("none");
    } else {
      setLoadingVisible("none");
      setDayInfo("is absent");
    }
  };

  const updateDay = () => {
    const db = getDatabase();
    if (day !== d.getDate() && chacke() <= 20) {
      
      update(ref(db, "users/" + firebase.auth().currentUser.uid), {
        day: d.getDate(),
      }).catch((err) => {
        alert(err);
      });
    }
  };

  const change = () => {
    updateDay();
    
    getDayInfo();
    setLoadingVisible("flex");
    getLocation();
    getCompanyLatLong();
    setTimeout(() => {
      updateStatus();
      console.log(chacke());
      console.log(countDay);
    }, 5000);
  };

  return (
    <View style={styles.container}>
      <Loading loading={loadingVisible} />
      <Headers />
      <UserInfo />
      <View>
        <Statistic countDay = {countDay}/>
      </View>
      <View
        style={{
          height: "50%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity style={{ backgroundColor: `${color}`, padding: 10 }}>
          <Text
            disabled={buttonInfo}
            style={styles.btnStyle}
            onPress={() => change()}
          >
            Click me
          </Text>
        </TouchableOpacity>
        {/* <Text>{chacke()}</Text> */}
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
