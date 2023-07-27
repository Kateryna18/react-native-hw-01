import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import RobotoRegular from './assets/fonts/Roboto-Regular.ttf';
import RobotoMedium from './assets/fonts/Roboto-Medium.ttf';

const fonts = async () => {
  await Font.loadAsync({
    "roboto-r": RobotoRegular,
    "roboto-m": RobotoMedium,
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

  const keyBoardHide = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyBoardHide}>
    <View style={styles.container}>
      <RegistrationScreen />
      {/* <LoginScreen/> */}
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8E8E8",
  },
});
