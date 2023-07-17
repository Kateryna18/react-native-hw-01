import React from "react";
import { StyleSheet, View, Text, Image, TextInput, Button } from "react-native";

export default function RegistrationScreen() {
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
            style={[styles.registerFormInput, {marginBottom: 32}]}
            placeholder="Пароль"
            keyboardType="default"
          />
          <Button style={styles.registerFormButton} title="Зареєстуватися" />
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
    width: "100%",
    flex: 1,
    // alignItems: "center",
    // justifyContent: 'center',
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
  },
  registerFormButton: {
    width: 343,
    height: 51,
    padding: '16px, 32px, 16px, 32px',
    backgroundColor: '#FF6C00',
    borderRadius: 100,
  },
  registerFormLink: {

  }
});
