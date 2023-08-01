import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";

export default function PostsScreen() {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.mainContainer}>
        <StatusBar style="auto" />
        <KeyboardAvoidingView
        behavior={"padding"}
        style={styles.postsBox}
        keyboardVerticalOffset={32}
        >
          <View style={styles.headerBox}>
            <View style={styles.avatarBox}>
              <Image source={require("../../assets/avatar.png")} style={styles.avatarImg}/>
            </View>
            <View style={styles.userBox}>
                <Text style={styles.nameUser}>Natali Romanova</Text>
                <Text style={styles.emailUser}>email@example.com</Text>
              </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  postsBox: {
    
  },
  headerBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarBox: {
    marginRight: 8,
  },
  avatarImg: {
    width: 60,
    height: 60,
  },
  userBox: {

  },
  nameUser: {
    fontFamily: "roboto-b",
    fontWeight: 700,
    fontSize: 13,
    color: "#212121",
  },
  emailUser: {
    fontFamily: "roboto-r",
    fontWeight: 400,
    fontSize: 11,
    color: "#212121",
  },
})