import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import PostsScreen from "./Screens/PostsScreen";
import CreatePostsScreen from "./Screens/CreatePostsScreen";
import ProfileScreen from "./Screens/ProfileScreen";

const authNav = createStackNavigator();
const tabNav = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
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
          name="PostsScreen"
          component={PostsScreen}
          options={{ title: "Публікації" }}
        />
      </authNav.Navigator>
    );
  }

  return (
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
            <Feather name="log-out"  size={24} color="#BDBDBD" />
          ),
          headerRightContainerStyle: {paddingRight: 10},
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
            <Feather name="arrow-left"  size={24} color="#212121" />
          ),
          headerLeftContainerStyle: {paddingLeft: 16},
        }}
      />
      <tabNav.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          // headerShown: false,
          tabBarIcon: (focused, size, color) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />
    </tabNav.Navigator>
  );
};
