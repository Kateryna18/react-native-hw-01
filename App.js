import "react-native-gesture-handler";
import React, { useState } from "react";
import * as Font from "expo-font";
import { Provider, useSelector } from "react-redux";
import AppLoading from "expo-app-loading";
import RobotoRegular from "./assets/fonts/Roboto-Regular.ttf";
import RobotoMedium from "./assets/fonts/Roboto-Medium.ttf";
import RobotoBold from "./assets/fonts/Roboto-Bold.ttf";
import { store } from "./redux/store";
import Main from "./components/Main";

const fonts = async () => {
  await Font.loadAsync({
    "roboto-r": RobotoRegular,
    "roboto-m": RobotoMedium,
    "roboto-b": RobotoBold,
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
    <Provider store={store}>
      <Main/>
    </Provider>
  );
}
