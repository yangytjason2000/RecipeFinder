import Amplify,{ Auth } from 'aws-amplify';
import { Alert } from 'react-native';
export async function updateErrorCheck(item,setFoodList,updateMethod){
  try {
    await Auth.currentAuthenticatedUser()
    .then(()=>updateMethod(item,setFoodList))
  } catch (error) {
    Alert.alert('Update error',error.message, [{ text: 'Ok' }]);
  }
}