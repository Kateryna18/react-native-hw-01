import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import PostsScreen from "./Screens/PostsScreen";
import CreatePostsScreen from "./Screens/CreatePostsScreen";
import ProfileScreen from "./Screens/ProfileScreen";

import { AntDesign, Foundation, Ionicons  } from '@expo/vector-icons'; 

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
      <tabNav.Navigator initialRouteName="Posts" screenOptions={{tabBarShowLabel: false, tabBarActiveTintColor: 'white',}} >
        <tabNav.Screen name="Posts" component={PostsScreen} options={{tabBarIcon: (focused, size, color) => <Ionicons name="square" size={24} color={color} />}}/>
        <tabNav.Screen name="Create" component={CreatePostsScreen} options={{tabBarIcon: (focused, size, color) => <AntDesign name="plus" size={24} color={color} />}}/>
        <tabNav.Screen name="Profile" component={ProfileScreen} options={{tabBarIcon: (focused, size, color) => <Foundation name="torso" size={24} color={color} />}}/>
      </tabNav.Navigator>
    );
  };