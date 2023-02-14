import { StyleSheet, Text, View, Button, ImageBackground, Pressable, TouchableOpacity, Image, Animated } from 'react-native';
import { useState, useRef, useEffect} from 'react';
import { FadeInView } from './FadeInView';
import { styles } from '../styles';
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
