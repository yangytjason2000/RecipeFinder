import { Modal, TouchableWithoutFeedback, Text, View, Keyboard, Alert, TouchableOpacity, TextInput} from 'react-native';
import { useState,useRef,useEffect } from 'react';
import { FadeInView } from './FadeInView';
import Amplify,{ Auth } from 'aws-amplify';
import { getUsername } from './getUsername';
import { styles } from '../styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { updateErrorCheck } from './FridgeErrorCheck';

export default function FoodModal({modalVisible,setModalVisible,name='',emoji='',number='',unit=''
,date=new Date(),foodList=[],setName,setNumber,setUnit,setEmoji,setDate,setFoodList,deleteFlag=false,isRecipe=false}) {
  const [isLoading,setIsLoading] = useState(false);
  function restore(){
    setModalVisible(false);
    setName('');
    setNumber('');
    setUnit('');
    setEmoji('');
    setDate(new Date());
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
            {!deleteFlag && <Text style={styles.title}>name</Text>}
            {!deleteFlag && <TextInput style={styles.input} onChangeText={setName} value={name} placeholder={name}/>}
            {deleteFlag && <Text style={styles.nameTitle}>{name+'\n'}</Text>}
            <Text style={styles.title}>number</Text> 
            <TextInput style={styles.input} onChangeText={setNumber} value={number} placeholder={number}/>
            <Text style={styles.title}>unit</Text> 
            <TextInput style={styles.input} onChangeText={setUnit} value={unit} placeholder={unit}/>
            <Text style={styles.title}>emoji</Text>
            <TextInput style={styles.input} onChangeText={setEmoji} value={emoji} placeholder={emoji}/>
            {!isRecipe && <Text style={styles.title}>expiration date</Text>}
            {!isRecipe && <DateTimePicker value={date} onChange={(event, selected) => setDate(selected)} mode="date" />}
            {deleteFlag ?<TouchableOpacity
                style={[styles.button,styles.buttonClose]}
                onPress={async ()=> isRecipe ? saveRecipeFood(name,number,unit,emoji,foodList,setFoodList,restore) 
                  : await updateErrorCheck(name,number,unit,emoji,date,setFoodList,restore,addFood)}>
                <Text style={styles.textStyle}>Save</Text>
              </TouchableOpacity> :
              <TouchableOpacity
              style={[styles.button,styles.buttonClose]}
              onPress={async ()=> isRecipe ? addRecipeFood(name,number,unit,emoji,foodList,setFoodList,restore) 
              : await updateErrorCheck(name,number,unit,emoji,date,setFoodList,restore,addFood)}>
              <Text style={styles.textStyle}>Add</Text>
              </TouchableOpacity>}
            {deleteFlag && <TouchableOpacity 
              style={[styles.button,styles.buttonClose]}
              onPress={async ()=> isRecipe ? removeRecipeFood(name,number,unit,emoji,foodList,setFoodList,restore)
                : await updateErrorCheck(name,number,unit,emoji,date,setFoodList,restore,removeFood)}>
              <Text style={styles.textStyle}>Delete</Text>
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
function addRecipeFood(name,number,unit,emoji,foodList,setFoodList,restore){
  const newList = foodList.concat({ name:name, quantity:number, unit:unit, emoji:emoji });
  setFoodList(newList);
  restore();
}
function saveRecipeFood(name,number,unit,emoji,foodList,setFoodList,restore){
  for (var i=0;i<foodList.length;i++){
    if (foodList[i]['name']==name) {
      const newList = foodList.map(item => ({ ...item }));
      newList[i]['quantity']=number;
      newList[i]['unit']=unit;
      newList[i]['emoji']=emoji;
      setFoodList(newList);
      restore();
      return;
    }
  }
}
function removeRecipeFood(name,number,unit,emoji,foodList,setFoodList,restore){
  const newList = foodList.filter((item) => item.name!=name);
  setFoodList(newList);
  restore();
}
async function addFood(name,number,unit,emoji,date,setFoodList,restore){
  const message={
    "name": name,
    "emoji": emoji,
    "quantity": number,
    "unit": unit,
    "date": date,
  }
  await fetch('https://gdh7356lm2.execute-api.us-west-1.amazonaws.com/prod/ingredient',{
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
        restore();
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
async function removeFood(name,number,unit,emoji,date,setFoodList,restore){
  const message={
    "name": name,
    "emoji": emoji,
    "quantity": number,
    "unit": unit,
    "date": date,
  }
  await fetch('https://gdh7356lm2.execute-api.us-west-1.amazonaws.com/prod/ingredient',{
    method: "DELETE",
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
        restore();
      })
    }
    else{
      response.json().then(error=>{
        Alert.alert('Error',error.message,[{text: 'OK'}]);
      })
    }
  })
  .catch(error => {
    Alert.alert('Remove error',error.message, [{ text: 'Ok' }]);
  });
}