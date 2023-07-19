import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function LoginScreen() {
  const [isFocusInput, setIsFocusInput] = useState(false);
  const [isFocused, setIsFocused] = useState({
    login: false,
    email: false,
    password: false,
  });

  const keyBoardHide = () => {
    setIsFocused({
      login: false,
      email: false,
      password: false,
    });
    setIsFocusInput(false);
    Keyboard.dismiss();
  };

  const handleInputFocus = (textInput) => {
    setIsFocused({
      [textInput]: true,
    });
    setIsFocusInput(true);
  };

  return (
    <TouchableWithoutFeedback onPress={keyBoardHide}>
      <ImageBackground
        style={styles.backgroundImg}
        source={require("../assets/photo-bg.png")}
      >
        <StatusBar style="auto" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.loginBox}
        >
          <Text style={styles.loginTittle}>Увійти</Text>
          <View style={styles.registerForm}>
            <TextInput
              style={
                isFocused.email
                  ? [
                      styles.loginFormInput,
                      { borderColor: "#FF6C00", backgroundColor: "#FFFFFF" },
                    ]
                  : styles.loginFormInput
              }
              placeholder="Адреса електронної пошти"
              keyboardType="email-address"
              onFocus={() => {
                handleInputFocus("email");
              }}
              onSubmitEditing={keyBoardHide}
            />
            <View style={styles.passwordInputBox}>
              <TextInput
                style={
                  isFocused.password
                    ? [
                        styles.loginFormInput,
                        {
                          borderColor: "#FF6C00",
                          backgroundColor: "#FFFFFF",
                          marginBottom: 32,
                        },
                      ]
                    : [styles.loginFormInput, { marginBottom: 43 }]
                }
                placeholder="Пароль"
                keyboardType="default"
                secureTextEntry={true}
                onFocus={() => {
                  handleInputFocus("password");
                }}
                onSubmitEditing={keyBoardHide}
              />
              <TouchableOpacity
                style={styles.loginInputButton}
                activeOpacity={0.8}
              >
                <Text style={styles.loginInputText}>Показати</Text>
              </TouchableOpacity>
            </View>
            {!isFocusInput && (
              <View style={{ paddingBottom: 78 }}>
                <TouchableOpacity
                  style={styles.loginBoxButton}
                  activeOpacity={0.8}
                >
                  <Text style={styles.loginButtonText}>Увійти</Text>
                </TouchableOpacity>
                <Text style={styles.loginLink}>Немає акаунту? Зареєструватися</Text>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  backgroundImg: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  loginBox: {
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  loginTittle: {
    paddingTop: 32,
    marginBottom: 32,
    fontFamily: "roboto-m",
    fontSize: 30,
    fontWeight: 500,
    textAlign: "center",
  },
  loginFormInput: {
    height: 50,
    padding: 16,
    marginBottom: 16,
    fontFamily: "roboto-r",
    fontSize: 16,
    fontWeight: 400,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderRadius: 5,
    borderWidth: 1,
  },
   loginInputButton: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  loginInputText: {
    fontFamily: "roboto-r",
    fontSize: 16,
    fontWeight: 400,
    color: "#1B4371",
  },
  loginBoxButton: {
    paddingBottom: 16,
    paddingTop: 16,
    marginBottom: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  loginButtonText: {
    textAlign: "center",
    fontFamily: "roboto-r",
    fontSize: 16,
    fontWeight: 400,
    color: "#FFFFFF",
  },
  loginLink: {
    paddingBottom: 111,
    textAlign: "center",
    fontFamily: "roboto-r",
    fontSize: 16,
    fontWeight: 400,
    color: "#1B4371",
  },
});