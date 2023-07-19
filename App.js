import React, { useState } from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";

const fonts = async () => {
  await Font.loadAsync({
    "roboto-r": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-m": require("./assets/fonts/Roboto-Medium.ttf"),
  });
};

export default function App() {
  const [isReadyfont, setIsReadyfont] = useState(false);

  if (!isReadyfont) {
    return (
      <AppLoading
        startAsync={fonts}
        onFinish={() => setIsReadyfont(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* <RegistrationScreen/> */}
      <LoginScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8E8E8",
  },
});
