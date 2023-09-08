import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  FlatList,
} from "react-native";
import ItemPost from "../../components/itemPost";
import { db } from "../../firebase/config";
import { collection, getDocs, doc } from 'firebase/firestore';
import { useSelector } from "react-redux";


export default function PostsScreen() {
  const [posts, setPosts] = useState([]);
  const {login, email, avatar} = useSelector(state => state.auth)
  
  useEffect(() => {
    getAllPosts()

    const timerId = setInterval(() => {
      getAllPosts();
    }, 30000);

    return () => clearInterval(timerId);
  }, [])

  const getAllPosts = async() => {
    try {
      const allPosts = [];

      const snapshot = await getDocs(collection(db, 'posts'));

      snapshot.forEach((doc) => allPosts.push({ ...doc.data(), id: doc.id }));

      setPosts(allPosts);
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <TouchableWithoutFeedback>
      <View style={styles.mainContainer}>
        <StatusBar style="auto" />
        <KeyboardAvoidingView
          behavior={"padding"}
          style={styles.postsBox}
          keyboardVerticalOffset={32}
        >
          <View style={styles.headerBox}>
            <View style={styles.avatarBox}>
              <Image
                source={{uri: avatar}}
                style={styles.avatarImg}
              />
            </View>
            <View style={styles.userBox}>
              <Text style={styles.nameUser}>{login}</Text>
              <Text style={styles.emailUser}>{email}</Text>
            </View>
          </View>
          <FlatList 
          data={posts}
          renderItem={({item}) => <ItemPost post={item} />}
          keyExtractor={(item, index) => index.toString()} 
          />
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 70,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  headerBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  avatarBox: {
    width: 60,
    height: 60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    marginRight: 8,
  },
  avatarImg: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  nameUser: {
    fontFamily: "roboto-b",
    fontWeight: 700,
    fontSize: 13,
    color: "#212121",
  },
  emailUser: {
    fontFamily: "roboto-r",
    fontWeight: 400,
    fontSize: 11,
    color: "#212121",
  },
});
