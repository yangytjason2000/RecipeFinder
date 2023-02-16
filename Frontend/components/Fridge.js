import { Modal, StyleSheet, Text, View, Button, ImageBackground, Pressable, TouchableOpacity, Image, TextInput} from 'react-native';
import { useState,useRef,useEffect } from 'react';
import { FadeInView } from './FadeInView';
import { styles } from '../styles';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Fridge({setStatus}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [number,setNumber] = useState('');
  const [emoji,setEmoji] = useState('');
  const [date, setDate] = useState(new Date())
  return (
    <FadeInView style={styles.container}>
      <ImageBackground source={require( '../assets/background.png')} style={styles.imageBackground}>     
        <Image source={require( '../assets/open.png') } style={styles.open}></Image>
        <TouchableOpacity onPress={()=>setStatus(0)} style={styles.back}>
          <Image source={require( '../assets/back.png')}></Image>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput style={styles.input} onChangeText={setName} value={name}/>
            <TextInput style={styles.input} onChangeText={setNumber} value={number}/>
            <TextInput style={styles.input} onChangeText={setEmoji} value={emoji}/>
            <DateTimePicker value={date} onChange={(event, selected) => setDate(selected)} mode="date" />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Back</Text>
            </Pressable>
            <Pressable 
              style={[styles.button,styles.buttonClose]}
              onPress={()=> addFood(name,number,emoji)}>
              <Text style={styles.textStyle}>Add</Text>
            </Pressable>
          </View>
        </View>
        </Modal>
        <TouchableOpacity onPress={()=>setModalVisible(true)} style={styles.add}>
          <Image source={require( '../assets/add.png')}></Image>
        </TouchableOpacity>
      </ImageBackground>
    </FadeInView>
  );
}
async function addFood(name,number,emoji){
  const message={
    "name": name,
    "emoji": emoji,
    "quantity": number,
  }
  await fetch('https://a4o8ta8sa4.execute-api.us-east-2.amazonaws.com/prod/ingredient',{
    method: "POST",
    body: JSON.stringify(message),
  })
  .then(response => {console.log(response.status); return response.json();})
  .then(response=>console.log(response))
}