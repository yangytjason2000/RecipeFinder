import { Modal, TouchableWithoutFeedback, Text, View, Keyboard, Alert, Pressable, TouchableOpacity, Image, TextInput} from 'react-native';
import { useState,useRef,useEffect } from 'react';
import { FadeInView } from './FadeInView';
import Amplify,{ Auth } from 'aws-amplify';
import { getUsername } from './getUsername';
import { styles } from '../styles';
import DateTimePicker from '@react-native-community/datetimepicker';

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
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
          <View style={styles.modalView}>
            <Text style={styles.title}>name</Text>
            <TextInput style={styles.input} onChangeText={setName} value={name} placeholder={name}/>
            <Text style={styles.title}>number</Text> 
            <TextInput style={styles.input} onChangeText={setNumber} value={number} placeholder={number}/>
            <Text style={styles.title}>unit</Text> 
            <TextInput style={styles.input} onChangeText={setUnit} value={unit} placeholder={unit}/>
            <Text style={styles.title}>emoji</Text>
            <TextInput style={styles.input} onChangeText={setEmoji} value={emoji} placeholder={emoji}/>
            {!isRecipe && <Text style={styles.title}>date</Text>}
            {!isRecipe && <DateTimePicker value={date} onChange={(event, selected) => setDate(selected)} mode="date" />}
            {deleteFlag ?<TouchableOpacity
                style={[styles.button,styles.buttonClose]}
                onPress={()=> {addFood(name,number,unit,emoji,date,setFoodList,restore)}}>
                <Text style={styles.textStyle}>Save</Text>
              </TouchableOpacity> :
              <TouchableOpacity
              style={[styles.button,styles.buttonClose]}
              onPress={()=> isRecipe ? addRecipeFood(name,number,unit,emoji,foodList,setFoodList,restore) 
              : addFood(name,number,unit,emoji,date,setFoodList,restore)}>
              <Text style={styles.textStyle}>Add</Text>
              </TouchableOpacity>}
            {deleteFlag && <TouchableOpacity 
              style={[styles.button,styles.buttonClose]}
              onPress={()=> isRecipe ? removeRecipeFood(name,number,unit,emoji,foodList,setFoodList,restore)
                : removeFood(name,number,unit,emoji,date,setFoodList,restore)}>
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableOpacity>}
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => restore()}>
              <Text style={styles.textStyle}>Back</Text>
            </TouchableOpacity>
          </View>
          </TouchableWithoutFeedback>
        </View>
        </Modal>
  );
}
function addRecipeFood(name,number,unit,emoji,foodList,setFoodList,restore){
  const newList = foodList.concat({ name:name, quantity:number, unit:unit, emoji:emoji });
  setFoodList(newList);
  restore();
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
  .then(response => response.json())
  .then(response=>{setFoodList(response);restore();})
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
  .then(response => response.json())
  .then(response=>{setFoodList(response);restore();})
  .catch(error => {
    Alert.alert('Remove error',error.message, [{ text: 'Ok' }]);
  });
}