import { Modal, TouchableWithoutFeedback, Text, View, Keyboard, TouchableOpacity, Alert, TextInput,KeyboardAvoidingView} from 'react-native';
import { useState,useRef,useEffect } from 'react';
import Amplify,{ Auth } from 'aws-amplify';
import { styles } from '../styles';
import RecipeFridge from './recipeFridge';
import ConfirmModal from './confirm';
import { getRecipe } from './getRecipe';
import { updateErrorCheck } from './RecipeErrorCheck';

export default function RecipeModal({modalVisible,setModalVisible,name,method,ingredient,
  setName,setMethod,setIngredient,setRecipeList,isAdd=false,setFoodList}) {
  const [isEditingName,setIsEditingName] = useState(false);
  const [isEditingMethod,setIsEditingMethod] = useState(false);
  const [confirmModalVisible,setConfirmModalVisible] = useState(false);
  const [isConfirmed,setIsConfirmed] = useState(false);
  const [confirmedPressed,setConfirmedPressed] = useState(false)
  function restore(){
    setModalVisible(!modalVisible);
    setIsEditingName(false);
    setIsEditingMethod(false);
    setName('');
    setMethod('');
    setIngredient([]);
    setConfirmModalVisible(false);
    setIsConfirmed(false);
    setConfirmedPressed(false);
  }
  async function consumeConfirm(){
    await consumeErrorCheck(name,ingredient,method,setFoodList,setConfirmedPressed,consumeRecipe);
    await updateErrorCheck(name,ingredient,method,setRecipeList,addRecipe);
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
      <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
        {(!isEditingName && !isAdd) &&
          <TouchableOpacity onPress={()=>setIsEditingName(!isEditingName)}>
            <Text style={styles.title}>{name+'\n'}</Text> 
          </TouchableOpacity>}
        {(isAdd) &&
        <Text style={styles.title}>Name</Text>}
        {(isEditingName || isAdd) &&
        <TextInput style={styles.input} onChangeText={setName} value={name} placeholder={name}/>}
        <Text style={styles.title}>Ingredients</Text>
        <RecipeFridge foodList={ingredient} setFoodList={setIngredient}/>
        
        <ConfirmModal prompt="Are you sure you want to eat this?" modalVisible={confirmModalVisible}
        setModalVisible={setConfirmModalVisible} setIsConfirmed={setIsConfirmed} consumeConfirm={consumeConfirm}/>
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, alignItems: 'center', }}
        >
        {(!isEditingMethod && !isAdd) &&
          <TouchableOpacity onPress={()=>setIsEditingMethod(!isEditingMethod)}>
            <Text style={styles.title}>{method}</Text> 
          </TouchableOpacity>}
        {(isAdd) &&
        <Text style={styles.title}>Method</Text>}
        {(isEditingMethod || isAdd) &&
        <TextInput style={styles.method} onChangeText={setMethod} value={method} placeholder={method} multiline={true}/>}
        </KeyboardAvoidingView>

        {(!isAdd && !isConfirmed) && <TouchableOpacity
          style={[styles.button, styles.buttonConsume]}
          onPress={() => setConfirmModalVisible(true)}>
          <Text style={styles.textStyle}>Eat This!</Text>
        </TouchableOpacity>}

        {confirmedPressed && 
          <Text style={styles.confirm}>Confirmed Eat This!</Text>}

        {!isAdd && <TouchableOpacity
          style={[styles.button, styles.buttonClose]}
          onPress={async () => {await updateErrorCheck(name,ingredient,method,setRecipeList,addRecipe);restore();}}>
          <Text style={styles.textStyle}>Update Recipe</Text>
        </TouchableOpacity>}
        {isAdd && <TouchableOpacity
          style={[styles.button, styles.buttonClose]}
          onPress={async () => {await updateErrorCheck(name,ingredient,method,setRecipeList,addRecipe);restore();}}>
          <Text style={styles.textStyle}>Add Recipe</Text>
        </TouchableOpacity>}
        <TouchableOpacity
          style={[styles.button, styles.buttonClose]}
          onPress={() => restore()}>
          <Text style={styles.textStyle}>Back</Text>
        </TouchableOpacity>
        </View>
      </View>
      </TouchableWithoutFeedback>
      </Modal>
  );
}
async function addRecipe(name,ingredient,method,setRecipeList){
  const message={
    "name": name,
    "ingredient": ingredient,
    "method": method,
    "date": new Date(),
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
  .then(response => {
    if (response.ok){
      response.json().then(response=>{
        setRecipeList(response);
      })
    }
    else{
      response.json().then(error=>{
        Alert.alert('Error',error.message,[{text: 'OK'}]);

      })
    }
  })
  .catch(error => {
    Alert.alert('Update error',error.message, [{ text: 'Ok' }]);
  });
}
async function consumeErrorCheck(name,ingredient,method,setFoodList,setConfirmedPressed,consumeMethod){
  try {
    await Auth.currentAuthenticatedUser()
    .then(()=>consumeMethod(name,ingredient,method,setFoodList,setConfirmedPressed))
  } catch (error) {
    Alert.alert('Eat this error',error.message, [{ text: 'Ok' }]);
  }
}
async function consumeRecipe(name,ingredient,method,setFoodList,setConfirmedPressed){
  const message={
    "name": name,
    "ingredient": ingredient,
    "method": method
  }
  await fetch('https://gdh7356lm2.execute-api.us-west-1.amazonaws.com/prod/ingredient/consume',{
    method: "POST",
    body: JSON.stringify(message),
    headers: {
      Authorization: `Bearer ${(await Auth.currentSession())
        .getIdToken()
        .getJwtToken()}`
    }
  })
  .then(response => {
    if (response.ok){
      response.json().then(response=>{
        setFoodList(response);
        setConfirmedPressed(true);
      })
    }
    else{
      response.json().then(error=>{
        Alert.alert('Error',error.message,[{text: 'OK'}]);
      })
    }
  })
  .catch(error => {
    Alert.alert('Error',error.message, [{ text: 'Ok' }]);
  });
}