import { Modal, TouchableWithoutFeedback, Text, View, Keyboard, TouchableOpacity, Alert, TextInput,KeyboardAvoidingView} from 'react-native';
import { useState,useRef,useEffect } from 'react';
import { FadeInView } from './FadeInView';
import Amplify,{ Auth } from 'aws-amplify';
import { styles } from '../styles';
import Fridge from './Fridge';
import ConfirmModal from './confirm';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RecipeModal({modalVisible,setModalVisible,name,method,ingredient,
    setName,setMethod,setIngredient,setRecipeList,isAdd=false,setFoodList}) {
    const [status,setStatus] = useState(0);
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
            <Text style={styles.title}>{name}</Text> 
          </TouchableOpacity>}
        {(isAdd) &&
        <Text style={styles.title}>Name</Text>}
        {(isEditingName || isAdd) &&
        <TextInput style={styles.input} onChangeText={setName} value={name} placeholder={name}/>}

        <Fridge setStatus={setStatus} foodList={ingredient} setFoodList={setIngredient} isRecipe={true}/>
        
        <ConfirmModal prompt="Are you sure you want to eat this?" modalVisible={confirmModalVisible}
        setModalVisible={setConfirmModalVisible} setIsConfirmed={setIsConfirmed}/>
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 0.5, alignItems: 'center', }}
        >
        {(!isEditingMethod && !isAdd) &&
          <TouchableOpacity onPress={()=>setIsEditingMethod(!isEditingMethod)}>
            <Text style={styles.title}>{method}</Text> 
          </TouchableOpacity>}
        {(isAdd) &&
        <Text style={styles.title}>Method</Text>}
        {(isEditingMethod || isAdd) &&
        <TextInput style={styles.input} onChangeText={setMethod} value={method} placeholder={method} multiline={true}/>}
        </KeyboardAvoidingView>
        {(!isAdd && !isConfirmed) && <TouchableOpacity
          style={[styles.button, styles.buttonConsume]}
          onPress={() => setConfirmModalVisible(true)}>
          <Text style={styles.textStyle}>Eat This!</Text>
        </TouchableOpacity>}
        {(isConfirmed && !confirmedPressed) && <TouchableOpacity
          style={[styles.button, styles.buttonConsume]}
          onPress={async () => {await consumeRecipe(name,ingredient,method,setFoodList,setConfirmedPressed);
            await addRecipe(name,ingredient,method,setRecipeList);}}>
          <Text style={styles.textStyle}>Confirm Eat This!</Text>
        </TouchableOpacity>}

        {confirmedPressed && 
          <Text style={styles.confirm}>Confirmed Eat This!</Text>}

        {!isAdd && <TouchableOpacity
          style={[styles.button, styles.buttonClose]}
          onPress={async () => {await addRecipe(name,ingredient,method,setRecipeList);restore();}}>
          <Text style={styles.textStyle}>Update Recipe</Text>
        </TouchableOpacity>}
        {isAdd && <TouchableOpacity
          style={[styles.button, styles.buttonClose]}
          onPress={async () => {await addRecipe(name,ingredient,method,setRecipeList);restore();}}>
          <Text style={styles.textStyle}>Add Recipe</Text>
        </TouchableOpacity>}
        <TouchableOpacity
          style={[styles.button, styles.buttonClose]}
          onPress={async () => {await removeRecipe(name,ingredient,method,setRecipeList);restore()}}>
          <Text style={styles.textStyle}>Remove Recipe</Text>
        </TouchableOpacity>
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
  .then(response => response.json())
  .then(response => {setRecipeList(response);})
  .catch(error => {
    Alert.alert('Update error',error.message, [{ text: 'Ok' }]);
  });
}
async function removeRecipe(name,ingredient,method,setRecipeList){
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
  .then(response => {setRecipeList(response);})
  .catch(error => {
    Alert.alert('Remove error',error.message, [{ text: 'Ok' }]);
  });
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
}