import { Modal, StyleSheet, Text, View, Button, FlatList, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView, ImageBackground} from 'react-native';
import { useState,useRef,useEffect } from 'react';
import { styles } from '../../styles';
import FoodModal from '../Fridge/FoodModal';
import Item from './IngredientItem';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { AntDesign } from '@expo/vector-icons';
export default function RecipeFridge({ingredientList,navigation}) {
  async function navigateToAdd(name,number,unit,emoji,isAdd){
    navigation.navigate('AddIngredient',
    {initName:name,initNumber:number,initUnit:unit,initEmoji:emoji,isAdd:isAdd,ingredientList:ingredientList});
  }
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
      <KeyboardAwareFlatList
        data={ingredientList}
        renderItem={({item}) => <Item food={item}
        navigateToAdd={navigateToAdd}/>}
      />
      </SafeAreaView>
      <TouchableOpacity  onPress={async ()=>await navigateToAdd('','','','',true)} style={styles.iosbutton}>
        <AntDesign name="pluscircleo" size={20} color="#007AFF" />
        <Text style={[styles.addTextStyle,styles.recipeAddIngredientTextSize]}> Ingredients</Text>
      </TouchableOpacity>
    </View>
  );
}