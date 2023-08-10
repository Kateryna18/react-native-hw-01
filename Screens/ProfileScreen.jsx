import React from "react";
import { StatusBar } from "expo-status-bar";
import { Feather, AntDesign } from "@expo/vector-icons";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  ImageBackground,
} from "react-native";
import bckImage from "../assets/photo-bg.png";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const navigation = useNavigation();

  
  return (
    <TouchableWithoutFeedback>
      <View style={styles.mainContainer}>
        <ImageBackground style={styles.backgroundImg} source={bckImage}>
          <StatusBar style="auto" />
          <KeyboardAvoidingView
            behavior={"padding"}
            style={styles.profileBox}
            keyboardVerticalOffset={32}
          >
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.profileLogoutButton}
                onPress={() => navigation.navigate("Login")}
              >
                <Feather name="log-out"  size={24} color="#BDBDBD" />
              </TouchableOpacity>
            <View style={styles.profileImg}>
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
                style={styles.profileImgButton}
              >
                <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
              </TouchableOpacity>
            </View>
            <Text style={styles.profileTittle}>Natali Romanova</Text>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  backgroundImg: {
    flex: 1,
    paddingTop: 147,
    resizeMode: "cover",
    backgroundColor: "#E8E8E8",
  },
  profileBox: {
    position: "relative",
    flex: 1,
    paddingTop: 92,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  profileLogoutButton: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  profileImg: {
    position: "absolute",
    top: -60,
    alignSelf: "center",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  profileImgButton: {
    position: "absolute",
    top: 81,
    left: 103,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
  },
  profileTittle: {
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

});