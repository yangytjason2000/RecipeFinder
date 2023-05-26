import {Text, View, Keyboard,TouchableOpacity, Alert, TextInput,TouchableWithoutFeedback} from 'react-native';
import { useState,useRef,useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Amplify,{ Auth } from 'aws-amplify';
import { getFood } from './getFood';
import { getRecipe } from './getRecipe';
import { styles } from '../styles';
import store from './store';
export default function LoginModal({navigation}) {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [useremail,setUserEmail] = useState('');
    const [emailsent,setEmailSent] = useState(false);
    const [confirmation,setConfirmation] = useState('');
    const [loginFlag,setLoginFlag] = useState(true);
    const [foodList, setFoodList] = store.useState("foodList");
    const [recipeList,setRecipeList] = store.useState("recipeList");
    const [signedIn,setSignedIn] = store.useState("signedIn");
    return (
        <KeyboardAwareScrollView
        contentContainerStyle={{flex:1}}>
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <View style={styles.centeredView}>
            <Text>Username</Text>
            <TextInput style={styles.input} onChangeText={setUsername} value={username}/>
            <Text>Password</Text>
            <TextInput style={styles.input} onChangeText={setPassword} value={password} secureTextEntry={true}/>
            {!loginFlag && <Text>Email</Text>}
            {!loginFlag && <TextInput style={styles.input} onChangeText={setUserEmail} value={useremail}/>}
            {(!loginFlag && emailsent) && <Text>Confirmation Code</Text>}
            {(!loginFlag && emailsent) && <TextInput style={styles.input} onChangeText={setConfirmation} value={confirmation}/>}
            {loginFlag && <TouchableOpacity
                style={[styles.button,styles.buttonClose]}
                onPress={async ()=> {await signIn(username,password,setSignedIn,setFoodList,setRecipeList);
                navigation.goBack();}}>
                <Text style={styles.textStyle}>Sign In</Text>
            </TouchableOpacity>}
            {loginFlag && <TouchableOpacity
              style={[styles.button,styles.buttonClose]}
              onPress={()=> {setLoginFlag(false)}}>
              <Text style={styles.textStyle}>Sign Up</Text>
            </TouchableOpacity>}
            {(!loginFlag && !emailsent) && <TouchableOpacity
              style={[styles.button,styles.buttonClose]}
              onPress={()=> signUp(username,password,useremail,setEmailSent)}>
              <Text style={styles.textStyle}>Sent Email</Text>
            </TouchableOpacity>}
            {(!loginFlag && emailsent) && <TouchableOpacity
              style={[styles.button,styles.buttonClose]}
              onPress={()=> confirm(username,confirmation,setSignedIn)}>
              <Text style={styles.textStyle}>Confirm</Text>
            </TouchableOpacity>}
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
  );
}
async function confirm(username,confirmation,setSignedIn) {
  await Auth.confirmSignUp(username, confirmation)
  .then(data => {
    setSignedIn(true);
  })
  .catch(error => {
    Alert.alert('Confirmation error',error.message, [{ text: 'Ok' }]);
  });
}
async function signUp(username,password,email,setEmailSent) {
  try {
      await Auth.signUp({
          username,
          password,
          attributes:{
            email: email,
          },
          autoSignIn: {
              enabled: true,
          }
      })
      .then(response=>setEmailSent(true));
  } catch (error) {
    Alert.alert('Sign up error',error.message, [{ text: 'Ok' }]);
  }
}
async function signIn(username,password,setSignedIn,setFoodList,setRecipeList) {
  try {
      await Auth.signIn({
          username,
          password,
      })
      .then(response=>{setSignedIn(true);getFood(setFoodList);getRecipe(setRecipeList);})
  } catch (error) {
    Alert.alert('Login error',error.message, [{ text: 'Ok' }]);
  }
}