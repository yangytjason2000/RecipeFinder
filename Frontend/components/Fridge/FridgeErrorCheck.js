import Amplify,{ Auth } from 'aws-amplify';
import { Alert } from 'react-native';
export async function updateErrorCheck(item,updateMethod,dispatch){
  try {
    Auth.currentAuthenticatedUser()
    .then(()=>updateMethod(item,dispatch))
  } catch (error) {
    Alert.alert('Update error',error.message, [{ text: 'Ok' }]);
  }
}