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
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import bckImage from "../../assets/photo-bg.png";
import { useNavigation } from "@react-navigation/native";

export default function RegistrationScreen() {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState({
    login: false,
    email: false,
    password: false,
  });
  const [isShowPassword, setShowPassword] = useState(true);
  const navigation = useNavigation();

  const keyBoardHide = () => {
    setIsFocused({
      login: false,
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
      login,
      email,
      password,
    };

    if (!email || !password || !login) {
      Alert.alert("Error", "Всі поля мають бути обов'язково заповнені");
      return;
    }


    console.log(registerData);
    navigation.navigate("Home")
    clearRegisterForm();
  };

  const clearRegisterForm = () => {
    setLogin("");
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
            style={styles.registerBox}
            keyboardVerticalOffset={32}
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
            <View>
              <TextInput
                style={[
                  styles.registerFormInput,
                  styles.registerLoginInput,
                  isFocused.login && {
                    borderColor: "#FF6C00",
                    backgroundColor: "#FFFFFF",
                  },
                ]}
                selectionColor={"#FF6C00"}
                enterKeyHint={"next"}
                placeholder="Логін"
                keyboardType="default"
                onFocus={() => {
                  handleInputFocus("login");
                }}
                onSubmitEditing={keyBoardHide}
                value={login}
                onChangeText={setLogin}
              />
              <TextInput
                style={[
                  styles.registerFormInput,
                  styles.registerEmailInput,
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
                  style={
                    isFocused.password
                      ? [
                          styles.registerFormInput,
                          {
                            borderColor: "#FF6C00",
                            backgroundColor: "#FFFFFF",
                          },
                        ]
                      : [styles.registerFormInput]
                  }
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
                  style={styles.registerInputButton}
                  activeOpacity={0.8}
                  onPress={() => setShowPassword(!isShowPassword)}
                >
                  <Text style={styles.registerInputText}>Показати</Text>
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
              style={styles.registerBoxButton}
              activeOpacity={0.8}
              onPress={handleSubmit}
            >
              <Text style={styles.registerButtonText}>Зареєстуватися</Text>
            </TouchableOpacity>
            <Text style={styles.registerLink}>
              Вже є акаунт?{" "}
              <Text
                style={
                  styles.registerLink
                }
                onPress={() => navigation.navigate("Login")}
              >
                Увійти
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
  registerBox: {
    paddingTop: 92,
    paddingHorizontal: 16,
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
    borderRadius: 20,
  },
  registerButtonIcon: {
    backgroundColor: "white",
  },
  registerTittle: {
    marginBottom: 32,
    fontSize: 30,
    textAlign: "center",
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
  registerFormInput: {
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
  registerLoginInput: {
    marginBottom: 16,
  },
  registerEmailInput: {
    marginBottom: 16,
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
    ...Platform.select({
      ios: {paddingBottom: 78,},
      android: {paddingBottom: 45,},
    })
  },
});
