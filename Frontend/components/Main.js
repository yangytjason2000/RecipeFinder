import { StyleSheet, Text, View, Alert, TouchableOpacity, Image, Animated, SafeAreaView } from 'react-native';
import { useState, useRef, useEffect} from 'react';
import Amplify,{ Auth } from 'aws-amplify';
import { styles } from '../styles';
import LoginModal from './LoginModal';
import store from './store';
import { getFood } from './getFood';
import { getRecipe } from './getRecipe';
export default function Main({navigation}) {
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
  return (
    <View style={styles.mainBackground}>  
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={()=>navigation.navigate('Fridge')} style={styles.fridge}>
          <Image source={require( '../assets/comic_fridge.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Recipe')} style={styles.recipe}>
          <Image source={require('../assets/comic_recipe.png')}></Image>
        </TouchableOpacity> 
      </View>
      {!signedIn && <LoginModal modalVisible={loginModalVisible} 
      setModalVisible={setLoginModalVisible} setSignupModalVisible={setSignupModalVisible} 
      setFoodList={setFoodList} setRecipeList={setRecipeList} setSignedIn={setSignedIn}/>}
      {!signedIn && <LoginModal modalVisible={signupModalVisible} 
      setModalVisible={setSignupModalVisible} setSignupModalVisible={setSignupModalVisible} 
      setFoodList={setFoodList} setRecipeList={setRecipeList} setSignedIn={setSignedIn} loginFlag={false}/>}
      {!signedIn && <TouchableOpacity style={[styles.signInButton,styles.buttonClose]} onPress={()=>setLoginModalVisible(true)}>
        <Text style={styles.textStyle}>Sign in</Text>
      </TouchableOpacity>}
      {signedIn && <TouchableOpacity style={[styles.signInButton,styles.buttonClose]} 
      onPress={()=>signOut(setSignedIn,setFoodList,setRecipeList,setSignupModalVisible,setLoginModalVisible)}>
        <Text style={styles.textStyle}>Sign out</Text>
      </TouchableOpacity>}
    </View>
  );
}
async function signOut(setSignedIn,setFoodList,setRecipeList,setSignupModalVisible,setLoginModalVisible) {
  try {
      await Auth.signOut({ global: true })
      .then(()=>{setSignedIn(false);setFoodList([]);setRecipeList([]);setSignupModalVisible(false);setLoginModalVisible(false)});
  } catch (error) {
      Alert.alert('Sign out error',error.message, [{ text: 'Ok' }]);
  }
}