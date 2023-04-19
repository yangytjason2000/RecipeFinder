import { Modal, TouchableWithoutFeedback, Text, View, Keyboard, TouchableOpacity, Alert, TextInput,KeyboardAvoidingView} from 'react-native';
import { useState,useRef,useEffect } from 'react';
import Amplify,{ Auth } from 'aws-amplify';
import { styles } from '../styles';
import RecipeFridge from './recipeFridge';
import ConfirmModal from './confirm';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { updateErrorCheck } from './RecipeErrorCheck';
import store from './store';
export default function RecipeModal({route,navigation}) {
  const [isEditingName,setIsEditingName] = useState(false);
  const [isEditingMethod,setIsEditingMethod] = useState(false);
  const [confirmModalVisible,setConfirmModalVisible] = useState(false);
  const [isConfirmed,setIsConfirmed] = useState(false);
  const [confirmedPressed,setConfirmedPressed] = useState(false);
  const {initName,initIngredient,initMethod,isAdd} = route.params;
  const [name,setName] = useState(initName);
  const [ingredient,setIngredient] = useState(initIngredient);
  const [method,setMethod] = useState(initMethod);
  
  const [foodList, setFoodList] = store.useState("foodList");
  const [recipeList,setRecipeList] = store.useState("recipeList");

  function restore(){
    setIsEditingName(false);
    setIsEditingMethod(false);
    setConfirmModalVisible(false);
    setIsConfirmed(false);
    setConfirmedPressed(false);
    navigation.goBack();
  }
  async function consumeConfirm(){
    await consumeErrorCheck(name,ingredient,method,setFoodList,setConfirmedPressed,consumeRecipe);
    await updateErrorCheck(name,ingredient,method,setRecipeList,addRecipe);
  }
  return (
      <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
      <View style={styles.centeredView}>
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

        {(!isEditingMethod && !isAdd) &&
          <TouchableOpacity onPress={()=>setIsEditingMethod(!isEditingMethod)}>
            <Text style={styles.title}>{method}</Text> 
          </TouchableOpacity>}
        {(isAdd) &&
        <Text style={styles.title}>Method</Text>}
        {(isEditingMethod || isAdd) &&
        <TextInput style={styles.method} onChangeText={setMethod} value={method} placeholder={method} multiline={true}/>}

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
        </View>
      </TouchableWithoutFeedback>
  );
}
async function addRecipe(name,ingredient,method,setRecipeList){
  const message={
    "name": name,
    "ingredient": ingredient,
    "method": method,
    "date": new Date(),
  }
  await fetch('https://gdh7356lm2.execute-api.us-west-1.amazonaws.com/prod/recipes?database=recipe&mode=single',{
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
  await fetch('https://gdh7356lm2.execute-api.us-west-1.amazonaws.com/prod/ingredients?database=ingredient&mode=consume',{
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