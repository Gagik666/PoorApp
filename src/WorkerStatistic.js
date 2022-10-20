import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Statistic } from "../components/Statistick";
import { Headers } from "../components/Headers";
import { WorkerInfo } from "../components/WorkerInfo";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getDatabase, ref, update, onValue } from "firebase/database";
import Slider from "@react-native-community/slider";

const WorkerStatistic = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [userName, setUserName] = useState("userName");
  const [status, setstatus] = useState("status");
  const [countDay, setCountDay] = useState(0);
  const [fixRating, setFixRating] = useState(1);
  const [rating, setRating] = useState(0);
  const [day, setDay] = useState(0.1);
  const [dayRating, setDayRating] = useState(0.1);
  const [visibleItem, setVisibleItem] = useState("none");
  const [visableView, setVisableView] = useState("flex");
  let d = new Date();
  useEffect(() => {
    getWorkerInfo();
  }, []);

  useEffect(() => {
    if (rating > 0) {
      setVisibleItem("flex");
    }
  }, [rating]);

  useEffect(() => {
    if (d.getDate() !== dayRating) {
      setVisableView("flex");
    } else {
      setVisableView("none");
    }
  }, [dayRating]);

  const getWorkerInfo = () => {
    const db = getDatabase();
    onValue(ref(db, "/users/" + route.params.uid), (r) => {
      setUserName(r.val().userName);
      setstatus(r.val().status);
      setCountDay(r.val().countDay);
      setDayRating(r.val().dayRating);
      setFixRating(r.val().rating);
    });
  };

  const updateDayRating = () => {
    const db = getDatabase();
    if (fixRating > 0.1) {
      update(ref(db, "users/" + route.params.uid), {
        dayRating: d.getDate(),
      });
    }
  };

  const updateRating = () => {
    const db = getDatabase();
    if (fixRating > 0.1) {
      update(ref(db, "users/" + route.params.uid), {
        rating: fixRating + Math.floor(rating),
      });
    }
  };

  const saveRating = () => {
    back()
    setVisibleItem("none");
    updateRating();
    setVisableView("none");
    updateDayRating();
  };

  const ShowAllInfo = () => {
    navigation.navigate("WorkerStatisticInfo", {
       uid: route.params.uid
    })
  }

  const back = () => {
    navigation.goBack(null)
  }

  return (
    <View style={styles.container}>
      <Headers />
      <WorkerInfo userName={userName} status={status} />
      <View style={{ marginTop: 50 }}>
        <Statistic countDay={countDay} rating={fixRating} />
      </View>
      <TouchableOpacity onPress={() => ShowAllInfo()}>
        <Text>Show all info</Text>
      </TouchableOpacity>
      <View
        style={{
          height: "50%",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <View style={styles.ratingView}>
          <Text style={{ display: visibleItem }}>{Math.floor(rating)}</Text>
          <Slider
            style={[styles.slider, { display: visableView }]}
            onValueChange={(value) => setRating(value)}
            minimumValue={1}
            maximumValue={5}
          />
          <TouchableOpacity
            style={{ display: visibleItem }}
            onPress={() => saveRating()}
          >
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack(null)}>
            <Ionicons
              name="ios-return-down-back-outline"
              size={50}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnStyle: {
    color: "white",
    borderRadius: 20,
    padding: 10,
    fontSize: 16,
  },
  ratingView: {
    width: "100%",
    alignItems: "center",
  },
  slider: {
    width: "80%",
    height: 50,
  },
});

export default WorkerStatistic;
