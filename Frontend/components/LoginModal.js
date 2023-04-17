import { Modal, Text, View, Keyboard,TouchableOpacity, Alert, TextInput,TouchableWithoutFeedback} from 'react-native';
import { useState,useRef,useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Amplify,{ Auth } from 'aws-amplify';
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
        <KeyboardAwareScrollView>
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
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
                onPress={()=> signIn(username,password,setSignedIn,setFoodList,setRecipeList,setModalVisible)}>
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
        </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
        </Modal>
  );
}
async function confirm(username,confirmation,setSignedIn) {
  await Auth.confirmSignUp(username, confirmation)
  .then(data => {
    setSignedIn(true);
  })
  .catch(error => {
    Alert.alert('Confirmation error',error.message, [{ text: 'Ok' }]);
  });
}
async function signUp(username,password,email,setEmailSent) {
  try {
      await Auth.signUp({
          username,
          password,
          attributes:{
            email: email,
          },
          autoSignIn: {
              enabled: true,
          }
      })
      .then(response=>setEmailSent(true));
  } catch (error) {
    Alert.alert('Sign up error',error.message, [{ text: 'Ok' }]);
  }
}
async function signIn(username,password,setSignedIn,setFoodList,setRecipeList,setModalVisible) {
  try {
      await Auth.signIn({
          username,
          password,
      })
      .then(response=>{setSignedIn(true);getFood(setFoodList);getRecipe(setRecipeList);setModalVisible(false)})
  } catch (error) {
    Alert.alert('Login error',error.message, [{ text: 'Ok' }]);
  }
}