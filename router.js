import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "./Screens/authScreens/RegistrationScreen";
import LoginScreen from "./Screens/authScreens/LoginScreen";
import HomeScreen from "./Screens/HomeScreen";

const authNav = createStackNavigator();
const homeStack = createStackNavigator();

export const useRoute = (isAuth) => {
  if (isAuth) {
    return (
      <homeStack.Navigator>
        <homeStack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </homeStack.Navigator>
    );
  }

  return (
    <authNav.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <authNav.Screen name="Registration" component={RegistrationScreen} />
      <authNav.Screen name="Login" component={LoginScreen} />
    </authNav.Navigator>
  );
};
