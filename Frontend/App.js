import { StyleSheet, Text, View, Button, ImageBackground, Pressable, TouchableHighlight } from 'react-native';
import { useState } from 'react';
import  Main  from './components/Main.js';
import Fridge from './components/Fridge.js';
import Recipe from './components/Recipe.js';
export default function App() {
  const [status,setStatus]=useState(0);
  if (status==0){
    return (<Main setStatus={setStatus}/>);
  }
  else if (status==1){
    return (<Fridge setStatus={setStatus}/>);
  }
  else if (status==2){
    return (<Recipe setStatus={setStatus}/>);
  }
}
