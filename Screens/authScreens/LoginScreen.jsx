import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Alert,
} from "react-native";
import bckImage from "../../assets/photo-bg.png";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });
  const [isShowPassword, setShowPassword] = useState(true);
  const navigation = useNavigation();

  const keyBoardHide = () => {
    setIsFocused({
      email: false,
      password: false,
    });
    Keyboard.dismiss();
  };

  const handleInputFocus = (textInput) => {
    setIsFocused({
      [textInput]: true,
    });
  };

  const handleSubmit = () => {
    const registerData = {
      email,
      password,
    };

    if (!email || !password) {
      Alert.alert("Error", "Всі поля мають бути обов'язково заповнені");
      return;
    }

    console.log(registerData);
    navigation.navigate("Home")
    clearRegisterForm();
  };

  const clearRegisterForm = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <TouchableWithoutFeedback onPress={keyBoardHide}>
      <View style={styles.mainContainer}>
        <ImageBackground style={styles.backgroundImg} source={bckImage}>
          <StatusBar style="auto" />
          <KeyboardAvoidingView
            behavior={"padding"}
            style={styles.loginBox}
            keyboardVerticalOffset={32}
          >
            <Text style={styles.loginTittle}>Увійти</Text>
            <View>
              <TextInput
                style={[
                  styles.loginFormInput,
                  styles.loginEmailInput,
                  isFocused.email && {
                    borderColor: "#FF6C00",
                    backgroundColor: "#FFFFFF",
                  },
                ]}
                selectionColor={"#FF6C00"}
                enterKeyHint={"next"}
                placeholder="Адреса електронної пошти"
                keyboardType="email-address"
                onFocus={() => {
                  handleInputFocus("email");
                }}
                onSubmitEditing={keyBoardHide}
                value={email}
                onChangeText={setEmail}
              />
              <View style={styles.passwordInputBox}>
                <TextInput
                  style={[
                    styles.loginFormInput,
                    isFocused.password && {
                      borderColor: "#FF6C00",
                      backgroundColor: "#FFFFFF",
                    },
                  ]}
                  selectionColor={"#FF6C00"}
                  enterKeyHint={"next"}
                  placeholder="Пароль"
                  keyboardType="default"
                  secureTextEntry={isShowPassword}
                  onFocus={() => {
                    handleInputFocus("password");
                  }}
                  onSubmitEditing={keyBoardHide}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  style={styles.loginInputButton}
                  activeOpacity={0.8}
                  onPress={() => setShowPassword(!isShowPassword)}
                >
                  <Text style={styles.loginInputText}>Показати</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
          <View
            style={{
              paddingTop: 43,
              paddingBottom: 0,
              backgroundColor: "#FFFFFF",
              paddingHorizontal: 16,
            }}
          >
            <TouchableOpacity
              style={styles.loginBoxButton}
              activeOpacity={0.8}
              onPress={handleSubmit}
            >
              <Text style={styles.loginButtonText}>Увійти</Text>
            </TouchableOpacity>
            <Text style={styles.loginLink}>
              Немає акаунту?{" "}
              <Text
                style={[styles.loginLink, {textDecorationLine: 'underline',}]}
                onPress={() => navigation.navigate("Registration")}
              >
                Зареєструватися
              </Text>
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  backgroundImg: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
    backgroundColor: "#E8E8E8",
  },
  loginBox: {
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  loginTittle: {
    marginBottom: 32,
    textAlign: "center",
    fontSize: 30,
    ...Platform.select({
      ios: {
        fontFamily: "roboto-m",
        fontWeight: "bold",
      },
      android: {
        fontFamily: "Roboto",
        fontWeight: "500",
      },
    }),
  },
  loginFormInput: {
    height: 50,
    padding: 16,
    fontFamily: "roboto-r",
    fontSize: 16,
    fontWeight: "normal",
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderRadius: 5,
    borderWidth: 1,
  },
  loginEmailInput: {
    marginBottom: 16,
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
    paddingBottom: 144,
    textAlign: "center",
    fontFamily: "roboto-r",
    fontSize: 16,
    fontWeight: 400,
    color: "#1B4371",
  },
});
