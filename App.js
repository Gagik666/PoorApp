import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { firebase } from './config'

import { Login } from "./src/Login";
import { Registration } from "./src/Registration";
import { Dashbords } from "./src/Dashbords";
import { WorkerPage } from "./src/WorkerPage";


const Stack = createStackNavigator()

function App() {
  const [initializing, setinitializing] = useState(true)
  const [user, setUser] = useState()

  function onAuthStateChanged(user) {
    setUser(user)
    if (initializing) setinitializing(false)
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])

  if (initializing) return null

  if (!user) {
    return (
      <Stack.Navigator >
        <Stack.Screen
          name="login"
          component={Login}
          options={
            {
              header: (props) => null
            }
          }
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={
            {
              header: (props) => null
            }
          }
        />
        <Stack.Screen
          name="WorkerPage"
          component={WorkerPage}
          options={
            {
              header: (props) => null
            }
          }
        />
      </Stack.Navigator>
    )
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashbord"
        component={Dashbords}
        options={
          {
            header: (props) => null
          }
        }
      />
    </Stack.Navigator>
  )
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}