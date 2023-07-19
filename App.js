// import React from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, ImageBackground, Platform, KeyboardAvoidingView, View } from 'react-native';
// import RegistrationScreen from './Screens/RegistrationScreen';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <ImageBackground style={styles.backgroundImg} source={require("./assets/photo-bg.png")}>
//       <StatusBar style="auto" />
//       <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//           <RegistrationScreen/>
//       </KeyboardAvoidingView>
//       </ImageBackground>
//     </View>
//   );
// }

import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Ionicons from "@expo/vector-icons/Ionicons";

const fonts = async () => {
  await Font.loadAsync({
    "roboto-r": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-m": require("./assets/fonts/Roboto-Medium.ttf"),
  });
};

export default function App() {
  const [isReadyfont, setIsReadyfont] = useState(false);
  const [isFocusInput, setIsFocusInput] = useState(false);
  const [isFocused, setIsFocused] = useState({
    login: false,
    email: false,
    password: false,
  });
  // console.log(isFocusInput)

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

  if (!isReadyfont) {
    return (
      <AppLoading
        startAsync={fonts}
        onFinish={() => setIsReadyfont(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={keyBoardHide}>
        <ImageBackground
          style={styles.backgroundImg}
          source={require("./assets/photo-bg.png")}
        >
          <StatusBar style="auto" />
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.registerBox}
          >
            <Image
              style={styles.registerImg}
              source={require("./assets/avatar.png")}
            />
            <Text style={styles.registerTittle}>Реєстрація</Text>
            <View style={styles.registerForm}>
              <TextInput
                style={
                  isFocused.login
                    ? [
                        styles.registerFormInput,
                        { borderColor: "#FF6C00", backgroundColor: "#FFFFFF" },
                      ]
                    : styles.registerFormInput
                }
                placeholder="Логін"
                keyboardType="default"
                onFocus={() => {
                  handleInputFocus("login");
                }}
                onSubmitEditing={keyBoardHide}
              />
              <TextInput
                style={
                  isFocused.email
                    ? [
                        styles.registerFormInput,
                        { borderColor: "#FF6C00", backgroundColor: "#FFFFFF" },
                      ]
                    : styles.registerFormInput
                }
                placeholder="Адреса електронної пошти"
                keyboardType="email-address"
                onFocus={() => {
                  handleInputFocus("email");
                }}
                onSubmitEditing={keyBoardHide}
              />
              <TextInput
              style={isFocused.password ? [styles.registerFormInput, { borderColor: "#FF6C00", backgroundColor: "#FFFFFF", marginBottom: 32 },]: [styles.registerFormInput, { marginBottom: 43}]}
                placeholder="Пароль"
                keyboardType="default"
                secureTextEntry={true}
                onFocus={() => {
                  handleInputFocus("password");
                }}
                onSubmitEditing={keyBoardHide}
              />
              {!isFocusInput && (
                <View style={{ paddingBottom: 78 }}>
                  <TouchableOpacity
                    style={styles.registerBoxButton}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.registerButtonText}>
                      Зареєстуватися
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.registerLink}>Вже є акаунт? Увійти</Text>
                </View>
              )}
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8E8E8",
  },
  backgroundImg: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  registerBox: {
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  registerImg: {
    position: "absolute",
    top: -60,
    alignSelf: "center",
  },
  registerTittle: {
    paddingTop: 92,
    marginBottom: 32,
    fontFamily: "roboto-m",
    fontSize: 30,
    fontWeight: 500,
    textAlign: "center",
  },
  registerForm: {},
  registerFormInput: {
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
  registerBoxButton: {
    paddingBottom: 16,
    paddingTop: 16,
    marginBottom: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  registerButtonText: {
    textAlign: "center",
    fontFamily: "roboto-r",
    fontSize: 16,
    fontWeight: 400,
    color: "#FFFFFF",
  },
  registerLink: {
    textAlign: "center",
    fontFamily: "roboto-r",
    fontSize: 16,
    fontWeight: 400,
    color: "#1B4371",
  },
});
