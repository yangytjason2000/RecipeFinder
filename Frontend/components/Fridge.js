import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ImageBackground, Pressable, TouchableOpacity, Image, Animated} from 'react-native';
import { useState,useRef,useEffect } from 'react';
import { FadeInView } from './FadeInView';
export default function Fridge({setStatus}) {
  return (
    <FadeInView style={styles.container}>
    <ImageBackground source={require( '../assets/background.png')} style={styles.imageBackground}>     
      <TouchableOpacity onPress={()=>setStatus(0)} style={styles.fridge}>
      <Image source={require( '../assets/fridge.png')}></Image>
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
    bottom: '160%',
    left: '25%',
  },
});