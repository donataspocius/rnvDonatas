import React from "react";
import { NavigationProp } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";

import Button from "../components/Button";
import logo from "../../assets/reflixLogo.png";
import { GlobalStyles } from "../constants/constants";

const Home = ({
  navigation,
}: {
  navigation: NavigationProp<{ Browse: undefined; AuthScreen: undefined }>;
}) => {
  return (
    <>
      <ImageBackground
        source={require("../../assets/movieSc.jpg")}
        style={styles.imageLayout}
      >
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.text}>Never Stop Watching</Text>
          </View>
          <View style={styles.buttonContainer}>
            <View>
              <Button
                style={styles.button}
                onPress={() => navigation.navigate("Browse")}
              >
                Browse
              </Button>
            </View>
            <View>
              <Button
                style={styles.button}
                onPress={() => navigation.navigate("AuthScreen")}
              >
                Login
              </Button>
            </View>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  imageLayout: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logo: {
    height: 50,
    resizeMode: "contain",
  },
  text: {
    fontSize: 27,
    fontWeight: "500",
    marginTop: 20,
    color: GlobalStyles.colors.mainText,
  },
  buttonContainer: {
    flex: 1,
    marginTop: 70,
  },
  button: {
    backgroundColor: GlobalStyles.colors.primary,
    borderRadius: 7,
    marginBottom: 20,
  },
});
