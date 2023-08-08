import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import {
  TouchableOpacity,
} from "react-native";
import PostsScreen from "../Screens/nestedScreens/PostsScreen";
import CreatePostsScreen from "../Screens/CreatePostsScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import { useNavigation } from "@react-navigation/native";

const tabNav = createBottomTabNavigator();

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <>
      <tabNav.Navigator
        initialRouteName="Posts"
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
            headerTitleAlign: "center",
            tabBarIcon: ({focused, size, color: tintColor}) => (
              <Feather name="grid" size={24} color={tintColor} />
            ),
            headerRight: () => (
              <TouchableOpacity>
                <Feather name="log-out" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            ),
            headerRightContainerStyle: { paddingRight: 10 },
          }}
        />
        <tabNav.Screen
          name="Create"
          component={CreatePostsScreen}
          options={{
            title: "Створити публікацію",
            tabBarIcon: ({focused, size, color: tintColor}) => (
              <Feather name="plus" size={24} color={tintColor} />
            ),
            headerLeft: () => (
              <TouchableOpacity 
              onPress={() => navigation.navigate("Posts")}
              >
                <Feather name="arrow-left" size={24} color="#212121"/>
              </TouchableOpacity>
            ),
            headerLeftContainerStyle: { paddingLeft: 16, }
          }}
        />
        <tabNav.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused, size, color: tintColor}) => (
              <Feather name="user" size={24} color={tintColor} />
            ),
          }}
        />
      </tabNav.Navigator>
    </>
  );
}
