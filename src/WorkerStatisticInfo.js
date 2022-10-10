import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getDatabase, ref, update, onValue } from "firebase/database";
import { useRoute } from "@react-navigation/native";
import { WorkerStatisticInfoList } from "../components/Lists/WorkerStatisticInfoList";

export const WorkerStatisticInfo = () => {
  const route = useRoute();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [workerStatisticInfoList, setWorkerStatisticInfoList] = useState([
    {fullDate: "FullDate", rating: "Rating"}
  ]);
  useEffect(() => {
    getWorkerInfo();
    getWorkerInfoList();
    
  }, []);

  const getWorkerInfo = () => {
    const db = getDatabase();
    onValue(ref(db, "/users/" + route.params.uid), (r) => {
      setFirstName(r.val().firstName);
      setLastName(r.val().lastName);
      setEmail(r.val().email);
    });
  };

  const getWorkerInfoList = () => {
    const db = getDatabase();
    onValue(ref(db, "/usersInfo/" + route.params.uid), (r) => {
      r.forEach((i) => {
        setWorkerStatisticInfoList((prev) => [
          ...prev,
          { fullDate: i.val().FullDate, 
            rating: i.val().rating
        },
        ]);
      });
    });
  };

  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>{firstName}</Text>
        <Text>{lastName}</Text>
        <Text>{email}</Text>
      </View>
      <WorkerStatisticInfoList workerStatisticInfoList = {workerStatisticInfoList}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
  },
  header: {
    width: "70%",
    flexDirection: "row",
    justifyContent:"space-between",
  },
});
