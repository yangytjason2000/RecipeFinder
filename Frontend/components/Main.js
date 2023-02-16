import { StyleSheet, Text, View, Button, ImageBackground, Pressable, TouchableOpacity, Image, Animated } from 'react-native';
import { useState, useRef, useEffect} from 'react';
import { FadeInView } from './FadeInView';
import { styles } from '../styles';
export default function Main({setStatus}) {
  return (
    <FadeInView style={styles.container}>
      <ImageBackground source={require( '../assets/background.png')} style={styles.imageBackground}>     
        <TouchableOpacity onPress={()=>setStatus(1)} style={styles.fridge}>
          <Image source={require( '../assets/fridge.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setStatus(2)} style={styles.recipe}>
          <Image source={require('../assets/recipe.png')}></Image>
        </TouchableOpacity> 
      </ImageBackground>
    </FadeInView>
  );
}