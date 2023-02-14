import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ImageBackground, Pressable, TouchableHighlight, Image } from 'react-native';
import { useState } from 'react';
export default function Fridge() {
  const [counter, setCounter] = useState(0);
  const onPress = ()=>setCounter(counter+1);
  return (
    <View style={styles.container}>
    <TouchableHighlight onPress={onPress}>
      <Image source={require( '../assets/fridge.png')} style={styles.image}>
      </Image>
      </TouchableHighlight>
      <Text>{`You clicked ${counter} times`}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width:500,
    height:500,
  },
});