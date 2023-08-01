import "react-native-gesture-handler";
import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import RobotoRegular from "./assets/fonts/Roboto-Regular.ttf";
import RobotoMedium from "./assets/fonts/Roboto-Medium.ttf";
import RobotoBold from "./assets/fonts/Roboto-Bold.ttf";
import { NavigationContainer } from "@react-navigation/native";
import {useRoute} from "./router";


const fonts = async () => {
  await Font.loadAsync({
    "roboto-r": RobotoRegular,
    "roboto-m": RobotoMedium,
    "roboto-b": RobotoBold,
  });
};


export default function App() {
  const [isReadyfont, setIsReadyfont] = useState(false);
  const routing = useRoute({})

  if (!isReadyfont) {
    return (
      <AppLoading
        startAsync={fonts}
        onFinish={() => setIsReadyfont(true)}
        onError={console.warn}
      />
    );
  }

  return <NavigationContainer>
    {routing}
  </NavigationContainer>;
}
