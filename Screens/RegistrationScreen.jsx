import React from "react";
import { Platform, StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Button } from "react-native";

export default function RegistrationScreen() {
    console.log(Platform.OS)
  return (
    <View style={styles.registerBox}>
      <View style={styles.contentContainer}>
        <Image
          style={styles.registerImg}
          source={require("../assets/avatar.png")}
        />
        <Text style={styles.registerTittle}>Реєстрація</Text>
        <View style={styles.registerForm}>
          <TextInput
            style={styles.registerFormInput}
            placeholder="Логін"
            keyboardType="default"
          />
          <TextInput
            style={styles.registerFormInput}
            placeholder="Адреса електронної пошти"
            keyboardType="email-address"
          />
          <TextInput
            style={[styles.registerFormInput, {marginBottom: 43}]}
            placeholder="Пароль"
            keyboardType="default"
            secureTextEntry={true}
          />
            <TouchableOpacity style={styles.registerBoxButton} activeOpacity={0.8}>
                <Text style={styles.registerButtonText}>Зареєстуватися</Text>
            </TouchableOpacity>
          <Button
            style={styles.registerFormLink}
            title="Вже є акаунт? Увійти"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  registerBox: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  contentContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 92,
  },
  registerImg: {
    position: "absolute",
    top: -50,
    alignSelf: "center",
  },
  registerTittle: {
    fontSize: 30,
    fontWeight: 500,
    marginBottom: 32,
    textAlign: "center",
  },
  registerForm: {
    // flex: 1,
  },
  registerFormInput: {
    flex: 1,
    width: '100%',
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#F6F6F6',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  registerBoxButton: {
    paddingBottom: 16,
    paddingTop: 16,
    marginBottom: 16,
    backgroundColor: '#FF6C00',
    borderRadius: 100,
  },
  registerButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 400,
    color: '#FFFFFF',
  },
  registerFormLink: {
    fontSize: 16,
  }
});
