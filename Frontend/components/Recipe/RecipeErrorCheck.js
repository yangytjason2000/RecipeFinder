import Amplify,{ Auth } from 'aws-amplify';
import { Alert } from 'react-native';
export async function updateErrorCheck(name,ingredient,method,updateMethod,dispatch){
  try {
    await Auth.currentAuthenticatedUser()
    .then(()=>updateMethod(name,ingredient,method,dispatch))
  } catch (error) {
    Alert.alert('Update error',error.message, [{ text: 'Ok' }]);
  }
}