import { Modal, TouchableWithoutFeedback, Text, View, Keyboard, Alert, TouchableOpacity, TextInput} from 'react-native';
import { useState,useRef,useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Amplify,{ Auth } from 'aws-amplify';
import { styles } from '../../styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { updateErrorCheck } from './FridgeErrorCheck';
import store from '../store';

export default function FoodModal({route,navigation}) {
  const {initName,initNumber,initUnit,initEmoji,initDate,isAdd} = route.params;
  const [name,setName] = useState(initName);
  const [number,setNumber] = useState(initNumber);
  const [unit,setUnit] = useState(initUnit);
  const [emoji,setEmoji] = useState(initEmoji);
  const [date,setDate] = useState(new Date(initDate));
  const [foodList,setFoodList] = store.useState("foodList");


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
            <Text style={styles.title}>expiration date</Text>
            <DateTimePicker value={date} onChange={(event, selected) => setDate(selected)} mode="date" />
            {!isAdd ?<TouchableOpacity
                style={[styles.button,styles.buttonClose]}
                onPress={async ()=> {
                  await updateErrorCheck(name, number, unit, emoji, date, setFoodList, addFood);
                  navigation.goBack();
                }}>
                <Text style={styles.textStyle}>Save</Text>
              </TouchableOpacity> :
              <TouchableOpacity
              style={[styles.button,styles.buttonClose]}
              onPress={async ()=> {
                await updateErrorCheck(name, number, unit, emoji, date, setFoodList, addFood);
                navigation.goBack();
              }}>
                <Text style={styles.textStyle}>Add</Text>
            </TouchableOpacity>}
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
  );
}

async function addFood(name,number,unit,emoji,date,setFoodList){
  const message={
    "name": name,
    "emoji": emoji,
    "quantity": number,
    "unit": unit,
    "date": date,
  }
  await fetch('https://gdh7356lm2.execute-api.us-west-1.amazonaws.com/prod/ingredients?database=ingredient&mode=single',{
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