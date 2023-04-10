import { StyleSheet, Text, View, Button, ImageBackground, Pressable, TouchableHighlight } from 'react-native';
import { useState, useEffect} from 'react';
import  Main  from './components/Main.js';
import Amplify,{ Auth } from '@aws-amplify/core';
import Fridge from './components/Fridge.js';
import Recipe from './components/Recipe.js';
import {useGlobalState} from 'state-pool';
import store from './components/store.js';
import { StoreProvider } from 'state-pool';
import { getFood } from './components/getFood.js';
import { getRecipe } from './components/getRecipe.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
export default function App() {
  Amplify.configure({
    Auth: {
  
        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        // REQUIRED - Amazon Cognito Region
        region: 'us-west-1',
  
        // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
        // Required only if it's different from Amazon Cognito Region
  
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-west-1_00EyNRs0W',
  
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: 'm44i4l7u5j031rrdm3ffeu4q3',
    }
  });
  
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RecipeFinder">
        <Stack.Screen name="RecipeFinder" component={Main} />
        <Stack.Screen name="Fridge" component={Fridge} />
        <Stack.Screen name="Recipe" component={Recipe} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}