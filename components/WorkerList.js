import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { getDatabase, ref, set, onValue } from "firebase/database";
import uuid from "react-native-uuid";
import { WorkerInfo } from "./WorkerInfo";

export const WorkerList = ({ company }) => {
  const [worker, setWorker] = useState([]);
  const [loading, setLoading] = useState(false)
  const getUserList = () => {
    const db = getDatabase();
    const dbRef = ref(db, "/users/");
    onValue(dbRef, (res) => {
      setLoading(true)
      res.forEach((childRes) => {
        if (
          childRes.val().user == "Worker" &&
          company == childRes.val().companyName
        ) {
          setWorker((prev) => [
            ...prev,
            {
              id: uuid.v4(),
              firstName: childRes.val().firstName,
              lastName: childRes.val().lastName,
            },
          ]);
        }
      });
    })
  };
  console.log(loading);
  useEffect(() => {
      getUserList();
  }, [loading]);


  return (
    <View>
      <FlatList
        data={worker}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WorkerInfo firstName={item.firstName} lastName={item.lastName} />
        )}
      />
    </View>
  );
};
