import { Modal, TouchableWithoutFeedback, Text, View, Keyboard, TouchableOpacity, Alert, TextInput} from 'react-native';
import { useState,useRef,useEffect } from 'react';
import Amplify,{ Auth } from 'aws-amplify';
import { styles } from '../../styles';
import { updateErrorCheck } from './RecipeErrorCheck';
import store from '../store';
export default function MethodModal({route,navigation}) {
  const {name,ingredient,initMethod,isAdd} = route.params;
  const [method,setMethod] = useState(initMethod);
  const [isEditingMethod,setIsEditingMethod] = useState(false);
  const [recipeList,setRecipeList] = store.useState("recipeList");

  function restore(){
    setIsEditingMethod(false);
    navigation.navigate('Recipe');
  }
  return (
      <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
      <View style={styles.centeredView}>

        {(!isEditingMethod && !isAdd) &&
          <TouchableOpacity onPress={()=>setIsEditingMethod(!isEditingMethod)}>
            <Text style={styles.title}>{method}</Text> 
          </TouchableOpacity>}
        {(isAdd) &&
        <Text style={styles.title}>Method</Text>}
        {(isEditingMethod || isAdd) &&
        <TextInput style={styles.method} onChangeText={setMethod} value={method} placeholder={method} multiline={true}/>}

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