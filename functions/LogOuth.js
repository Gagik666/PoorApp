

  import { firebase } from "../config";
  import AsyncStorage from "@react-native-async-storage/async-storage";

export const logAuth = () => {
    console.log(firebase.auth().currentUser);
    firebase
      .auth()
      .signOut()
      .then(() => {
        if (firebase.auth().currentUser === null) {
          console.log("stacvec");
          clear();
        }
      });
  };


const clear = async () => {
    try {
      await AsyncStorage.setItem("day", "");
      await AsyncStorage.setItem("curentUser", "false");
      await AsyncStorage.setItem("email", " ");
      await AsyncStorage.setItem("password", " ");
    } catch (eror) {
      console.log(eror);
    }
  };