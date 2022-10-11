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
      setFilteredDataSource("")
      res.forEach((childRes) => {
        if (
          childRes.val().user == "Worker" &&
          company == childRes.val().companyName
        ) {
          setMasterDataSource((prev) => [
            ...prev,
            {
              id: uuid.v4(),
              firstName: childRes.val().firstName,
              lastName: childRes.val().lastName,
              status: childRes.val().status,
              uid: childRes.val().uid,
            },
          ]);
          setFilteredDataSource((prev) => {
            return [
              {
                id: uuid.v4(),
                firstName: childRes.val().firstName,
                lastName: childRes.val().lastName,
                status: childRes.val().status,
                uid: childRes.val().uid,
              },
              ...prev,
            ];
          });
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
    <View>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={(text) => searchFilterFunction(text)}
        value={search}
        underlineColorAndroid="transparent"
        placeholder="Search..."
      />
      <View style = {{height: "70%"}}>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openWorkerStatistic(item.uid)}>
              <WorkerInfo
                firstName={item.firstName}
                lastName={item.lastName}
                status={item.status}
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
    borderWidth: 1,
    paddingLeft: 20,
    marginHorizontal: 25,
    marginTop: 50,
    borderRadius: 25,
    borderColor: "#EEEEE",
  },
});
