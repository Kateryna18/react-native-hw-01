// import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, View } from 'react-native';
import RegistrationScreen from './Screens/RegistrationScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.backgroundImg} source={require("./assets/photo-bg.png")}>
      <StatusBar style="auto" />
      <RegistrationScreen/>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E8E8',
  },
  backgroundImg: {
    flex: 1,
    resizeMode: 'cover',
    paddingTop: 263,

  },
});
