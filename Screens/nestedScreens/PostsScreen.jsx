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
import { useRoute } from "@react-navigation/native";
import ItemPost from "../../components/itemPost";


export default function PostsScreen() {
  const [posts, setPosts] = useState([]);
  const { params } = useRoute();
  

  useEffect(() => {
    if(!params) {
      return
    }
    setPosts(prevState => [...prevState, params])
  }, [params])
  

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
                source={require("../../assets/avatar.png")}
                style={styles.avatarImg}
              />
            </View>
            <View style={styles.userBox}>
              <Text style={styles.nameUser}>Natali Romanova</Text>
              <Text style={styles.emailUser}>email@example.com</Text>
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
  postsBox: {},
  headerBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  avatarBox: {
    marginRight: 8,
  },
  avatarImg: {
    width: 60,
    height: 60,
  },
  userBox: {},
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
