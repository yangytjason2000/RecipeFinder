import { StyleSheet, Text, View,ImageBackground, TouchableOpacity, Image, Animated, SafeAreaView } from 'react-native';
import { useState, useRef, useEffect} from 'react';
import { FadeInView } from './FadeInView';
import Amplify,{ Auth } from 'aws-amplify';
import { styles } from '../styles';
import LoginModal from './LoginModal';
import { useGlobalState } from 'state-pool';
import store from './store';
export default function Main({navigation}) {
  const [loginModalVisible,setLoginModalVisible] = useState(false);
  const [signupModalVisible,setSignupModalVisible] = useState(false);
  const [status,setStatus]=store.useState("status");
  const [foodList, setFoodList] = store.useState("foodList");
  const [recipeList,setRecipeList] = store.useState("recipeList");
  const [signedIn,setSignedIn] = store.useState("signedIn");
  return (
    <View style={styles.mainBackground}>  
        <TouchableOpacity onPress={()=>navigation.navigate('Fridge')} style={styles.fridge}>
          <Image source={require( '../assets/fridge.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Recipe')} style={styles.recipe}>
          <Image source={require('../assets/recipe.png')}></Image>
        </TouchableOpacity> 
        {!signedIn && <LoginModal modalVisible={loginModalVisible} 
        setModalVisible={setLoginModalVisible} setSignupModalVisible={setSignupModalVisible} 
        setFoodList={setFoodList} setRecipeList={setRecipeList} setSignedIn={setSignedIn}/>}
        {!signedIn && <LoginModal modalVisible={signupModalVisible} 
        setModalVisible={setSignupModalVisible} setSignupModalVisible={setSignupModalVisible} 
        setFoodList={setFoodList} setRecipeList={setRecipeList} setSignedIn={setSignedIn} loginFlag={false}/>}
        {!signedIn && <TouchableOpacity style={[styles.signInButton,styles.buttonClose]} onPress={()=>setLoginModalVisible(true)}>
          <Text style={styles.textStyle}>Sign in</Text>
        </TouchableOpacity>}
        {signedIn && <TouchableOpacity style={[styles.signInButton,styles.buttonClose]} onPress={()=>signOut(setSignedIn)}>
          <Text style={styles.textStyle}>Sign out</Text>
        </TouchableOpacity>}
    </View>
  );
}
async function signOut(setSignedIn) {
  try {
      await Auth.signOut({ global: true })
      .then(response=>setSignedIn(false));
  } catch (error) {
      Alert.alert('Sign out error',error.message, [{ text: 'Ok' }]);
  }
}