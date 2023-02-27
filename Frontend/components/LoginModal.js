import { Modal, StyleSheet, Text, View, Button, ImageBackground, Pressable, TouchableOpacity, Image, TextInput} from 'react-native';
import { useState,useRef,useEffect } from 'react';
import Amplify,{ Auth } from 'aws-amplify';
import { FadeInView } from './FadeInView';
import { styles } from '../styles';

export default function LoginModal({modalVisible,setModalVisible,setSignupModalVisible,
  setFoodList,setSignedIn,loginFlag=true}) {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [useremail,setUserEmail] = useState('');
    const [emailsent,setEmailSent] = useState(false);
    const [confirmation,setConfirmation] = useState('');
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
            <Text>Password</Text>
            <TextInput style={styles.input} onChangeText={setPassword} value={password}/>
            {!loginFlag && <Text>Email</Text>}
            {!loginFlag && <TextInput style={styles.input} onChangeText={setUserEmail} value={useremail}/>}
            {(!loginFlag && emailsent) && <Text>Confirmation Code</Text>}
            {(!loginFlag && emailsent) && <TextInput style={styles.input} onChangeText={setConfirmation} value={confirmation}/>}
            {loginFlag && <TouchableOpacity
                style={[styles.button,styles.buttonClose]}
                onPress={()=> signIn(username,password,setSignedIn)}>
                <Text style={styles.textStyle}>Login</Text>
            </TouchableOpacity>}
            {loginFlag && <TouchableOpacity
              style={[styles.button,styles.buttonClose]}
              onPress={()=> {setModalVisible(false);setSignupModalVisible(true);}}>
              <Text style={styles.textStyle}>Sign Up</Text>
            </TouchableOpacity>}
            {!loginFlag && <TouchableOpacity
              style={[styles.button,styles.buttonClose]}
              onPress={()=> signUp(username,password,useremail)}>
              <Text style={styles.textStyle}>Sign Up</Text>
            </TouchableOpacity>}
            {(!loginFlag && emailsent) && <TouchableOpacity
              style={[styles.button,styles.buttonClose]}
              onPress={()=> confirm(username,confirmation)}>
              <Text style={styles.textStyle}>Confirm</Text>
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
async function confirm(username,confirmation) {
  await Auth.confirmSignUp(username, confirmation)
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });
}
async function signUp(username,password,email) {
  console.log(username);
  try {
      const { user } = await Auth.signUp({
          username,
          password,
          attributes:{
            email: email,
          },
          autoSignIn: { // optional - enables auto sign in after user is confirmed
              enabled: true,
          }
      });
      console.log(user);
      setEmailSent(true);
  } catch (error) {
      console.log('error signing up:', error);
  }
}
async function signIn(username,password,setSignedIn) {
  try {
      const { user } = await Auth.signIn({
          username,
          password,
          autoSignIn: { // optional - enables auto sign in after user is confirmed
              enabled: true,
          }
      });
      console.log(user);
      setSignedIn(true);
  } catch (error) {
      console.log('error sigining in:', error);
  }
}