import react, { useState } from "react";
import { Button, View } from "react-native";
import { Headers } from "../components/Headers";
import SearchBar from "../components/SearchBar";
import UserInfo from "../components/UserInfo";
import { WorkerList } from "../components/WorkerList";
import { firebase } from "../config";
import { getDatabase, ref, set, onValue } from "firebase/database";

export const ManagerPage = () => {

    const [company, setCompany] = useState("")

    const getMAnagerInfo = () => {
        const db = getDatabase();
        onValue(ref(db, '/users/' + firebase.auth().currentUser.uid), (r) => {
            setCompany(r.val().companyName);
        })
      };

      setTimeout(function(){getMAnagerInfo()}, 2000)

    return (
        <View>
            <Headers />
            <UserInfo />
            <SearchBar />

            <WorkerList company = {company} />
        </View>
    )
}