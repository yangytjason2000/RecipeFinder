import { Modal, StyleSheet, Text, View, Button, ImageBackground, Pressable, TouchableOpacity, Image, TextInput} from 'react-native';
import { useState,useRef,useEffect } from 'react';
import { FadeInView } from './FadeInView';
import { styles } from '../styles';

export default function LoginModal({modalVisible,setModalVisible,setSignupModalVisible,setFoodList,loginFlag=true}) {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
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
          <View style={styles.modalView}>
            <Text>Username</Text>
            <TextInput style={styles.input} onChangeText={setUsername} value={username}/>
            <Text>Username</Text>
            <TextInput style={styles.input} onChangeText={setPassword} value={password}/>
            {loginFlag && <TouchableOpacity
                style={[styles.button,styles.buttonClose]}
                onPress={()=> login(username,password,setFoodList)}>
                <Text style={styles.textStyle}>Login</Text>
            </TouchableOpacity>}
            {loginFlag && <TouchableOpacity
              style={[styles.button,styles.buttonClose]}
              onPress={()=> {setModalVisible(false);setSignupModalVisible(true);}}>
              <Text style={styles.textStyle}>Sign Up</Text>
            </TouchableOpacity>}
            {!loginFlag && <TouchableOpacity
              style={[styles.button,styles.buttonClose]}
              onPress={()=> signup(username,password)}>
              <Text style={styles.textStyle}>Sign Up</Text>
            </TouchableOpacity>}
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
        </Modal>
  );
}
async function login(username,password,setFoodList){
    const message={
        "username": username,
        "password": password,
    }
    await fetch('https://a4o8ta8sa4.execute-api.us-east-2.amazonaws.com/prod/ingredient',{
        method: "GET",
        body: JSON.stringify(message),
    })
    .then(response => {console.log(response.status); return response.json();})
    .then(response=>setFoodList(response))
}
async function signup(username,password){
    const message={
        "username": username,
        "password": password,
    }
    await fetch('https://a4o8ta8sa4.execute-api.us-east-2.amazonaws.com/prod/ingredient',{
        method: "POST",
        body: JSON.stringify(message),
    })
    .then(response => {console.log(response.status); return response.json();})
}