import React from "react";
import {
  TextInput,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function CommentsScreen() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, justifyContent: "flex-end" }}
      behavior={Platform.OS === "ios" ? "padding" : "heigth"}
    >
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          <Image
            source={require("../../assets/avatar.png")}
            style={styles.photo}
          />
        </View>
        <View style={styles.commentsContainer}>
          <FlatList />
        </View>
        <View style={{ position: "relative" }}>
          <TextInput
            style={styles.input}
            placeholder="Коментувати..."
            placeholderTextColor="#BDBDBD"
          />
          <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
            <Feather name="arrow-up" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    gap: 32,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    justifyContent: "flex-end",
  },
  photoContainer: {
    marginTop: 32,
    width: "100%",
    height: 240,
    borderRadius: 8,
    overflow: "hidden",
  },
  photo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  commentsContainer: {
    flex: 1,
  },
  input: {
    padding: 16,
    marginBottom: 16,
    textAlign: "left",
    fontFamily: "roboto-r",
    fontSize: 16,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#E8E8E8",
  },
  btn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
