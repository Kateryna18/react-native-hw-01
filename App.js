import "react-native-gesture-handler";
import React, { useState } from "react";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppLoading from "expo-app-loading";
import RobotoRegular from "./assets/fonts/Roboto-Regular.ttf";
import RobotoMedium from "./assets/fonts/Roboto-Medium.ttf";
import RobotoBold from "./assets/fonts/Roboto-Bold.ttf";
import RegistrationScreen from "./Screens/authScreens/RegistrationScreen";
import LoginScreen from "./Screens/authScreens/LoginScreen";
import HomeScreen from "./Screens/HomeScreen";
import { store } from "./redux/store";

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
  const [user, setUser] = useState(null);

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
      <NavigationContainer>
        <authNav.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false, gestureEnabled: false }}
        >
          <authNav.Screen name="Registration" component={RegistrationScreen} />
          <authNav.Screen name="Login" component={LoginScreen} />
          <authNav.Screen name="Home" component={HomeScreen} />
        </authNav.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
