import React from "react";
import { StatusBar } from "expo-status-bar";
import { FontAwesome, Feather } from "@expo/vector-icons";
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

export default function CreatePostsScreen() {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.mainContainer}>
        <StatusBar style="auto" />
        <KeyboardAvoidingView
          behavior={"padding"}
          style={styles.createBox}
          keyboardVerticalOffset={32}
        >
          <View style={styles.createFormBox}>
            <View style={styles.photoBox}>
              <View style={styles.photoBoxField}>
                <Image style={styles.photoImg} />
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.addPhotoBoxButton}
                >
                  <FontAwesome
                    name="camera"
                    style={styles.addPhotoIcon}
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.photoBoxButton}>
                <Text style={styles.photoBoxButtonText}>Завантажте фото</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.createFormLabel}>
              <TextInput
                style={styles.createFormInput}
                placeholder="Назва..."
              ></TextInput>
            </View>
            <View style={styles.createFormLabel}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.mapButton}
              >
                <Feather style={styles.mapButtonIcon} name="map-pin" size={24} color="#BDBDBD" />
              </TouchableOpacity>
              <TextInput
                style={[styles.createFormInput, {paddingLeft: 28,}]}
                placeholder="Місцевість..."
              ></TextInput>
            </View>
            <TouchableOpacity style={styles.createFormButton}>
              <Text style={styles.createFormButtonText}>Опубліковати</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonDeleteBox}>
          <TouchableOpacity style={styles.buttonDelete}>
          <FontAwesome style={styles.buttonDeleteIcon} name="trash-o" size={24} color="#BDBDBD" />
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
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  createBox: {
    flex: 1,
    justifyContent: "space-between",
  },
  createFormBox: {},
  photoBox: {
    marginBottom: 32,
  },
  photoBoxField: {
    position: "relative",
    width: "100%",
    height: 240,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  photoImg: {},
  addPhotoBoxButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: "50%",
  },
  addPhotoIcon: {
    color: "#BDBDBD",
  },
  photoBoxButton: {},
  photoBoxButtonText: {
    fontFamily: "roboto-r",
    fontWeight: 400,
    fontSize: 16,
    color: "#BDBDBD",
  },
  createFormLabel: {
    position: "relative",
    justifyContent: "center",
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  createFormInput: {
    paddingVertical: 16,
    fontFamily: "roboto-r",
    fontSize: 16,
  },
  mapButton: {
    position: "absolute",
  },
  mapButtonIcon: {},
  createFormButton: {
    width: "100%",
    marginTop: 32,
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
  },
  createFormButtonText: {
    fontFamily: "roboto-r",
    fontSize: 16,
    color: "#BDBDBD",
  },
  buttonDeleteBox: {
    alignItems: "center",
  },
  buttonDelete: {
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
  buttonDeleteIcon: {},
});
