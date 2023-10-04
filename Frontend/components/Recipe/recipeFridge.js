import { Modal, StyleSheet, Text, View, Button, FlatList, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView, ImageBackground} from 'react-native';
import { useState,useRef,useEffect } from 'react';
import { styles } from '../../styles';
import FoodModal from '../Fridge/FoodModal';
import Item from './IngredientItem';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { AntDesign } from '@expo/vector-icons';
export default function RecipeFridge({ingredientList,navigation}) {
  function navigateToAdd(item,isAdd){
    navigation.navigate('AddIngredient',
    {item:item,isAdd:isAdd,ingredientList:ingredientList});
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
      <TouchableOpacity  onPress={()=>navigateToAdd({name:'',quantity:'',unit:'',emoji:''},true)} style={styles.iosbutton}>
        <AntDesign name="pluscircleo" size={20} color="#007AFF" />
        <Text style={[styles.addTextStyle,styles.recipeAddIngredientTextSize]}> Ingredients</Text>
      </TouchableOpacity>
    </View>
  );
}