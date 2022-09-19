import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { firebase } from "./config";

import { Login } from "./src/Login";
import { Registration } from "./src/Registration";
import { Dashbords } from "./src/Dashbords";
import { WorkerPage } from "./src/WorkerPage";
import { ManagerPage } from "./src/ManagerPage";
import { GetLocation } from "./src/MapPage";
import { UserItem } from "./components/Items/UserItem";
import  WorkersList  from "./components/Lists/WorkersList";

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

  if (initializing) return null;

    return (
<<<<<<< HEAD
      <Stack.Navigator  >
=======
      <Stack.Navigator initialRouteName="WorkersList">

>>>>>>> f82e297a5903c3b528e2a61b82802ef01c287588
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
          options={
            {
              header: (props) => null
            }
          }
        />
<<<<<<< HEAD
        <Stack.Screen 
          name = "ManagerPage"
          component={ManagerPage}
          options = {
=======
        <Stack.Screen
          name="WorkersList"
          component={WorkersList}
          options={
>>>>>>> f82e297a5903c3b528e2a61b82802ef01c287588
            {
              header: (props) => null
            }
          }
        />
      </Stack.Navigator>
    );
  }
<<<<<<< HEAD

=======
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashbord"
        component={Dashbords}
        options={{
          header: (props) => null,
        }}
      />
    </Stack.Navigator>
  );
}
>>>>>>> f82e297a5903c3b528e2a61b82802ef01c287588

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
