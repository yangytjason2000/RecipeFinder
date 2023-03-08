import { Modal, StyleSheet, Text, View, Button, ImageBackground, Pressable, TouchableOpacity, Image, TextInput} from 'react-native';
import { useState,useRef,useEffect } from 'react';
import { FadeInView } from './FadeInView';
import Amplify,{ Auth } from 'aws-amplify';
import { styles } from '../styles';
import Fridge from './Fridge';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RecipeModal({modalVisible,setModalVisible,name,method,ingredient,
    setName,setMethod,setIngredient,setRecipeList,isAdd=false}) {
    const [status,setStatus] = useState(0);
    const [isEditingName,setIsEditingName] = useState(false);
    const [isEditingMethod,setIsEditingMethod] = useState(false);
    function restore(){
      setModalVisible(!modalVisible);
      setIsEditingName(false);
      setIsEditingMethod(false);
      setName('');
      setMethod('');
      setIngredient([]);
    }
  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
        {(!isEditingName && !isAdd) &&
          <TouchableOpacity onPress={()=>setIsEditingName(!isEditingName)}>
            <Text style={styles.title}>{name}</Text> 
          </TouchableOpacity>}
        {(isAdd) &&
        <Text style={styles.title}>Name</Text>}
        {(isEditingName || isAdd) &&
        <TextInput style={styles.input} onChangeText={setName} value={name} placeholder={name}/>}

        <Fridge setStatus={setStatus} foodList={ingredient} setFoodList={setIngredient} isRecipe={true}/>

        {(!isEditingMethod && !isAdd) &&
          <TouchableOpacity onPress={()=>setIsEditingMethod(!isEditingMethod)}>
            <Text style={styles.title}>{method}</Text> 
          </TouchableOpacity>}
        {(isAdd) &&
        <Text style={styles.title}>Method</Text>}
        {(isEditingMethod || isAdd) &&
        <TextInput style={styles.input} onChangeText={setMethod} value={method} placeholder={method}/>}

        <TouchableOpacity
          style={[styles.button, styles.buttonClose]}
          onPress={() => addRecipe(name,ingredient,method,setRecipeList)}>
          <Text style={styles.textStyle}>Update Recipe</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonClose]}
          onPress={() => removeRecipe(name,ingredient,method,setRecipeList)}>
          <Text style={styles.textStyle}>Remove Recipe</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonClose]}
          onPress={() => restore()}>
          <Text style={styles.textStyle}>Back</Text>
        </TouchableOpacity>
        </View>
      </View>
      </Modal>
  );
}
async function addRecipe(name,ingredient,method,setRecipeList){
  const message={
    "name": name,
    "ingredient": ingredient,
    "method": method,
  }
  await fetch('https://gdh7356lm2.execute-api.us-west-1.amazonaws.com/prod/recipe',{
    method: "POST",
    body: JSON.stringify(message),
    headers: {
      Authorization: `Bearer ${(await Auth.currentSession())
        .getIdToken()
        .getJwtToken()}`
    }
  })
  .then(response => response.json())
  .then(response => setRecipeList(response))
}
async function removeRecipe(name,ingredient,method){
  const message={
    "name": name,
    "ingredient": ingredient,
    "method": method
  }
  await fetch('https://gdh7356lm2.execute-api.us-west-1.amazonaws.com/prod/recipe',{
    method: "DELETE",
    body: JSON.stringify(message),
    headers: {
      Authorization: `Bearer ${(await Auth.currentSession())
        .getIdToken()
        .getJwtToken()}`
    }
  })
  .then(response => response.json())
  .then(response => setRecipeList(response))
}