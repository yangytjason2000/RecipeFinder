import { Modal, TouchableWithoutFeedback, Text, View, Keyboard, ImageBackground, Pressable, TouchableOpacity, Image, TextInput} from 'react-native';
import { useState,useRef,useEffect } from 'react';
import { FadeInView } from './FadeInView';
import Amplify,{ Auth } from 'aws-amplify';
import { getUsername } from './getUsername';
import { styles } from '../styles';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function FoodModal({modalVisible,setModalVisible,name='',emoji='',number=''
,date=new Date(),foodList=[],setName,setNumber,setEmoji,setDate,setFoodList,deleteFlag=false,isRecipe=false}) {
  const [isLoading,setIsLoading] = useState(false);
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
            <Text style={styles.title}>emoji</Text>
            <TextInput style={styles.input} onChangeText={setEmoji} value={emoji} placeholder={emoji}/>
            {!isRecipe && <Text style={styles.title}>date</Text>}
            {!isRecipe && <DateTimePicker value={date} onChange={(event, selected) => setDate(selected)} mode="date" />}
            {deleteFlag ?<TouchableOpacity
                style={[styles.button,styles.buttonClose]}
                onPress={()=> {addFood(name,number,emoji,date,setFoodList)}}>
                <Text style={styles.textStyle}>Save</Text>
              </TouchableOpacity> :
              <TouchableOpacity
              style={[styles.button,styles.buttonClose]}
              onPress={()=> isRecipe ? addRecipeFood(name,number,emoji,foodList,setFoodList) 
              : addFood(name,number,emoji,date,setFoodList)}>
              <Text style={styles.textStyle}>Add</Text>
              </TouchableOpacity>}
            {deleteFlag && <TouchableOpacity 
              style={[styles.button,styles.buttonClose]}
              onPress={()=> {removeFood(name,number,emoji,date,setFoodList)}}>
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableOpacity>}
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Back</Text>
            </TouchableOpacity>
          </View>
          </TouchableWithoutFeedback>
        </View>
        </Modal>
  );
}
function addRecipeFood(name,number,emoji,foodList,setFoodList){
  const newList = foodList.concat({ name:name,number:number,emoji:emoji });
  setFoodList(newList);
}
async function addFood(name,number,emoji,date,setFoodList){
  const message={
    "name": name,
    "emoji": emoji,
    "quantity": number,
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
  .then(response=>setFoodList(response))
}
async function removeFood(name,number,emoji,date,setFoodList){
  const message={
    "name": name,
    "emoji": emoji,
    "quantity": number,
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
  .then(response=>setFoodList(response))
}