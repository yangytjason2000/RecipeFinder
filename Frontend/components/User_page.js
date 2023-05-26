import { StyleSheet, Text, View, Alert, TouchableOpacity, Image, Animated, SafeAreaView } from 'react-native';
import { useState, useRef, useEffect} from 'react';
import Amplify,{ Auth } from 'aws-amplify';
import { styles } from '../styles';
import LoginModal from './LoginModal';
import store from './store';
import { getFood } from './getFood';
import { getRecipe } from './getRecipe';
export default function User_page({navigation}) {
  const [loginModalVisible,setLoginModalVisible] = useState(false);
  const [signupModalVisible,setSignupModalVisible] = useState(false);
  const [foodList, setFoodList] = store.useState("foodList");
  const [recipeList,setRecipeList] = store.useState("recipeList");
  const [signedIn,setSignedIn] = store.useState("signedIn");
  useEffect(()=>{
    const confirmSignedIn = async() => {
      try {
        await Auth.currentAuthenticatedUser()
        .then(()=>{setSignedIn(true);getFood(setFoodList);getRecipe(setRecipeList);})
      } catch {
        setSignedIn(false);
      }
    }
    confirmSignedIn();
    },[])
  const navigateToFridge= () => {
    navigation.navigate('Sign in Page');
  }
  return (
    <View style={styles.mainBackground}>  
      {!signedIn && <TouchableOpacity style={[styles.signInButton,styles.buttonClose]} onPress={()=>navigateToFridge()}>
        <Text style={styles.textStyle}>Sign in</Text>
      </TouchableOpacity>}
      {signedIn && <TouchableOpacity style={[styles.signInButton,styles.signOutButton]} 
      onPress={()=>signOut(setSignedIn,setFoodList,setRecipeList)}>
        <Text style={styles.textStyle}>Sign out</Text>
      </TouchableOpacity>}
    </View>
  );
}
async function signOut(setSignedIn,setFoodList,setRecipeList) {
  try {
      await Auth.signOut({ global: true })
      .then(()=>{setSignedIn(false);setFoodList([]);setRecipeList([]);});
  } catch (error) {
      Alert.alert('Sign out error',error.message, [{ text: 'Ok' }]);
  }
}