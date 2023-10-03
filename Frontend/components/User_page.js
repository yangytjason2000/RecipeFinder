import { StyleSheet, Text, View, Alert, TouchableOpacity, Image, Animated, SafeAreaView } from 'react-native';
import { useState, useRef, useEffect} from 'react';
import Amplify,{ Auth } from 'aws-amplify';
import { styles } from '../styles';
import LoginModal from './LoginModal';
import store from './store';
import { getFood } from './getFood';
import { getRecipe } from './getRecipe';
import { useSignIn } from '../context/signInContext';
import { useDispatch } from 'react-redux';
import { changeFoodList } from '../reducers/foodListReducer';
export default function User_page({navigation}) {
  const [recipeList,setRecipeList] = store.useState("recipeList");
  const {signedIn,setSignedIn} = useSignIn();
  const dispatch = useDispatch();
  useEffect(()=>{
    const confirmSignedIn = async() => {
      try {
        await Auth.currentAuthenticatedUser()
        .then(()=>{setSignedIn(true);getFood(dispatch);getRecipe(setRecipeList);})
      } catch {
        setSignedIn(false);
      }
    }
    confirmSignedIn();
    },[])
  const navigateToSignIn= () => {
    navigation.navigate('Sign in Page');
  }
  return (
    <View style={styles.mainBackground}>  
      {!signedIn && <TouchableOpacity style={[styles.signInButton,styles.buttonClose]} onPress={()=>navigateToSignIn()}>
        <Text style={styles.textStyle}>Sign in</Text>
      </TouchableOpacity>}
      {signedIn && <TouchableOpacity style={[styles.signInButton,styles.signOutButton]} 
      onPress={()=>signOut(setSignedIn,dispatch,setRecipeList)}>
        <Text style={styles.textStyle}>Sign out</Text>
      </TouchableOpacity>}
    </View>
  );
}
async function signOut(setSignedIn,dispatch,setRecipeList) {
  try {
      await Auth.signOut({ global: true })
      .then(()=>{setSignedIn(false);dispatch(changeFoodList([]));setRecipeList([]);});
  } catch (error) {
      Alert.alert('Sign out error',error.message, [{ text: 'Ok' }]);
  }
}