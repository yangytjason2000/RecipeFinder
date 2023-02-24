import { StyleSheet, Text, View, Button, ImageBackground, Pressable, TouchableOpacity, Image, Animated } from 'react-native';
import { useState, useRef, useEffect} from 'react';
import { FadeInView } from './FadeInView';
import { styles } from '../styles';
import LoginModal from './LoginModal';
export default function Main({setStatus,setFoodList}) {
  const [loginModalVisible,setLoginModalVisible] = useState(false);
  const [signupModalVisible,setSignupModalVisible] = useState(false);
  const [loggedin,setLoggedin] = useState(false);
  return (
    <FadeInView style={styles.container}>
      <ImageBackground source={require( '../assets/background.png')} style={styles.imageBackground}>     
        <TouchableOpacity onPress={()=>setStatus(1)} style={styles.fridge}>
          <Image source={require( '../assets/fridge.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setStatus(2)} style={styles.recipe}>
          <Image source={require('../assets/recipe.png')}></Image>
        </TouchableOpacity> 
        <LoginModal modalVisible={loginModalVisible} 
        setModalVisible={setLoginModalVisible} setSignupModalVisible={setSignupModalVisible} setFoodList={setFoodList}/>
        <LoginModal modalVisible={signupModalVisible} 
        setModalVisible={setSignupModalVisible} setSignupModalVisible={setSignupModalVisible} 
        setFoodList={setFoodList} loginFlag={false}/>
        <TouchableOpacity style={[styles.button,styles.buttonClose]} onPress={()=>setLoginModalVisible(true)}>
          <Text style={styles.textStyle}>Login</Text>
        </TouchableOpacity> 
      </ImageBackground>
    </FadeInView>
  );
}