import React, { useState } from "react";
import { firebase } from "../config";
import { getDatabase, ref, set, onValue } from "firebase/database";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const ModalWindow = ({
  mWindow,
  selectWorker,
  cmpanyName,
  selectCompany,
}) => {
  return (
    <Modal visible={mWindow}>
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={selectWorker}>
            <Text>Back</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          keyExtractor={(item) => item.id}
          data={cmpanyName}
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
    backgroundColor: "aqua",
  },
});
