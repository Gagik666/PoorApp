import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";

export const IntruBottom = ({
  title,
  text,
  txtPrev,
  txtNext,
  dataItem,
next,
prev
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.viewTop}></View>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.txtTitle}>{title}</Text>
        <Text
         style={styles.txtContaint}
         >{text}</Text>
      </View>
      <View style={styles.viewBottom}>
        <TouchableOpacity onPress={() => prev()}>
          <Text style={styles.txtButton}>{txtPrev}</Text>
        </TouchableOpacity>
        <View style={styles.viewPos}>
          {dataItem.map((i) => (
            <View
              style={[
                styles.viewPosItem,
                { width: i.size, backgroundColor: i.color },
              ]}
            ></View>
          ))}
        </View>
        <TouchableOpacity onPress={() => next()}>
          <Text style={styles.txtButton}>{txtNext}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CED2E9",
    borderTopStartRadius: 70,
    borderTopEndRadius: 70,
    alignItems: "center",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-around",
  },
  viewTop: {
    backgroundColor: "white",
    borderRadius: 100,
    width: "15%",
    height: 5,
    marginTop: -30
  },
  txtTitle: {
    color: "#17223B",
    height: 29.26,
    fontSize: 24,
    width: "100%",
    fontWeight: "800",
    marginBottom: 16,
    marginTop: -24,
  },
  txtContaint: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 24,
    color: "rgba(38, 56, 89, 0.6)",
  },
  viewBottom: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  txtButton: {
    color: "#17223B",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 22,
    textAlign: "center",
  },
  viewPos: {
    width: "30%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  viewPosItem: {
    height: 8,
    borderRadius: 100,
  },
});
