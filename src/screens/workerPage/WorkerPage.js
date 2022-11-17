import React, { useEffect, useReducer, useState } from "react";
import { firebase } from "../../../config";
import { View } from "react-native";
import { Headers } from "../../../components/Headers";
import UserInfo from "../../../components/UserInfo";
import { Statistic } from "../../../components/Statistick";
import * as Location from "expo-location";
import { getDatabase, ref, set, onValue, update } from "firebase/database";
import { Loading } from "../../../components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Menu } from "../../../components/menu/Menu";
import { VorkerButton } from "../../../components/VorkerButton";
import {
  getDate,
  getFullYear,
  getHours,
  getMinutes,
  getMonth,
  getWorked,
} from "../../../functions/Time";
import { styles } from "./style";
import { reduser, setDayInfo, setTimeInfoStatus } from "./index";

export const WorkerPage = () => {

  const [location, dispatch] = useReducer(reduser, {
    lat: 1,
    long: 2,
  });

  const [company, setCompany] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");
  const [companyLat, setCompanyLat] = useState(1);
  const [companyLong, setCompanyLong] = useState(3);
  const [loadingVisible, setLoadingVisible] = useState("none");
  const [day, setDay] = useState(0.1);
  const [countDay, setCountDay] = useState(0);
  const [status, setStatus] = useState("");
  const [menuDisplay, setMenuDisplay] = useState("none");
  const [visitDisplay, setVisitDisplay] = useState("flex");
  const [finishDisplay, setFinishDisplay] = useState("none");
  const [worked, setWorked] = useState("");
  const [timeF, setTimeF] = useState("");
  const [uid, setUid] = useState("");

  useEffect(() => {
    if (firebase.auth().currentUser !== null) {
      setUid(firebase.auth().currentUser.uid);
      setTimeout(() => {
        getCompanyInfo();
      }, 1000);
      getDayInfo();
      getLocation();
    }
  });

  useEffect(() => {
    getCompanyLatLong();
  }, [company]);

  useEffect(() => {
    if ((status === "is absent" || status === "") && day !== getDate()) {
      setVisitDisplay("flex");
    } else {
      setVisitDisplay("none");
      setTimeInfoStatus("true");
    }
    if (timeF === `_ _ : _ _`) {
      setFinishDisplay("flex");
    } else {
      setFinishDisplay("none");
    }
    if (day > 0.1) {
      updateDayInfo();
    }
    getTimeInfoStatus();
  });

  useEffect(() => {
    if (countDay > 0.1) {
      updateCountDay();
    }
  });

  const updateCountDay = () => {
    const db = getDatabase();
    update(ref(db, "users/" + uid), {
      countDay: countDay,
    });
  };

  const getDayInfo = async () => {
    const db = getDatabase();
    try {
      await AsyncStorage.getItem("day").then((value) => {
        if (value == "is present") {
          update(ref(db, "users/" + uid), {
            status: value,
          });
        } else if (value == "is absent") {
          setTimeInfoStatus("false");
          update(ref(db, "users/" + uid), {
            status: value,
          });
        }
      });
    } catch (eror) {
      console.log(eror);
    }
  };

  const updateDayInfo = () => {
    if (getDate() !== day) {
      setDayInfo("is absent");
    }
  };

  const getCompanyInfo = async () => {
    try {
      const db = getDatabase();
      onValue(ref(db, "/users/" + firebase.auth().currentUser.uid), (r) => {
        setCompany(r.val().companyName);
        setDay(r.val().day);
        setCountDay(r.val().countDay);
        setUserName(r.val().userName);
        setEmail(r.val().email);
        setRating(r.val().rating);
        setStatus(r.val().status);
      });
    } catch (error) {}
  };

  const getCompanyLatLong = async () => {
    const db = getDatabase();
    onValue(ref(db, "/company/" + company), (r) => {
      setCompanyLat(r.val().latitude);
      setCompanyLong(r.val().longitude);
    });
  };

  const getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      dispatch({
        type: "change",
        payload: {
          lat: latitude,
          long: longitude,
        },
      });
    } catch (error) {
      console.log("eror location");
    }
  };

  const creatUserInfo = () => {
    const db = getDatabase();
    set(ref(db, "usersInfo/" + `${uid}/` + `${getDate()}`), {
      userName: userName,
      email: email,
      time: `${getHours()}:${getMinutes()}`,
      timeF: `_ _ : _ _`,
      worked: `_ _ : _ _`,
      FullDate: `${getDate()}.${getMonth()}.${getFullYear()}`,
    });
  };

  const getTimeInfo = () => {
    try {
      const db = getDatabase();
      onValue(
        ref(
          db,
          "usersInfo/" + `${firebase.auth().currentUser.uid}/` + `${getDate()}`
        ),
        (r) => {
          setTimeF(r.val().timeF);
        }
      );
    } catch (error) {}
  };

  const chacke = () => {
    const φ1 = (companyLat * Math.PI) / 180; // φ, λ in radians
    const φ2 = (companyLong * Math.PI) / 180;
    const Δφ = ((location.state.lat - companyLat) * Math.PI) / 180;
    const Δλ = ((location.state.long - companyLong) * Math.PI) / 180;
    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return 6371e3 * c;
  };

  const updateStatus = () => {
    if (chacke() <= 20) {
      if (status === "is present") {
        console.log("karmir");
      } else {
        setCountDay(countDay + 1);
      }
      creatUserInfo();

      setDayInfo("is present");
      setTimeInfoStatus("true");
      setLoadingVisible("none");
    } else {
      setLoadingVisible("none");
      setDayInfo("is absent");
    }
  };

  const updateDay = () => {
    const db = getDatabase();

    if (day !== getDate() && chacke() <= 20) {
      update(ref(db, "users/" + uid), {
        day: getDate(),
      }).catch((err) => {
        alert(err);
      });
    }
  };

  const getTime = () => {
    const db = getDatabase();
    onValue(ref(db, "usersInfo/" + `${uid}/` + `${getHours()}`), (r) => {
      try {
        setTimeout(() => {
          update(ref(db, "usersInfo/" + `${uid}/` + `${getHours()}`), {
            worked: getWorked(r.val().time, r.val().timeF),
          });
        }, 6000);
      } catch (error) {}
    });
  };

  const finish = async () => {
    const db = getDatabase();
    await update(ref(db, "usersInfo/" + `${uid}/` + `${getHours()}`), {
      timeF: `${getHours()}:${getMinutes()}`,
    });

    setTimeout(() => {
      getTime();
    }, 2000);
  };

  const change = () => {
    updateDay();
    getDayInfo();
    setLoadingVisible("flex");
    getLocation();
    getCompanyLatLong();
    setTimeout(() => {
      updateStatus();
    }, 5000);
  };

  const openMenu = () => {
    setMenuDisplay("flex");
  };

  const close = () => {
    setMenuDisplay("none");
  };

  const getTimeInfoStatus = async () => {
    const db = getDatabase();
    try {
      await AsyncStorage.getItem("timeInfo").then((value) => {
        if (value == `true`) {
          setTimeout(() => {
            getTimeInfo();
          }, 2000);
        }
      });
    } catch (eror) {
      console.log(eror);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Loading loading={loadingVisible} />
        <Headers openMenu={openMenu} />
        <UserInfo />
        <View style={{ justifyContent: "space-evenly" }}>
          <View style={styles.statisticView}>
            <Statistic countDay={countDay} rating={rating} />
          </View>
          <View
            style={{
              height: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <VorkerButton text="I came" display={visitDisplay} click={change} />
            <VorkerButton
              text="I went"
              display={finishDisplay}
              click={finish}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          display: menuDisplay,
          position: "absolute",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Menu click={close} user={uid} />
      </View>
    </>
  );
};
