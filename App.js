import 'react-native-gesture-handler';
import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import PostsScreen from "./Screens/PostsScreen";
import RobotoRegular from "./assets/fonts/Roboto-Regular.ttf";
import RobotoMedium from "./assets/fonts/Roboto-Medium.ttf";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


const fonts = async () => {
  await Font.loadAsync({
    "roboto-r": RobotoRegular,
    "roboto-m": RobotoMedium,
  });
};

const {Navigator, Screen} = createStackNavigator();

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
    <NavigationContainer>
      <Navigator initialRouteName="Login">
        {/* <Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false, }}/>
        <Screen name="Login" component={LoginScreen} options={{ headerShown: false, }}/> */}
        <Screen name="PostsScreen" component={PostsScreen} options={{ title: "Публікації" }}/>
      </Navigator>
  </NavigationContainer>
  );
}
