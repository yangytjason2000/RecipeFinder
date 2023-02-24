import { Modal, StyleSheet, Text, View, Button, FlatList, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView, ImageBackground} from 'react-native';
import { useState,useRef,useEffect } from 'react';
import { FadeInView } from './FadeInView';
import { styles } from '../styles';
import RecipeModal from './RecipeModal';
import Item from './RecipeItem';
const DATA = [
  {
    name:'gongbao',
    ingredient: [{name:'rou',emoji:'rou',quantity:'1'},{name:'rou',emoji:'rou',quantity:'1'},
    {name:'rou',emoji:'rou',quantity:'1'},{name:'rou',emoji:'rou',quantity:'1'}],
    method:'cook',
  },
  {
    name:'gongbao',
    ingredient: [{name:'rou',emoji:'rou',quantity:'1'}],
    method:'cook',
  },
  {
    name:'gongbao',
    ingredient: [{name:'rou',emoji:'rou',quantity:'1'}],
    method:'cook',
  },
  {
    name:'gongbao',
    ingredient: [{name:'rou',emoji:'rou',quantity:'1'}],
    method:'cook',
  },
];
export default function Recipe({setStatus,recipeList,setRecipeList}) {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [RecipeModalVisible,setRecipeModalVisible] = useState(false);
  //name,emoji,number
  const [name,setName] = useState('');
  const [ingredient,setIngredient] = useState([]);
  const [method,setMethod] = useState('');

  const [selectedName,setSelectedName] = useState('');
  const [selectedIngredient,setSelectedIngredient] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState('');
  return (
    <View style={styles.fridgeContainer}>
      <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item recipe={item} setName={setSelectedName} setIngredient={setSelectedIngredient}
        setMethod={setSelectedMethod} setRecipeModalVisible={setRecipeModalVisible}/>}
      />
      </SafeAreaView>
      <RecipeModal modalVisible={addModalVisible} setModalVisible={setAddModalVisible} 
      name={name} ingredient={ingredient} method={method} 
      setName={setName} setIngredient={setIngredient} setMethod={setMethod} setRecipeList={setRecipeList} isAdd={true}>
      </RecipeModal>
      <RecipeModal modalVisible={RecipeModalVisible} setModalVisible={setRecipeModalVisible} 
      name={selectedName} ingredient={selectedIngredient} method={selectedMethod} 
      setName={setSelectedName} setIngredient={setSelectedIngredient} setMethod={setSelectedMethod} setRecipeList={setRecipeList}>
      </RecipeModal>
      <TouchableOpacity  onPress={()=>setAddModalVisible(true)} style={[styles.button,styles.buttonClose]}>
      <Text style={styles.textStyle}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>setStatus(0)} style={[styles.button,styles.buttonClose]}>
      <Text style={styles.textStyle}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}
