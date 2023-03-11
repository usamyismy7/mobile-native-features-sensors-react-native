import React from 'react';
import { ScrollView, StyleSheet, Text, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import { Pedometer, DeviceMotion } from 'expo-sensors';

async function camera() {
  let cameras = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    })
}

async function gallery() {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4,3],
    quality: 1,
  })
}

async function audio() {
  const sound = new Audio.Sound();
  try{
    await sound.loadAsync(require('./assets/x.mp3'));
    await sound.playAsync();
  }
  catch(error) {
    //An error occurred!
  }
}

async function pedometers(){
  await Pedometer.isAvailableAsync();
  await Pedometer.getPermissionsAsync();
  await Pedometer.requestPermissionsAsync();
  await Pedometer.getStepCountAsync(1,10);
  await Pedometer.watchStepCount(callback);
}

async function motion() {
  await DeviceMotion.isAvailableAsync();
  await DeviceMotion.addListener(listener);
  await DeviceMotion.setUpdateInterval(10);
}

export default function App() {
  return(
  <ScrollView style={styles.container}>
    <Text style={styles.h1}>Mobile Native Features & Sensors</Text>
    <Text style={styles.h3}>1. Using the device Camera</Text>
    <Button title="Open Camera" onPress={()=>camera()} />

    <Text style={styles.h3}>2. Selecting images from Gallery</Text>
    <Button title="Open Gallery" onPress={()=>gallery()} />

    <Text style={styles.h3}>3. Play sound with Audio</Text>
    <Button title="Play Audio" onPress={()=>audio()} />

    <Text style={styles.h3}>4. Using Pedometer sensor</Text>
    <Button title="Sensor" onPress={()=>pedometers()} />

    <Text style={styles.h3}>5. Using DeviceMotion sensor</Text>
    <Button title="Sensor" onPress={()=>motion()} />
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
  },
  h1: {
    marginVertical: 20,
  },
  h3: {
    marginTop: 30,
    marginVertical: 10,
  }
})