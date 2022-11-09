import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const ModalWindow = ({
  mWindow,
  selectWorker,
  cmpanyName,
  selectCompany,
}) => {
  const [search, setSearch] = useState();
  const [filteredDataSource, setFilteredDataSource] = useState(cmpanyName);
  const [masterDataSource, setMasterDataSource] = useState(cmpanyName);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.text ? item.text.toUpperCase() : "".toUpperCase();
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

  return (
    <Modal visible={mWindow}>
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={selectWorker}>
            <Text>Back</Text>
          </TouchableOpacity>
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
        </View>

        <FlatList
          keyExtractor={(item) => item.id}
          data={cmpanyName}
          renderItem={({ item }) => (
            <View style={styles.itemView}>
              <View style={styles.txtView}>
                <Text>{item.text}</Text>
              </View>
              <View style={styles.touch}>
                <TouchableOpacity
                  onPress={() => {
                    selectCompany(item.text, "Worker"), selectWorker();
                  }}
                >
                  <Text style={styles.txtAdd}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: "#CED2E9",
  },
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
  txtView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemView: {
    flexDirection: "row",
    marginVertical: 8,
    alignItems: "center",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ABABC1",
  },
  touch: {
    width: 40,
    height: 40,
    backgroundColor: "#058DD9",
    borderRadius: 50,
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#6ca5cf",
  },
  txtAdd: {
    fontSize: 30,
    lineHeight: 36,
    color: "#FFF",
    textAlign: "center",
    marginTop: -5
  },
});
