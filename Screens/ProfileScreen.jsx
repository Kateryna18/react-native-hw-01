import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Feather, AntDesign } from "@expo/vector-icons";
import { nanoid } from "@reduxjs/toolkit";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  ImageBackground,
  FlatList,
} from "react-native";
import bckImage from "../assets/photo-bg.png";
import { useSelector, useDispatch } from "react-redux";
import {
  authSighOut,
  authUpdateUserAvatar,
  authDeleteUserAvatar,
} from "../redux/auth/authOperations";
import { db, storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import ItemPost from "../components/itemPost";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { login, avatar, userId } = useSelector((state) => state.auth);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    getUserPosts();

    const timerId = setInterval(() => {
      getUserPosts();
    }, 30000);

    return () => clearInterval(timerId);
  }, []);

  const getUserPosts = async () => {
    try {
      const posts = [];

      const q = query(collection(db, "posts"), where("userId", "==", userId));
      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => posts.push({ ...doc.data(), id: doc.id }));

      setUserPosts(posts);
    } catch (error) {
      console.log(error);
    }
  };

  const pickAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      delete result.cancelled;
      return result.assets[0].uri;
    }
  };

  const uploadAvatarToServer = async () => {
    let avatarUrl = await pickAvatar();

    const response = await fetch(avatarUrl);
    const file = await response.blob();
    const uniqueAvatarId = nanoid();

    const storageRef = ref(storage, `avatarImage/${uniqueAvatarId}`);

    await uploadBytes(storageRef, file);
    await getDownloadURL(storageRef).then((url) => {
      avatarUrl = url;
    });

    const snapshotPosts = await getDocs(collection(db, "posts"));

    snapshotPosts.forEach(async (post) => {
      const refPost = doc(db, "posts", post.id);
      const snapshotComments = await getDocs(collection(refPost, "comments"));

      snapshotComments.forEach(async (comment) => {
        const refComment = doc(refPost, "comments", comment.id);

        if (comment.data().userId === userId) {
          await updateDoc(refComment, { avatar: avatarUrl });
        }
      });
    });

    dispatch(authUpdateUserAvatar({ avatarUrl }));
  };

  const clearAvatar = async () => {
    dispatch(authDeleteUserAvatar());

    const snapshotPosts = await getDocs(collection(db, 'posts'));

    snapshotPosts.forEach(async (post) => {
      const refPost = doc(db, "posts", post.id);

      const snapshotComments = await getDocs(collection(refPost, 'comments'));

      snapshotComments.forEach(async (comment) => {
        const refComment = doc(refPost, "comments", comment.id);

        if (comment.data().userId === userId) {
          await updateDoc(refComment, { avatar: null });
        };
      })
    })
  };

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
              onPress={() => dispatch(authSighOut())}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
            <View style={styles.profileImg}>
              {avatar && (
                <Image
                  style={styles.avatar}
                  source={{ uri: avatar }}
                />
              )}
              {avatar ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.registerImgButton}
                  onPress={clearAvatar}
                >
                  <AntDesign name="closecircleo" size={25} color="#E8E8E8" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.profileImgButton}
                  onPress={uploadAvatarToServer}
                >
                  <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.profileTittle}>{login}</Text>
            <View>
              <FlatList
                data={userPosts}
                renderItem={({ item }) => (
                  <ItemPost post={item} isProfile={true} />
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          </KeyboardAvoidingView>
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
  avatar: {
    height: "100%",
    width: "100%",
    borderRadius: 16,
    resizeMode: "cover",
  },
  registerImgButton: {
    position: "absolute",
    top: 81,
    left: 103,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
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
