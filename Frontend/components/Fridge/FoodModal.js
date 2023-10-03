import { Modal, TouchableWithoutFeedback, Text, View, Keyboard, Alert, TouchableOpacity, TextInput} from 'react-native';
import { useState,useRef,useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Amplify,{ Auth } from 'aws-amplify';
import { styles } from '../../styles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { updateErrorCheck } from './FridgeErrorCheck';
import store from '../store';
import { useDispatch } from 'react-redux';
import { changeFoodList } from '../../reducers/foodListReducer';

export default function FoodModal({route,navigation}) {
  const {item,isAdd} = route.params;
  const [name,setName] = useState(item.name);
  const [quantity,setQuantity] = useState(item.quantity);
  const [unit,setUnit] = useState(item.unit);
  const [emoji,setEmoji] = useState(item.emoji);
  const [date,setDate] = useState(new Date(item.date));
  const [datePickerVisible,setDatePickerVisible] = useState(false);

  const dispatch = useDispatch();

  const showDatePicker = () => {
    setDatePickerVisible(true);
  }
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  }
  const handleDateConfirm = (selectedDate) => {
    setDate(selectedDate);
    setDatePickerVisible(false);
  }
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
            <Text 
              style={styles.title}>
                expiration date
            </Text>
            <TouchableOpacity onPress={showDatePicker}>
              <Text 
                style=
                  {
                    { fontSize: 24, 
                      fontWeight: 'bold', 
                      marginBottom: 20, 
                      color: date>new Date() ? 'green' : 'red'}
                  }>
                {date ? date.toLocaleDateString() : 'No date selected'}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={datePickerVisible}
              date={date} 
              onConfirm={handleDateConfirm} 
              onCancel={hideDatePicker}
              mode="date" />
            <TouchableOpacity
                style={[styles.button,styles.buttonClose]}
                onPress={async ()=> {
                  await updateErrorCheck(
                    {name:name, quantity:quantity, unit:unit, emoji:emoji, date:date}, addFood,dispatch);
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

async function addFood(item,dispatch){
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
        dispatch(changeFoodList(response));
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