import MapView, { Marker, Polyline } from "react-native-maps";
import React, { useEffect, useState } from "react";
import { firebase } from "../config";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

export const GetLocation = () => {
  const navigation = useNavigation();
  const [company, setCompany] = useState("");
  const [uid, setUid] = useState("");
  const [orgin, setOrgin] = React.useState({
    latitude: 40.0,
    longitude: 45.0,
  });

  useEffect(() => {
    setUid(firebase.auth().currentUser.uid);
  });

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
      latitude: ("" + orgin.latitude).slice(0, 7),
      longitude: ("" + orgin.longitude).slice(0, 7),
    }).catch((err) => {
      alert(err);
    });
    navigation.navigate("ManagerPage");
  };

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
      } catch (error) {}
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.viewTop}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="chevron-left" size={24} color="#FFF" />
        </TouchableOpacity>
      </View> 

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
          onDragEnd={(e) => {
            setOrgin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}
        />
      </MapView>

      <View style={styles.viewBottom}>
        <TouchableOpacity
          style={styles.touchChange}
          onPress={() => updateCompanyInfo()}
        >
          <Text style={styles.btnStyle}>Change Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#CED2E9",
  },
  viewTop: {
    flex: 1,
    width: "100%",
    backgroundColor: "#26294C",
    marginBottom: -25,
    justifyContent: "center",
    paddingStart: 10
  },
  viewContient: {
    flex: 4,
    width: "100%",
    backgroundColor: "red",
  },
  viewBottom: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#CED2E9",
  },
  map: {
    flex: 4,
    width: "100%",
    height: "100%",
    borderRadius: 30,

    zIndex: 1,
  },
  btnStyle: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 24,
  },
  touchChange: {
    height: 50,
    paddingHorizontal: 30,
    backgroundColor: "#26294C",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});
