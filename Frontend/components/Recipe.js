import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ImageBackground, Pressable, TouchableOpacity, Image, Animated } from 'react-native';
import { useState, useRef, useEffect} from 'react';
import { FadeInView } from './FadeInView';
export default function Recipe({setStatus}) {
  return (
    <FadeInView style={styles.container}>
      <ImageBackground source={require( '../assets/background.png')} style={styles.imageBackground}>     
      <TouchableOpacity onPress={()=>setStatus(0)} style={styles.recipe}>
      <Image source={require('../assets/recipe.png')}></Image>
      </TouchableOpacity> 
      </ImageBackground>
    </FadeInView>
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
    top: '10%',
    left: '5%'
  },
  recipe:{
    top: '0%',
    left: '25%',
  },
});