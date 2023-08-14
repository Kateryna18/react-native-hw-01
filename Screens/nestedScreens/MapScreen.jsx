import React from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRoute } from "@react-navigation/native";

export default function MapScreen() {
  const {
    params: { geoLocation, title },
  } = useRoute();

  return (
    <View style={styles.mainContainer}>
      <MapView
        style={styles.mapStyle}
        region={
          geoLocation && {
            latitude: geoLocation.latitude,
            longitude: geoLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
        }
      >
        <Marker
          title={title}
          coordinate={
            geoLocation && {
              latitude: geoLocation.latitude,
              longitude: geoLocation.longitude,
            }
          }
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
