import MapView, { Marker, Polyline } from "react-native-maps";
import React, { useEffect, useState } from "react";
import { firebase } from "../config";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

export const GetLocation = () => {
  const navigation = useNavigation();
  const [company, setCompany] = useState("");
  const [companyLat, setCompanyLat] = useState(40);
  const [companyLong, setCompanyLong] = useState(40);
  const [uid, setUid] = useState("");

  useEffect(() => {
    setUid(firebase.auth().currentUser.uid)
  })

  useEffect(() => {
    getCompanyInfo();
    console.log(uid);
    console.log(company);
  });

  const getCompanyInfo = () => {
    const db = getDatabase();
    onValue(ref(db, "/users/" + uid), (r) => {
      setCompany(r.val().companyName);
    });
  };

  const updateCompanyInfo = () => {
    const db = getDatabase();
    update(ref(db, "company/" + company), {
      latitude: ("" + companyLat).slice(0, 7),
      longitude: ("" + companyLong).slice(0, 7),
    }).catch((err) => {
      alert(err);
    });

    navigation.navigate("ManagerPage");
  };

  const [orgin, setOrgin] = React.useState({
    latitude: 40.0,
    longitude: 45.0,
  });

  React.useEffect(() => {
    (async () => {
      try {
        await Location.requestForegroundPermissionsAsync();
        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync();
        setCompanyLat(latitude);
        setCompanyLong(longitude);
        setOrgin({
          latitude: latitude,
          longitude: longitude,
        });
      } catch (error) {
        alert("error", "eror location");
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: orgin.latitude,
          longitude: orgin.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
      >
        <Marker
          draggable
          coordinate={orgin}
          onDragEnd={(direction) => setOrgin(direction.nativeEvent.coordinate)}
        />
      </MapView>
      <TouchableOpacity
        style={{
          height: "20%",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => updateCompanyInfo()}
      >
        <Text style={styles.btnStyle}>Save Selected Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "80%",
  },
  btnStyle: {
    backgroundColor: "#0088ff",
    color: "white",
    borderRadius: 20,
    padding: 15,
    fontSize: 16,
  },
});
