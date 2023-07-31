import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";




export default function PostsScreen() {
  return (
    <TouchableWithoutFeedback>
      <View>
        <StatusBar style="auto" />
        <KeyboardAvoidingView>
          <View>
            <Image source={require("../assets/avatar.png")} />
            <Text>Natali Romanova</Text>
            <Text>email@example.com</Text>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
