import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, {useState, useEffect} from "react";
import {firebase} from './config'

import { Login } from "./src/Login";
import { Registration } from "./src/Registration";
import { Dashbords } from "./src/Dashbords";
import { Header } from "./components/Header";


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
      <Stack.Navigator>
        <Stack.Screen 
          name = "login"
          component={Login}
          options = {
            {
              headerTitle: () => <Header name = "Bug Ninza" />,
              headerStyle: {
                height: 150,
                borderBottomLeftRadius: 50,
                borderBottomEndRadius: 50,
                backgroundColor: '#90e4d0',
                shadowColor: '#000',
                elevation: 25
              }
             }
          }
        />
        <Stack.Screen 
          name = "Registration"
          component={Registration}
          options = {
            {
              headerTitle: () => <Header name = "Bug Ninza" />,
              headerStyle: {
                height: 150,
                borderBottomLeftRadius: 50,
                borderBottomEndRadius: 50,
                backgroundColor: '#90e4d0',
                shadowColor: '#000',
                elevation: 25
              }
             }
          }
        />
      </Stack.Navigator>
    )
  }
  
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}