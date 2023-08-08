import React, { useState, useEffect, useRef } from "react";
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
  Button,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export default function CreatePostsScreen() {
  // const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  // const [type, setType] = useState(Camera.Constants.Type.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [permissionResponse, requestPermissionMediaLibrary] =
    MediaLibrary.usePermissions();
  const [photo, setPhoto] = useState(null);
  // const [type, setType] = useState(CameraType.back);

  console.log(photo);

  if (!permission) {
    return <Text>LOADING...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.mainContainer}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.useCameraPermissions();
  //     await MediaLibrary.requestPermissionsAsync();

  //     setHasPermission(status === "granted");
  //   })();
  // }, []);

  const takePhoto = async () => {
    const { uri } = await cameraRef.takePictureAsync();
    // console.log(uri);
    setPhoto(uri);
    const asset = await MediaLibrary.createAssetAsync(uri);
    // console.log(asset)
  };

  const deletePhoto = () => {
    setPhoto(null);
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
                  style={styles.addPhotoBoxButton}
                  onPress={takePhoto}
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
                <TouchableOpacity style={styles.photoBoxButton} onPress={deletePhoto}>
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
              ></TextInput>
            </View>
            <TouchableOpacity style={styles.createFormButton}>
              <Text style={styles.createFormButtonText}>Опубліковати</Text>
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
    backgroundColor: "#FFFFFF",
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
