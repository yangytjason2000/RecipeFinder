import { Modal, StyleSheet, Text, View, Button, ImageBackground, Pressable, TouchableOpacity, Alert, TextInput} from 'react-native';
import { useState,useRef,useEffect } from 'react';
import Amplify,{ Auth } from 'aws-amplify';
import { FadeInView } from './FadeInView';
import { getFood } from './getFood';
import { getRecipe } from './getRecipe';
import { styles } from '../styles';

export default function LoginModal({modalVisible,setModalVisible,setSignupModalVisible,
  setFoodList,setRecipeList,setSignedIn,loginFlag=true}) {
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
            <TextInput style={styles.input} onChangeText={setPassword} value={password} secureTextEntry={true}/>
            {!loginFlag && <Text>Email</Text>}
            {!loginFlag && <TextInput style={styles.input} onChangeText={setUserEmail} value={useremail}/>}
            {(!loginFlag && emailsent) && <Text>Confirmation Code</Text>}
            {(!loginFlag && emailsent) && <TextInput style={styles.input} onChangeText={setConfirmation} value={confirmation}/>}
            {loginFlag && <TouchableOpacity
                style={[styles.button,styles.buttonClose]}
                onPress={()=> {signIn(username,password,setSignedIn);getFood(setFoodList);getRecipe(setRecipeList)}}>
                <Text style={styles.textStyle}>Login</Text>
            </TouchableOpacity>}
            {loginFlag && <TouchableOpacity
              style={[styles.button,styles.buttonClose]}
              onPress={()=> {setModalVisible(false);setSignupModalVisible(true);}}>
              <Text style={styles.textStyle}>Sign Up</Text>
            </TouchableOpacity>}
            {(!loginFlag && !emailsent) && <TouchableOpacity
              style={[styles.button,styles.buttonClose]}
              onPress={()=> signUp(username,password,useremail,setEmailSent)}>
              <Text style={styles.textStyle}>Sign Up</Text>
            </TouchableOpacity>}
            {(!loginFlag && emailsent) && <TouchableOpacity
              style={[styles.button,styles.buttonClose]}
              onPress={()=> confirm(username,confirmation,setSignedIn)}>
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
async function confirm(username,confirmation,setSignedIn) {
  await Auth.confirmSignUp(username, confirmation)
  .then(data => {
    console.log(data);
    setSignedIn(true);
  })
  .catch(err => {
    console.log(err);
  });
}
async function signUp(username,password,email,setEmailSent) {
  try {
      const { user } = await Auth.signUp({
          username,
          password,
          attributes:{
            email: email,
          },
          autoSignIn: {
              enabled: true,
          }
      });
      setEmailSent(true);
  } catch (error) {
      console.log(error);
  }
}
async function signIn(username,password,setSignedIn) {
  try {
      const { user } = await Auth.signIn({
          username,
          password,
      });
      setSignedIn(true);
  } catch (error) {
      console.log(error)
  }
}