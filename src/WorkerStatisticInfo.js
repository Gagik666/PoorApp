import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getDatabase, ref, update, onValue } from "firebase/database";
import { useRoute } from "@react-navigation/native";
import { WorkerStatisticInfoList } from "../components/Lists/WorkerStatisticInfoList";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const WorkerStatisticInfo = () => {
  const route = useRoute();
  const navigation = useNavigation();
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
          {
            fullDate: i.val().FullDate,
            time: i.val().time,
            timeF: i.val().timeF,
            worked: i.val().worked,
          },
        ]);
      });
    });
  };

  const getHtml = () => {
    return (html = `
  <html>
    <head>
      <style >
        table {
          border-collapse: collapse;
        }
        table tbody tr th, td {
          padding: 10px;
        }
      </style>
    </head>
    <body>
    <div style="display: flex; flex-direction: row; align-items: center"> 
    <h2>Employee &#8242 &#160</h2>
    <span>${userName}</span>
    </div> 
      <div> 
        <table border = "1" style="width:100%; text-align: center;">
        <tbody>
          <tr>
            <th>Data</th>
            <td>Visit</td>
            <td>Finish</td>
            <td>Worked</td>
          </tr>
        </tbody>
        ${workerStatisticInfoList.map(
          (i) =>
            `<tbody> 
                <tr>
                  <th>${i.fullDate}</th>
                  <td>${i.time}</td>
                  <td>${i.timeF}</td>
                  <td>${i.worked}</td>
                </tr>
              </tbody>`
        )}
            </table>
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
      <View style={styles.viewTop}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="chevron-left" size={24} color="#FFF" />
        </TouchableOpacity>
      </View> 
        <View>
          <Text style = {styles.txt}>{userName}</Text>
          <Text style = {styles.txt}>{email}</Text>
        </View>
        <View style = {styles.viewRating}>
          <Text style = {styles.txt}>{rating}</Text>
        </View>
      </View>
      <View style={{ flex: 9, width: "95%", marginTop: 10}}>
        <WorkerStatisticInfoList
          workerStatisticInfoList={workerStatisticInfoList}
        />
      </View>
      <View style={{ flex: 1, width: "95%", alignItems: "center"}}>
        <TouchableOpacity style = {styles.button}>
        <Text style = {styles.btnTxtColor} onPress={() => generatedPdf()}>Generated</Text>
      </TouchableOpacity>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#CED2E9"
  },
  header: {
    flex: 1,
    paddingTop: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#26294C",
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
  },
  txt: {
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 15,
    color: "#FFF",
    textTransform: "uppercase",
  },
  viewRating: {
    width: 50,
    height: 50,
    backgroundColor: "#058DD9",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#6ca5cf",
  },
  button: {
    height: 50,
    paddingHorizontal: 30,
    backgroundColor: "#26294C",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  btnTxtColor: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 24,
  },
});
