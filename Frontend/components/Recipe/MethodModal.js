import { Modal, TouchableWithoutFeedback, Text, View, Keyboard, TouchableOpacity, Alert, TextInput} from 'react-native';
import { useState,useRef,useEffect } from 'react';
import Amplify,{ Auth } from 'aws-amplify';
import { styles } from '../../styles';
import { updateErrorCheck } from './RecipeErrorCheck';
import { addRecipe } from './AddRecipe';
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