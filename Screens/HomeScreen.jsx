import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  FlatList,
} from "react-native";
import CommentsScreen from "./nestedScreens/CommentsScreen";
import MapScreen from "./nestedScreens/MapScreen";
import DefaultScreen from "./authScreens/DefaultScreen";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";



const nestedScreen = createStackNavigator();

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <nestedScreen.Navigator>
      <nestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreen}
        options={{
          headerShown: false,
          // title: "Публікації",
          // headerBackTitleVisible: false,
          // headerRight: () => (
          //   <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          //     <Feather name="log-out" size={24} color="#BDBDBD" />
          //   </TouchableOpacity>
          // ),
          // headerLeft:  () => false,
          // headerRightContainerStyle: { paddingRight: 16 },
          
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
