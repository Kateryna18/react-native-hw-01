import "react-native-gesture-handler";
import React, { useState } from "react";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppLoading from "expo-app-loading";
import RobotoRegular from "./assets/fonts/Roboto-Regular.ttf";
import RobotoMedium from "./assets/fonts/Roboto-Medium.ttf";
import RobotoBold from "./assets/fonts/Roboto-Bold.ttf";
import RegistrationScreen from "./Screens/authScreens/RegistrationScreen";
import LoginScreen from "./Screens/authScreens/LoginScreen";
import HomeScreen from "./Screens/HomeScreen";
// import {useRoute} from "./router";


const fonts = async () => {
  await Font.loadAsync({
    "roboto-r": RobotoRegular,
    "roboto-m": RobotoMedium,
    "roboto-b": RobotoBold,
  });
};

const authNav = createStackNavigator();

export default function App() {
  const [isReadyfont, setIsReadyfont] = useState(false);
  // const routing = useRoute(null)

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
    <authNav.Navigator initialRouteName="Login">
        <authNav.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <authNav.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <authNav.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </authNav.Navigator>
  </NavigationContainer>;
}
