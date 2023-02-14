import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ImageBackground, Pressable, TouchableHighlight } from 'react-native';
import { useState } from 'react';
import  Main  from './components/Main.js';
import Fridge from './components/Fridge.js'
export default function App() {
  const state=1;
  return (
    <Main />
  );
}
