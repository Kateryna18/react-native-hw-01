import React, {useState, useEffect} from "react";
import {
  TextInput,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  FlatList,
  Text,
  Keyboard,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { db } from "../../firebase/config";
import { collection, getDocs, doc, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { format } from 'date-fns';
import  { uk }  from 'date-fns/locale';

const convertDateToString = (date) => {
  return format(date, "d MMMM, yyyy | HH:mm", { locale: uk });
};


export default function CommentsScreen({ route }) {
  const { postId, photo } = route.params;
  const { userId, avatar } = useSelector(state => state.auth)
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  const createComment = async () => {
    const date = new Date().getTime();
    try {
      const refPost = doc(db, "posts", postId);

      await addDoc(collection(refPost, 'comments'), {comment, userId, avatar, date})
    } catch (error) {
      console.log(error)
    }
  }

  const getComments = async () => {
    try {
      const comments = [];
      const refPost = doc(db, "posts", postId);

      const snapshot = await getDocs(collection(refPost, 'comments'));
      snapshot.forEach((doc) => comments.push({ ...doc.data(), id: doc.id }));

      const sortedCommentsByDate = comments.sort((
        firstComment, secondComment) => firstComment.date - secondComment.date
      );

      setAllComments(sortedCommentsByDate);
      
    } catch (error) {
      console.log(error);
    }
  };


  /////////////////////////////////////////////////////
  const renderItem = ({ item }) => {
    return (
    <TouchableOpacity activeOpacity={1} 
    style={{
      ...styles.commentContainer,
      flexDirection: (item.userId === userId) ? "row-reverse" : "row",
    }}>
      <View style={styles.avatar}>
        <Image 
        source={{ uri: item.avatar }} 
        style={{ width: "100%", height: "100%", resizeMode: "cover" }} 
        />
      </View>
      <View style={{
        ...styles.commentInfo,
        borderTopLeftRadius: (item.userId === userId) ? 6 : 0,
        borderTopRightRadius: (item.userId === userId) ? 0 : 6
      }}>
        <Text style={styles.commentText}>{item.comment}</Text>
        <Text style={{
          ...styles.commentDate,
          textAlign: (item.userId === userId) ? "left" : "right",
        }}>
          {convertDateToString(item.date)}
        </Text>
      </View>
    </TouchableOpacity>
  )};
/////////////////////////////////////////////////////

const addComment = () => {
  Keyboard.dismiss();
  createComment();    
  getComments();
  setComment('');
};

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, justifyContent: "flex-end" }}
      behavior={"padding"}
      keyboardVerticalOffset={90}
    >
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          <Image
            source={{ uri: photo }}
            style={styles.photo}
          />
        </View>
        <View style={styles.commentsContainer}>
        <FlatList
            data={allComments}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </View>
        <View style={{ position: "relative" }}>
          <TextInput
            style={styles.input}
            placeholder="Коментувати..."
            placeholderTextColor="#BDBDBD"
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={addComment} disabled={comment === ""}>
            <Feather name="arrow-up" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    gap: 32,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    justifyContent: "flex-end"
  },

  photoContainer: {
    marginTop: 32,
    width: "100%",
    height: 240,
    borderRadius: 8,
    overflow: "hidden",
  },

  photo: {
    width: "100%",
    height: "100%",
    resizeMode: 'cover',
  },

  commentsContainer: {
    flex: 1,
  },

  commentContainer: {    
    gap: 16,
    marginBottom: 24
  },

  avatar: {
    width: 28,
    height: 28,
    backgroundColor: "blue",
    borderRadius: 50,
    overflow: "hidden"
  },

  commentInfo: {
    flex: 1,
    gap: 8,
    padding: 16,
    borderRadius: 6,
    borderTopLeftRadius: 0,
    backgroundColor: "rgba(0, 0, 0, 0.03)"
  },

  commentText: {
    color: "#212121",
    fontFamily: "roboto-r",
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 18,
  },

  commentDate: {
    color: "#BDBDBD",
    fontFamily: "roboto-r",
    fontSize: 10,
  },

  input: {
    padding: 16,
    paddingRight: 60,
    marginBottom: 16,
    textAlign: 'left',
    fontFamily: "roboto-r",
    fontSize: 16,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#E8E8E8"
  },

  btn: {
    position: "absolute",
    top: 15,
    right: 16,
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },

});

