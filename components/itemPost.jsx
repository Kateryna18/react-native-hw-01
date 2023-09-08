import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  doc,
} from "firebase/firestore";

export default function ItemPost({ post, isProfile = false }) {
  const navigation = useNavigation();
  const [counter, setCounter] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const { photo, title, location, geoLocation, id } = post;

  useEffect(() => {
    getNumberOfComments(id);
  }, []);

  const getNumberOfComments = async (id) => {
    try {
      const allComments = [];

      const refPost = doc(db, "posts", id);      
      const snapshot = await getDocs(collection(refPost, "comments"));
      snapshot.forEach((doc) => allComments.push({ ...doc.data() }))

      setCounter(allComments.length);     
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikePress = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
      setIsLiked(false);
    } else {
      setLikeCount(likeCount + 1);
      setIsLiked(true);
    }
  };


  return (
    <TouchableWithoutFeedback>
      <View style={styles.itemPost}>
        <Image style={styles.photoImg} source={{ uri: photo }} />
        <Text style={styles.itemTitle}>{title}</Text>
        <View style={styles.itemInfoBox}>
          <View style={styles.statistics}>
          <TouchableOpacity
            style={styles.itemInfoButton}
            onPress={() => {
              navigation.navigate("CommentsScreen", { postId: id, photo });
            }}
          >
            <Feather
              name="message-circle"
              size={24}
              color={(counter > 0) ? "#FF6C00" : "#BDBDBD"}
              style={styles.itemInfoButtonIcon}
            />
            <Text style={[styles.itemInfoButtonText, { color: (counter > 0) ? "#212121" : "#BDBDBD", }]}>
              {counter}
            </Text>
          </TouchableOpacity>
          {isProfile && (
            <TouchableOpacity
              style={styles.itemInfoButton}
              onPress={handleLikePress}
            >
              <AntDesign name="like2" size={24} color={(likeCount > 0) ? "#FF6C00" : "#BDBDBD"} style={styles.itemInfoButtonIcon}/>
              <Text style={[styles.itemInfoButtonText, { color: (likeCount > 0) ? "#212121" : "#BDBDBD", }]}>
                {likeCount}
              </Text>
            </TouchableOpacity>
          )}
          </View>
          <TouchableOpacity
            style={styles.itemInfoButton}
            onPress={() => {
              navigation.navigate("MapScreen", { geoLocation, title });
            }}
          >
            <Feather
              name="map-pin"
              size={24}
              color="#BDBDBD"
              style={styles.itemInfoButtonIcon}
            />
            <Text
              style={[
                styles.itemInfoButtonText,
                { color: "#212121", textDecorationLine: "underline" },
              ]}
            >
              {location}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  itemPost: {
    marginBottom: 32,
  },
  photoImg: {
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
  itemTitle: {
    marginBottom: 8,
  },
  itemInfoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemInfoButton: {
    flexDirection: "row",
  },
  itemInfoButtonIcon: {
    marginRight: 6,
  },
  itemInfoButtonText: {
    fontSize: 16,
  },
  statistics: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  }
});
