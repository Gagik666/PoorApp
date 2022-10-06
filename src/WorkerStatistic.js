import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Statistic } from "../components/Statistick";
import { Headers } from "../components/Headers";
import { WorkerInfo } from "../components/WorkerInfo";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";
import { getDatabase, ref, set, onValue } from "firebase/database";

const WorkerStatistic = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("firstname");
  const [lastName, setLastName] = useState("lastname");
  const [status, setstatus] = useState("status");
  const [countDay, setCountDay] = useState(0)

useEffect(() => {
  getWorkerInfo()
}, [])
  const getWorkerInfo = () => {
    const db = getDatabase();
    onValue(ref(db, "/users/" + route.params.uid), (r) => {
      setFirstName(r.val().firstName);
      setLastName(r.val().lastName);
      setstatus(r.val().status);
      setCountDay(r.val().countDay);
    });
  };

  return (
    <View style={styles.container}>
      <Headers />
      <WorkerInfo
        firstName={firstName}
        lastName={lastName}
        status={status}
      />
      <View style={{ marginTop: 50 }}>
        <Statistic countDay ={countDay}/>
      </View>
      <View
        style={{
          height: "50%",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={{ padding: 10 }}>
            <Text
              style={[styles.btnStyle, { backgroundColor: `green` }]}
              onPress={() => change()}
            >
              Positive
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10 }}>
            <Text
              style={[styles.btnStyle, { backgroundColor: `red` }]}
              onPress={() => change()}
            >
              Negative
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack(null)}>
          <Ionicons name="ios-return-down-back-outline" size={50} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnStyle: {
    color: "white",
    borderRadius: 20,
    padding: 10,
    fontSize: 16,
  },
});

export default WorkerStatistic;
