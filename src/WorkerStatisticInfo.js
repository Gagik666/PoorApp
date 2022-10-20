import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getDatabase, ref, update, onValue } from "firebase/database";
import { useRoute } from "@react-navigation/native";
import { WorkerStatisticInfoList } from "../components/Lists/WorkerStatisticInfoList";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
export const WorkerStatisticInfo = () => {
  const route = useRoute();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(0);
  const [workerStatisticInfoList, setWorkerStatisticInfoList] = useState([
    { fullDate: "Visit" },
  ]);

  useEffect(() => {
    getWorkerInfo();
    getWorkerInfoList();
  }, []);

  const getWorkerInfo = () => {
    const db = getDatabase();
    onValue(ref(db, "/users/" + route.params.uid), (r) => {
      setUserName(r.val().userName);
      setEmail(r.val().email);
      setRating(r.val().rating);
    });
  };

  const getWorkerInfoList = () => {
    setWorkerStatisticInfoList("");
    const db = getDatabase();
    onValue(ref(db, "/usersInfo/" + route.params.uid), (r) => {
      r.forEach((i) => {
        setWorkerStatisticInfoList((prev) => [
          ...prev,
          { fullDate: i.val().FullDate, time: i.val().time },
        ]);
      });
    });
  };

  const getHtml = () => {
    return (html = `
  <html>
    <head>
      <style>
        table {
          border-collapse: collapse;
        }
        table tbody tr th, td {
          padding: 10px;
        }
      </style>
    </head>
    <body>
      <h1>${userName}</h1>
      <div> 
        ${workerStatisticInfoList.map(
          (i) =>
            `<table border = "1">
              <tbody>
                <tr>
                  <th>${i.fullDate}</th>
                  <td> v - ${i.time}</td>
                </tr>
              </tbody>
            </table>`
        )}
      </div>
      
    </body>
    
  </html>`);
  };

  let generatedPdf = async () => {
    const file = await printToFileAsync({
      html: getHtml(),
      base64: false,
    });

    await shareAsync(file.uri);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>{userName}</Text>
        <Text>{email}</Text>
        <Text>{rating}</Text>
      </View>
      <View style={{ height: "85%", width: "95%" }}>
        <WorkerStatisticInfoList
          workerStatisticInfoList={workerStatisticInfoList}
        />
      </View>
      <TouchableOpacity>
        <Text onPress={() => generatedPdf()}>Generated</Text>
      </TouchableOpacity>
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
    justifyContent: "space-between",
  },
});
