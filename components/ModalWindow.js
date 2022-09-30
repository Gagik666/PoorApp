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
          <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search..."
          />
        </View>

        <FlatList
          keyExtractor={(item) => item.id}
          data={filteredDataSource}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.touch}
              onPress={() => {
                selectCompany(item.text, "Worker"), selectWorker();
              }}
            >
              <Text>{item.text}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  touch: {
    padding: 10,
    marginTop: 5,
    backgroundColor: "#00ffbf",
    borderRadius: 10,
    height: 50,
    justifyContent:"center",
  },
  textInputStyle: {
    height: 50,
    borderWidth: 0.5,
    paddingLeft: 20,
    marginHorizontal: 4,
    marginTop: 20,
    borderRadius: 10,
    borderColor: "#EEEEE",
    marginBottom: 20,
  },
});
