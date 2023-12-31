import React, { useState, useEffect } from "react";
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
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { nanoid } from "@reduxjs/toolkit";
import { storage, db } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

export default function CreatePostsScreen() {
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [geoLocation, setGeoLocation] = useState(null);
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const { userId, login, email } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      const camera = await Camera.requestCameraPermissionsAsync();
      const location = await Location.requestForegroundPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(
        camera.status === "granted" && location.status === "granted"
      );

      const getLocation = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: getLocation.coords.latitude,
        longitude: getLocation.coords.longitude,
      };
      setGeoLocation(coords);
    })();
  }, []);

  if (!hasPermission) {
    return (
      <View style={styles.mainContainer}>
        <Text style={{ textAlign: "center" }}>
          Нам потрібен ваш дозвіл, щоб показати камеру!
        </Text>
      </View>
    );
  }

  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      if (uri) {
        setPhoto(uri);
      }
      await MediaLibrary.createAssetAsync(uri);
    }
  };

  const deletePhoto = () => {
    setPhoto(null);
  };

  const uploadPhotoToServer = async () => {
    let photoUrl = '';

    const response = await fetch(photo);
    const file = await response.blob();

    const uniquePostId = nanoid();
    const storageRef = ref(storage, `postImage/${uniquePostId}`);

    await uploadBytes(storageRef, file);
    await getDownloadURL(storageRef).then((url) => {
      photoUrl = url;
    });

    return photoUrl;
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();

    try {
      await addDoc(collection(db, "posts"), {
        photo,
        email,
        geoLocation,
        location,
        userId,
        login,
        title,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = () => {
    uploadPostToServer();
    clearPostData();
    navigation.navigate("Posts", 
    );
  };

  const clearPostData = () => {
    setTitle("");
    setLocation("");
    setPhoto(null);
    setGeoLocation(null);
  };

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
              <Camera style={styles.camera} ref={setCameraRef}>
                {photo && (
                  <View style={styles.photoImg}>
                    <Image style={styles.photoImg} source={{ uri: photo }} />
                  </View>
                )}
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[
                    styles.addPhotoBoxButton,
                    photo
                      ? { backgroundColor: "rgba(255, 255, 255, 0.3)" }
                      : { backgroundColor: "#FFFFFF" },
                  ]}
                  onPress={photo ? null : takePhoto}
                >
                  <FontAwesome
                    name="camera"
                    style={styles.addPhotoIcon}
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </Camera>
              {photo ? (
                <TouchableOpacity
                  style={styles.photoBoxButton}
                  onPress={deletePhoto}
                >
                  <Text style={styles.photoBoxButtonText}>Редагувати фото</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.photoBoxButton}>
                  <Text style={styles.photoBoxButtonText}>Завантажте фото</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.createFormLabel}>
              <TextInput
                style={styles.createFormInput}
                placeholder="Назва..."
                enterKeyHint={"next"}
                value={title}
                onChangeText={setTitle}
              ></TextInput>
            </View>
            <View style={styles.createFormLabel}>
              <TouchableOpacity activeOpacity={0.8} style={styles.mapButton}>
                <Feather
                  style={styles.mapButtonIcon}
                  name="map-pin"
                  size={24}
                  color="#BDBDBD"
                />
              </TouchableOpacity>
              <TextInput
                style={[styles.createFormInput, { paddingLeft: 28 }]}
                placeholder="Місцевість..."
                enterKeyHint={"next"}
                value={location}
                onChangeText={setLocation}
              ></TextInput>
            </View>
            <TouchableOpacity
              style={[
                styles.createFormButton,
                photo || title || location
                  ? { backgroundColor: "#FF6C00" }
                  : { backgroundColor: "#F6F6F6" },
              ]}
              onPress={photo || title || location ? handleSubmit : null}
            >
              <Text
                style={[
                  styles.createFormButtonText,
                  photo || title || location
                    ? { color: "#FFFFFF" }
                    : { color: "#BDBDBD" },
                ]}
              >
                Опубліковати
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonDeleteBox}>
            <TouchableOpacity style={styles.buttonDelete}>
              <FontAwesome
                style={styles.buttonDeleteIcon}
                name="trash-o"
                size={24}
                color="#BDBDBD"
              />
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
  camera: {
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
  photoImg: {
    width: "100%",
    height: "100%",
  },
  addPhotoBoxButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
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
    borderRadius: 100,
  },
  createFormButtonText: {
    fontFamily: "roboto-r",
    fontSize: 16,
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
