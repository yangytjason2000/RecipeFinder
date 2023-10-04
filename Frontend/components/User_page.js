import { StyleSheet, Text, View, Alert, TouchableOpacity, Image, Animated, SafeAreaView } from 'react-native';
import { useState, useRef, useEffect} from 'react';
import Amplify,{ Auth } from 'aws-amplify';
import { styles } from '../styles';
import { getFood } from './getFood';
import { getRecipe } from './getRecipe';
import { useSignIn } from '../context/signInContext';
import { useDispatch } from 'react-redux';
import { changeFoodList } from '../reducers/foodListReducer';
import { changeRecipeList } from '../reducers/recipeListReducer';
export default function User_page({navigation}) {
  const {signedIn,setSignedIn} = useSignIn();
  const dispatch = useDispatch();
  useEffect(()=>{
    const confirmSignedIn = async() => {
      try {
        await Auth.currentAuthenticatedUser()
        .then(()=>{setSignedIn(true);getFood(dispatch);getRecipe(dispatch);})
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
      onPress={()=>signOut(setSignedIn,dispatch)}>
        <Text style={styles.textStyle}>Sign out</Text>
      </TouchableOpacity>}
    </View>
  );
}
async function signOut(setSignedIn,dispatch) {
  try {
      await Auth.signOut({ global: true })
      .then(()=>{setSignedIn(false);dispatch(changeFoodList([]));dispatch(changeRecipeList([]));});
  } catch (error) {
      Alert.alert('Sign out error',error.message, [{ text: 'Ok' }]);
  }
}