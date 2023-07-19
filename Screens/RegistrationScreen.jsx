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

export default function RegistrationScreen() {
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
          style={styles.registerBox}
        >
          <View style={styles.registerImg}>
            {/* <Image
            // style={styles.registerImg}
            source={require("../assets/avatar.png")}
          />
          <TouchableOpacity activeOpacity={0.8} style={styles.registerImgButton}>
            <AntDesign name="closecircleo" size={25} color="#E8E8E8" />
          </TouchableOpacity> */}
            {/* ///////////////////////without photo//////////////////// */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.registerImgButton}
            >
              <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
            </TouchableOpacity>
          </View>
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
            <View style={styles.passwordInputBox}>
              <TextInput
                style={
                  isFocused.password
                    ? [
                        styles.registerFormInput,
                        {
                          borderColor: "#FF6C00",
                          backgroundColor: "#FFFFFF",
                          marginBottom: 32,
                        },
                      ]
                    : [styles.registerFormInput, { marginBottom: 43 }]
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
                style={styles.registerInputButton}
                activeOpacity={0.8}
              >
                <Text style={styles.registerInputText}>Показати</Text>
              </TouchableOpacity>
            </View>
            {!isFocusInput && (
              <View style={{ paddingBottom: 78 }}>
                <TouchableOpacity
                  style={styles.registerBoxButton}
                  activeOpacity={0.8}
                >
                  <Text style={styles.registerButtonText}>Зареєстуватися</Text>
                </TouchableOpacity>
                <Text style={styles.registerLink}>Вже є акаунт? Увійти</Text>
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
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  registerImgButton: {
    position: "absolute",
    top: 81,
    left: 103,
    backgroundColor: "#FFFFFF",
    borderRadius: "50%",
  },
  registerButtonIcon: {
    backgroundColor: "white",
  },
  registerTittle: {
    paddingTop: 92,
    marginBottom: 32,
    fontFamily: "roboto-m",
    fontSize: 30,
    fontWeight: 500,
    textAlign: "center",
  },
  passwordInputBox: {},
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
  registerInputButton: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  registerInputText: {
    fontFamily: "roboto-r",
    fontSize: 16,
    fontWeight: 400,
    color: "#1B4371",
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
