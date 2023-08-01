import React from "react";
import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import PostsScreen from "../Screens/nestedScreens/PostsScreen";
import CreatePostsScreen from "../Screens/CreatePostsScreen";
import ProfileScreen from "../Screens/ProfileScreen";

const tabNav = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <>
      <tabNav.Navigator
        initialRouteName="Posts"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: "#FF6C00",
          tabBarStyle: {
            paddingHorizontal: 81,
          },
          tabBarItemStyle: {
            marginTop: 9,
            borderRadius: 20,
          },
          tabBarActiveTintColor: "#ffffff",
          tabBarInactiveTintColor: "#212121",
        }}
      >
        <tabNav.Screen
          name="Posts"
          component={PostsScreen}
          options={{
            title: "Публікації",
            tabBarIcon: (focused, size, color) => (
              <Feather name="grid" size={24} color={color} />
            ),
            headerRight: () => (
              <Feather name="log-out" size={24} color="#BDBDBD" />
            ),
            headerRightContainerStyle: { paddingRight: 10 },
          }}
        />
        <tabNav.Screen
          name="Create"
          component={CreatePostsScreen}
          options={{
            title: "Створити публікацію",
            tabBarIcon: (focused, size, color) => (
              <Feather name="plus" size={24} color={color} />
            ),
            headerLeft: () => (
              <Feather name="arrow-left" size={24} color="#212121" />
            ),
            headerLeftContainerStyle: { paddingLeft: 16 },
          }}
        />
        <tabNav.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarIcon: (focused, size, color) => (
              <Feather name="user" size={24} color={color} />
            ),
          }}
        />
      </tabNav.Navigator>
    </>
  );
}

// import { createStackNavigator } from "@react-navigation/stack";
// import PostsScreen from "../Screens/nestedScreens/PostsScreen";
// import CommentsScreen from "../Screens/nestedScreens/CommentsScreen"
// import MapScreen from "../Screens/nestedScreens/MapScreen"

// import {
//   Text,
//   TouchableWithoutFeedback,
//   View,
//   Image,
//   TouchableOpacity,
//   KeyboardAvoidingView,
// } from "react-native";

// const NestedScreen = createStackNavigator()

// export default function Home() {
//   return (
//     <NestedScreen.Navigator initialRouteName="PostsScreen">
//       <NestedScreen.Screen name='PostsScreen' component={PostsScreen} />
//       <NestedScreen.Screen name='CommentsScreen' component={CommentsScreen} />
//       <NestedScreen.Screen name='MapScreen' component={MapScreen} />
//     </NestedScreen.Navigator>
//   )
// }
