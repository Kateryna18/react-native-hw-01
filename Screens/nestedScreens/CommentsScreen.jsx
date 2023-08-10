import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function CommentsScreen() {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.mainContainer}>
        <StatusBar style="auto" />
        <KeyboardAvoidingView behavior={"height"} keyboardVerticalOffset={32}>
          <View style={styles.mainContent}>
            <Image
              source={require("../../assets/avatar.png")}
              style={styles.photoImg}
            />
            <View style={styles.commentsBox}></View>
          </View>
          <View style={styles.commentsInputBox}>
              <TextInput
                style={styles.commentsInput}
                placeholder="Коментувати..."
              />
              <TouchableOpacity style={styles.commentsInputButton}>
                <Feather name="arrow-up" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  mainContent: {
    justifyContent: "flex-end",
    paddingTop: 32,
    paddingBottom: 16,
  },
  photoImg: {
    width: "100%",
    height: 240,
    marginBottom: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  commentsBox: {
    height: 323,
    marginBottom: 31,
    borderWidth: 1,
    borderColor: "red",
  },
  commentsInputBox: {
    position: "relative",
    width: "100%",
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
  },
  commentsInput: {
    color: "#BDBDBD",
    fontSize: 16,
  },
  commentsInputButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 50,
  },
});
