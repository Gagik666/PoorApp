import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  FlatList,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { getDatabase, ref, set, onValue, child } from "firebase/database";
import uuid from "react-native-uuid";
import { WorkerInfo } from "./WorkerInfo";
import { Ionicons } from "@expo/vector-icons";

export const WorkerList = ({ company }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.firstName
          ? item.firstName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      console.log(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  const getUserList = () => {
    const db = getDatabase();
    const dbRef = ref(db, "/users/");
    onValue(dbRef, (res) => {
      setLoading(true);
      setFilteredDataSource("");
      res.forEach((childRes) => {
        if (
          childRes.val().user == "Worker" &&
          company == childRes.val().companyName
        ) {
          setMasterDataSource((prev) => [
            ...prev,
            {
              id: uuid.v4(),
              userName: childRes.val().userName,
              status: childRes.val().status,
              uid: childRes.val().uid,
              email: childRes.val().email,
            },
          ]);
          setFilteredDataSource((prev) => [
             ...prev,
              {
                id: uuid.v4(),
                userName: childRes.val().userName,
                status: childRes.val().status,
                uid: childRes.val().uid,
                email: childRes.val().email,
              },
            ]);
        }
      });
    });
  };
  useEffect(() => {
    getUserList();
  }, [loading]);

  const openWorkerStatistic = (uid) => {
    navigation.navigate("WorkerStatistic", {
      uid: uid,
    });
  };
  return (
    <View style = {{paddingHorizontal: 16}}>
      <View style={styles.textImputView}>
        <Ionicons
          name="ios-search-circle-sharp"
          size={50}
          color="#058DD9"
          style={styles.iconeSearch}
        />
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search..."
        />
      </View>

      <View style={{ height: "70%" }}>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openWorkerStatistic(item.uid)}>
              <WorkerInfo
                userName={item.userName}
                status={item.status}
                email={item.email}
                backgroundColor = "#CED2E9"
                txtColor="#26294C"
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInputStyle: {
    height: 50,
    paddingLeft: 20,
    borderRadius: 50,
    borderColor: "#CED2E9",
  },
  textImputView: {
    borderRadius: 50,
    marginVertical: 20,
    backgroundColor: "#CED2E9",
    marginHorizontal: 4,
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 5 },
    elevation: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});
