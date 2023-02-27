import { StyleSheet, Text, View, Button, ImageBackground, Pressable, TouchableHighlight } from 'react-native';
import { useState, useEffect} from 'react';
import  Main  from './components/Main.js';
import Amplify,{ Auth } from '@aws-amplify/core';
import Fridge from './components/Fridge.js';
import Recipe from './components/Recipe.js';
export default function App() {
  Amplify.configure({
    Auth: {
  
        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        // REQUIRED - Amazon Cognito Region
        region: 'us-west-1',
  
        // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
        // Required only if it's different from Amazon Cognito Region
  
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-west-1_YvAsM4N3n',
  
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: 'hdclag2n22cgeuom87t5fousm',
    }
  });
  const [status,setStatus]=useState(0);
  const [foodList, setFoodList] = useState([]);
  const [recipeList,setRecipeList] = useState([]);
  const [signedIn,setSignedIn] = useState(false);
  useEffect(()=>{
    const confirmSignedIn = async() => {
      try {
        await Auth.currentAuthenticatedUser();
        console.log('correct');
        setSignedIn(true);
      } catch {
        console.log('incorrect');
        setSignedIn(false);
        console.log(signedIn);
      }
    }
    confirmSignedIn();
    },[])
  if (status==0){
    return (<Main setStatus={setStatus} setFoodList={setFoodList} signedIn={signedIn} setSignedIn={setSignedIn}/>);
  }
  else if (status==1){
    return (<Fridge setStatus={setStatus} foodList={foodList} setFoodList={setFoodList}/>);
  }
  else if (status==2){
    return (<Recipe setStatus={setStatus} recipeList={recipeList} setRecipeList={setRecipeList}/>);
  }
}