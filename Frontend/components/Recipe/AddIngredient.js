import { Modal, TouchableWithoutFeedback, Text, View, Keyboard, Alert, TouchableOpacity, TextInput} from 'react-native';
import { useState,useRef,useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Amplify,{ Auth } from 'aws-amplify';
import { styles } from '../../styles';
import store from '../store';
export default function AddIngredient({route,navigation}) {
  const {item,isAdd,ingredientList} = route.params;
  const [name,setName] = useState(item.name);
  const [quantity,setQuantity] = useState(item.quantity);
  const [unit,setUnit] = useState(item.unit);
  const [emoji,setEmoji] = useState(item.emoji);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flex:1}}>
      <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <View style={styles.centeredView}>
            {isAdd && <Text style={styles.title}>name</Text>}
            {isAdd && <TextInput style={styles.input} onChangeText={setName} value={name} placeholder={name}/>}
            {!isAdd && <Text style={styles.nameTitle}>{name+'\n'}</Text>}
            <Text style={styles.title}>quantity</Text> 
            <TextInput style={styles.input} onChangeText={setQuantity} value={quantity} placeholder={quantity}/>
            <Text style={styles.title}>unit</Text> 
            <TextInput style={styles.input} onChangeText={setUnit} value={unit} placeholder={unit}/>
            <Text style={styles.title}>emoji</Text>
            <TextInput style={styles.input} onChangeText={setEmoji} value={emoji} placeholder={emoji}/>
            {!isAdd ?
              <TouchableOpacity
                style={[styles.button,styles.buttonClose]}
                onPress={()=> 
                  saveRecipeFood(name, quantity, unit, emoji, ingredientList,navigation)
                }
                >
                <Text style={styles.textStyle}>Save</Text>
              </TouchableOpacity> :
              <TouchableOpacity
                style={[styles.button,styles.buttonClose]}
                onPress={()=> {
                    addRecipeFood(name, quantity, unit, emoji, ingredientList,navigation);
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
function addRecipeFood(name,quantity,unit,emoji,ingredientList,navigation){
  const newList = ingredientList.concat({ name:name, quantity:quantity, unit:unit, emoji:emoji });
  navigation.navigate({name:'Modify Recipe',params:{initIngredient: newList},merge: true});
}
function saveRecipeFood(name,quantity,unit,emoji,ingredientList,navigation){
  for (var i=0;i<ingredientList.length;i++){
    if (ingredientList[i]['name']==name) {
      const newList = ingredientList.map(item => ({ ...item }));
      newList[i]['quantity']=quantity;
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