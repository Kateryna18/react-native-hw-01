// import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RegistrationScreen from './Screens/RegistrationScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <RegistrationScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 263,
    backgroundColor: 'pink',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
