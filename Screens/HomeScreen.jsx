import React from "react";
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
            headerTitleAlign: "center",
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
