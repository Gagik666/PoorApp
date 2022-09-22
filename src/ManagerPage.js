import react, { useEffect, useState } from "react";
import { Button, View } from "react-native";
import { Headers } from "../components/Headers";
import SearchBar from "../components/SearchBar";
import UserInfo from "../components/UserInfo";
import { WorkerList } from "../components/WorkerList";
import { firebase } from "../config";
import { getDatabase, ref, set, onValue } from "firebase/database";

export const ManagerPage = () => {

    const [company, setCompany] = useState("")

    const getManagerInfo = () => {
        const db = getDatabase();
        onValue(ref(db, '/users/' + firebase.auth().currentUser.uid), (r) => {
            setCompany(r.val().companyName);
        })
      };
      useEffect(() => {
        getManagerInfo()
      }, [])

      
      
    return (
        <View>
            <Headers />
            <UserInfo />
            <WorkerList company = {company} />
        </View>
    )
}