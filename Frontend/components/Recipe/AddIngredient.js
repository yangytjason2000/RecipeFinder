import { Modal, TouchableWithoutFeedback, Text, View, Keyboard, Alert, TouchableOpacity, TextInput} from 'react-native';
import { useState,useRef,useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Amplify,{ Auth } from 'aws-amplify';
import { styles } from '../../styles';
import store from '../store';
export default function AddIngredient({route,navigation}) {
  const {initName,initNumber,initUnit,initEmoji,isAdd,ingredientList} = route.params;
  const [name,setName] = useState(initName);
  const [number,setNumber] = useState(initNumber);
  const [unit,setUnit] = useState(initUnit);
  const [emoji,setEmoji] = useState(initEmoji);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flex:1}}>
      <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <View style={styles.centeredView}>
            {isAdd && <Text style={styles.title}>name</Text>}
            {isAdd && <TextInput style={styles.input} onChangeText={setName} value={name} placeholder={name}/>}
            {!isAdd && <Text style={styles.nameTitle}>{name+'\n'}</Text>}
            <Text style={styles.title}>number</Text> 
            <TextInput style={styles.input} onChangeText={setNumber} value={number} placeholder={number}/>
            <Text style={styles.title}>unit</Text> 
            <TextInput style={styles.input} onChangeText={setUnit} value={unit} placeholder={unit}/>
            <Text style={styles.title}>emoji</Text>
            <TextInput style={styles.input} onChangeText={setEmoji} value={emoji} placeholder={emoji}/>
            {!isAdd ?
              <TouchableOpacity
                style={[styles.button,styles.buttonClose]}
                onPress={()=> 
                  saveRecipeFood(name, number, unit, emoji, ingredientList,navigation)
                }
                >
                <Text style={styles.textStyle}>Save</Text>
              </TouchableOpacity> :
              <TouchableOpacity
                style={[styles.button,styles.buttonClose]}
                onPress={()=> {
                    addRecipeFood(name, number, unit, emoji, ingredientList,navigation,route);
                }}>
                <Text style={styles.textStyle}>Add</Text>
              </TouchableOpacity>}
            {(!isAdd) && 
              <TouchableOpacity 
              style={[styles.button,styles.buttonClose]}
              onPress={async ()=> removeRecipeFood(name, ingredientList,navigation)}>
                  <Text style={styles.textStyle}>Delete</Text>
              </TouchableOpacity>}
            <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => navigation.goBack()}>
              <Text style={styles.textStyle}>Back</Text>
            </TouchableOpacity>
          </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}
function addRecipeFood(name,number,unit,emoji,ingredientList,navigation,route){
  const newList = ingredientList.concat({ name:name, quantity:number, unit:unit, emoji:emoji });
  navigation.navigate({name:'Modify Recipe',params:{initIngredient: newList},merge: true});
}
function saveRecipeFood(name,number,unit,emoji,ingredientList,navigation){
  for (var i=0;i<ingredientList.length;i++){
    if (ingredientList[i]['name']==name) {
      const newList = ingredientList.map(item => ({ ...item }));
      newList[i]['quantity']=number;
      newList[i]['unit']=unit;
      newList[i]['emoji']=emoji;
      navigation.navigate({name:'Modify Recipe',params:{initIngredient: newList},merge: true});
    }
  }
}
function removeRecipeFood(name,ingredientList,navigation){
  const newList = ingredientList.filter((item) => item.name!=name);
  navigation.navigate({name:'Modify Recipe',params:{initIngredient: newList},merge: true});
}