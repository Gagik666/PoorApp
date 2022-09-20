import * as React from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { firebase } from "../config";
import { getDatabase, ref, set, onValue } from "firebase/database";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as Location from 'expo-location'

export const GetLocation = () => {
// const [company, setCompany] = React.useState
// const [companyLat, setCompanyLat] = React.useState
// const [companyLong, setCompanyLong] = React.useState

  // const getCompanyInfo = () => {

  //   const db = getDatabase();
  //   onValue(ref(db, '/users/' + firebase.auth().currentUser.uid), (r) => {
  //    setCompany(r.val().companyName)
  // })

  //   onValue(ref(db, `/users/${company}`, (r) => {
  //     setCompanyLat(r.val().latitude)
  //     setCompanyLong(r.val().longitude)
  //   })
  // }
    
  const [orgin, setOrgin] = React.useState({
    latitude: 40.0,
    longitude: 45.0,
  });

  const [lat, setLat] = React.useState(0)
  const [long, setLong] = React.useState(0)

 React.useEffect(() => {
    (async () => {
        try {
            await Location.requestForegroundPermissionsAsync();
            const {
              coords: { latitude, longitude },
            } = await Location.getCurrentPositionAsync();
            setOrgin({
                latitude: latitude,
                longitude: longitude,
              })
            console.log(lat, long);
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
        onPress={() => {
        
        }}
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
