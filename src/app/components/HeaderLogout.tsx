import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { logoutUser } from "../utils/authFunctions";
import { useDispatch } from "react-redux";
import { updateUserId } from "../state/auth/authSlice";
import { setUserFavorites } from "../state/content/contentSlice";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/screenTypes";

interface HeaderLogoutProps {
  navigation: StackNavigationProp<RootStackParamList, "HeaderLogout">;
}

const HeaderLogout = ({ navigation }: HeaderLogoutProps) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    logoutUser();
    dispatch(updateUserId(""));
    dispatch(setUserFavorites([]));
    navigation.navigate("Home");
  };
  return (
    <TouchableOpacity onPress={handleLogout}>
      <Icon
        style={styles.icon}
        name={"log-out-outline"}
        size={29}
        color={"white"}
      />
    </TouchableOpacity>
  );
};

export default HeaderLogout;

const styles = StyleSheet.create({
  icon: {
    marginRight: 20,
  },
});
