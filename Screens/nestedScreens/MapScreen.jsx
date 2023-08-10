import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRoute } from "@react-navigation/native";

export default function MapScreen() {
  const { params } = useRoute();
  const {geoLocation, title} = params;

  // console.log("params Map->", params);

  // console.log("params.latitude", geoLocation.latitude);
  // console.log("params.longitude", geoLocation.longitude);

  return (
    <View style={styles.mainContainer}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: geoLocation.latitude,
          longitude: geoLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          title={title}
          coordinate={{ latitude: geoLocation.latitude, longitude: geoLocation.longitude }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  mapStyle: {
    flex: 1,
  },
});
