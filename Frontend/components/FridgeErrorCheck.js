import Amplify,{ Auth } from 'aws-amplify';
import { Alert } from 'react-native';
export async function updateErrorCheck(name,number,unit,emoji,date,setFoodList,updateMethod){
  try {
    await Auth.currentAuthenticatedUser()
    .then(()=>updateMethod(name,number,unit,emoji,date,setFoodList))
  } catch (error) {
    Alert.alert('Update error',error.message, [{ text: 'Ok' }]);
  }
}