import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CreatePostsScreen from "../CreatePostsScreen";
import ProfileScreen from "../ProfileScreen";
import PostsScreen from "../nestedScreens/PostsScreen";


const tabNav = createBottomTabNavigator();

export default function DefaultScreen() {
  const navigation = useNavigation();

  return (
    <>
      <tabNav.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: "#FF6C00",
          tabBarStyle: {
            height: 83,
            paddingHorizontal: 81,
            paddingVertical: 9,
            paddingBottom: 34,
          },
          tabBarItemStyle: {
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
            // headerShown: false,
            headerTitleAlign: "center",
            tabBarIcon: ({ focused, size, color: tintColor }) => (
              <Feather name="grid" size={24} color={tintColor} />
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Feather name="log-out" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            ),
            headerRightContainerStyle: { paddingRight: 16 },
          }}
        />
        <tabNav.Screen
          name="Create"
          component={CreatePostsScreen}
          options={{
            title: "Створити публікацію",
            tabBarIcon: ({ focused, size, color: tintColor }) => (
              <Feather name="plus" size={24} color={tintColor} />
            ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
                <Feather name="arrow-left" size={24} color="#212121" />
              </TouchableOpacity>
            ),
            headerLeftContainerStyle: { paddingLeft: 16 },
          }}
        />
        <tabNav.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, size, color: tintColor }) => (
              <Feather name="user" size={24} color={tintColor} />
            ),
          }}
        />
      </tabNav.Navigator>
    </>
  );
}
