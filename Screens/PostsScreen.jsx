import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreen from "./nestedScreens/DefaultScreen";
import CommentsScreen from "./nestedScreens/CommentsScreen";
import MapScreen from "./nestedScreens/MapScreen";

const nestedScreen = createStackNavigator();

export default function PostsScreen() {
  return (
    <nestedScreen.Navigator screenOptions={{ headerShown: false }}>
      <nestedScreen.Screen name="DefaultScreen" component={DefaultScreen} />
      <nestedScreen.Screen name="CommentsScreen" component={CommentsScreen} />
      <nestedScreen.Screen name="MapScreen" component={MapScreen} />
    </nestedScreen.Navigator>
  );
}
