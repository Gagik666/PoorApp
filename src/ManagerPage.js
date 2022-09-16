import react from "react";
import { View } from "react-native";
import { Headers } from "../components/Headers";
import SearchBar from "../components/SearchBar";
import UserInfo from "../components/UserInfo";

export const ManagerPage = () => {
    return (
        <View>
            <Headers />
            <UserInfo />
            <SearchBar />
        </View>
    )
}