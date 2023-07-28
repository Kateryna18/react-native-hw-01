import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import RobotoRegular from "./assets/fonts/Roboto-Regular.ttf";
import RobotoMedium from "./assets/fonts/Roboto-Medium.ttf";

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

  return (
    <>
    <RegistrationScreen/>
  {/* // <LoginScreen/> */}
  </>
  );
}
