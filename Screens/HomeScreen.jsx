import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CommentsScreen from "./nestedScreens/CommentsScreen";
import MapScreen from "./nestedScreens/MapScreen";
import DefaultScreen from "./authScreens/DefaultScreen";

const nestedScreen = createStackNavigator();

export default function HomeScreen() {

  return (
    <nestedScreen.Navigator>
      <nestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreen}
        options={{
          headerShown: false,
        }}
      />
      <nestedScreen.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{ title: "Коментарі",  headerBackTitleVisible: false,}}
      />
      <nestedScreen.Screen name="MapScreen" component={MapScreen} options={{ title: "Карта",  headerBackTitleVisible: false,}}/>
    </nestedScreen.Navigator>
  );
}
