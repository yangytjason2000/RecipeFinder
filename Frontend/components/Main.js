import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ImageBackground, Pressable, TouchableHighlight, Image } from 'react-native';
import { useState } from 'react';
export default function Main() {
  const [counter, setCounter] = useState(0);
  const onPress = ()=>setCounter(counter+1);
  return (
    <View style={styles.container}>
      <ImageBackground source={require( '../assets/background.png')} style={styles.imageBackground}>     
      <Pressable onPress={onPress}>
      <Image source={require( '../assets/fridge.png')} style={styles.fridge}>
      </Image>
      <Image source={require('../assets/recipe.png')} style={styles.recipe}></Image>
      </Pressable> 
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  fridge: {
    bottom: '0%',
    left: '5%'
  },
  recipe:{
    bottom: '60%',
    left: '25%',
  }
});