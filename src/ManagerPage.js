import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Headers } from "../components/Headers";
import UserInfo from "../components/UserInfo";
import { WorkerList } from "../components/WorkerList";
import { firebase } from "../config";
import { getDatabase, ref, update, onValue } from "firebase/database";
import { SaveLocation } from "../components/SaveLocation";
import * as Location from "expo-location";

export const ManagerPage = () => {
  const [company, setCompany] = useState("");
  const [locationVisible, setLocationVisible] = useState("flex");
  const [lat, setLat] = useState(1);
  const [long, setLong] = useState(2);

  useEffect(() => {
    getLocation();
    getManagerInfo();
    console.log("update");
  }, []);

  const getManagerInfo = () => {
    const db = getDatabase();
    onValue(ref(db, "/users/" + firebase.auth().currentUser.uid), (r) => {
      setCompany(r.val().companyName);
      setLocationVisible(r.val().saveLocation);
    });
  };

  const saveLocation = () => {
    const db = getDatabase();
    update(ref(db, "users/" + firebase.auth().currentUser.uid), {
      saveLocation: "none",
    });

    update(ref(db, "company/" + company), {
      latitude: lat,
      longitude: long,
    }).catch((err) => {
      alert(err);
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

  return (
    <View>
      <Headers />
      <SaveLocation visible={locationVisible} click={saveLocation} />
      <UserInfo />
      <WorkerList company={company} />
    </View>
  );
};
