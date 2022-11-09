import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Headers } from "../components/Headers";
import UserInfo from "../components/UserInfo";
import { WorkerList } from "../components/WorkerList";
import { firebase } from "../config";
import { getDatabase, ref, update, onValue } from "firebase/database";
import { SaveLocation } from "../components/SaveLocation";
import * as Location from "expo-location";
import { Menu } from "../components/menu/Menu";

export const ManagerPage = () => {
  const [company, setCompany] = useState("");
  const [locationVisible, setLocationVisible] = useState("flex");
  const [lat, setLat] = useState(1);
  const [long, setLong] = useState(2);
  const [menuDisplay, setMenuDisplay] = useState("none");

  useEffect(() => {
    getLocation();
    getManagerInfo();
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
  const openMenu = () => {
    setMenuDisplay("flex");
  };

  const close = () => {
    setMenuDisplay("none");
  };
  return (
    <>
      <View style={{ backgroundColor: "#CED2E9" }}>
        <Headers openMenu={openMenu} />
        <UserInfo />
        <WorkerList company={company} />
      </View>
      <View
        style={{
          display: menuDisplay,
          position: "absolute",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Menu click={close} user={firebase.auth().currentUser.uid} />
      </View>
      <View
        style={{
          display: locationVisible,
          position: "absolute",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <SaveLocation close={close} visible={locationVisible} click={saveLocation} />
      </View>
    </>
  );
};
