import { Modal, TouchableWithoutFeedback, Text, View, Keyboard, Alert, TouchableOpacity, TextInput} from 'react-native';
import { useState,useRef,useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Amplify,{ Auth } from 'aws-amplify';
import { styles } from '../../styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { updateErrorCheck } from './FridgeErrorCheck';
import store from '../store';

export default function FoodModal({route,navigation}) {
  const {item,isAdd} = route.params;
  const [name,setName] = useState(item.name);
  const [quantity,setQuantity] = useState(item.quantity);
  const [unit,setUnit] = useState(item.unit);
  const [emoji,setEmoji] = useState(item.emoji);
  const [date,setDate] = useState(new Date(item.date));
  const [foodList,setFoodList] = store.useState("foodList");


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
            <Text style={styles.title}>expiration date</Text>
            <DateTimePicker value={date} onChange={(event, selected) => setDate(selected)} mode="date" />
            <TouchableOpacity
                style={[styles.button,styles.buttonClose]}
                onPress={async ()=> {
                  await updateErrorCheck({name:name, quantity:quantity, unit:unit, emoji:emoji, date:date}, setFoodList, addFood);
                  navigation.goBack();
                }}>
                {isAdd ?
                <Text style={styles.textStyle}>Add</Text>
                :
                <Text style={styles.textStyle}>Save</Text>
                }
            </TouchableOpacity>
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
  );
}

async function addFood(item,setFoodList){
  const message={
    "name": item.name,
    "emoji": item.emoji,
    "quantity": item.quantity,
    "unit": item.unit,
    "date": item.date,
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