import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { firebase } from "./config";
import { Login } from "./src/Login";
import { Registration } from "./src/Registration";
import { WorkerPage } from "./src/screens/workerPage/WorkerPage";
import { ManagerPage } from "./src/ManagerPage";
import { GetLocation } from "./src/MapPage";
import { UserItem } from "./components/Items/UserItem";
import { SplashScreen } from "./src/SplashScreen";
import { WorkerStatisticInfo } from "./src/WorkerStatisticInfo";
import {Intru1} from "./src/Intru1"

import WorkerStatistic from "./src/WorkerStatistic";
const Stack = createStackNavigator();



function App() {
  const [initializing, setinitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setinitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  

  // if (initializing) return null;
  
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          header: (props) => null,
        }}
      />
      <Stack.Screen
        name="Intru1"
        component={Intru1}
        options={{
          header: (props) => null,
        }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{
          header: (props) => null,
        }}
      />
      <Stack.Screen
        name="Registration"
        component={Registration}
        options={{
          header: (props) => null,
        }}
      />
      <Stack.Screen
        name="WorkerPage"
        component={WorkerPage}
        options={{
          header: (props) => null,
        }}
      />
      <Stack.Screen
        name="ManagerPage"
        component={ManagerPage}
        options={{
          header: (props) => null,
        }}
      />
      <Stack.Screen
        name="MapPage"
        component={GetLocation}
        options={{
          header: (props) => null,
        }}
      />
      <Stack.Screen
        name="UserItem"
        component={UserItem}
        options={{ header: (props) => null }}
      />

      <Stack.Screen
        name="WorkerStatistic"
        component={WorkerStatistic}
        options={{ header: (props) => null }}
      />
      <Stack.Screen
        name="WorkerStatisticInfo"
        component={WorkerStatisticInfo}
        options={{
          header: (props) => null,
        }}
      />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
