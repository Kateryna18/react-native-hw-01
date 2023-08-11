import React from "react";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ItemPost({post}) {
  const navigation = useNavigation();

  const {photo, title, location, geoLocation} = post;

  return (
    <TouchableWithoutFeedback >
      <View style={styles.itemPost}>
        <Image style={styles.photoImg} source={{ uri: photo }} />
        <Text style={styles.itemTitle}>{title}</Text>
        <View style={styles.itemInfoBox}>
          <TouchableOpacity style={styles.itemInfoButton} onPress={() => {navigation.navigate("CommentsScreen")}} >
            <Feather
              name="message-circle"
              size={24}
              color="#BDBDBD"
              style={styles.itemInfoButtonIcon}
            />
            <Text style={[styles.itemInfoButtonText, { color: "#BDBDBD" }]}>
              0
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemInfoButton} onPress={() => {navigation.navigate("MapScreen", {geoLocation, title})}}>
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
    marginTop: 32,
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
});
