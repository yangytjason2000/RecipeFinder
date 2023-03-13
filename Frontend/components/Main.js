import { StyleSheet, Text, View,ImageBackground, TouchableOpacity, Image, Animated, SafeAreaView } from 'react-native';
import { useState, useRef, useEffect} from 'react';
import { FadeInView } from './FadeInView';
import Amplify,{ Auth } from 'aws-amplify';
import { styles } from '../styles';
import LoginModal from './LoginModal';
export default function Main({setStatus,setFoodList,setRecipeList,signedIn,setSignedIn}) {
  const [loginModalVisible,setLoginModalVisible] = useState(false);
  const [signupModalVisible,setSignupModalVisible] = useState(false);
  return (
    <FadeInView style={styles.container}>
      <ImageBackground source={require( '../assets/background.png')} style={styles.imageBackground}>     
        <TouchableOpacity onPress={()=>setStatus(1)} style={styles.fridge}>
          <Image source={require( '../assets/fridge.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setStatus(2)} style={styles.recipe}>
          <Image source={require('../assets/recipe.png')}></Image>
        </TouchableOpacity> 
        {!signedIn && <LoginModal modalVisible={loginModalVisible} 
        setModalVisible={setLoginModalVisible} setSignupModalVisible={setSignupModalVisible} 
        setFoodList={setFoodList} setRecipeList={setRecipeList} setSignedIn={setSignedIn}/>}
        {!signedIn && <LoginModal modalVisible={signupModalVisible} 
        setModalVisible={setSignupModalVisible} setSignupModalVisible={setSignupModalVisible} 
        setFoodList={setFoodList} setRecipeList={setRecipeList} setSignedIn={setSignedIn} loginFlag={false}/>}
        {!signedIn && <TouchableOpacity style={[styles.button,styles.buttonClose]} onPress={()=>setLoginModalVisible(true)}>
          <Text style={styles.textStyle}>Sign in</Text>
        </TouchableOpacity>}
        {signedIn && <TouchableOpacity style={[styles.button,styles.buttonClose]} onPress={()=>signOut(setSignedIn)}>
          <Text style={styles.textStyle}>Sign out</Text>
        </TouchableOpacity>}
      </ImageBackground>
    </FadeInView>
  );
}
async function signOut(setSignedIn) {
  try {
      await Auth.signOut({ global: true })
      .then(response=>setSignedIn(false));
  } catch (error) {
      console.log('error signing out: ', error);
  }
}