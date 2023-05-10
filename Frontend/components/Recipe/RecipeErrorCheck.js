import Amplify,{ Auth } from 'aws-amplify';
import { Alert } from 'react-native';
export async function updateErrorCheck(name,ingredient,method,setRecipeList,updateMethod){
  try {
    await Auth.currentAuthenticatedUser()
    .then(()=>updateMethod(name,ingredient,method,setRecipeList))
  } catch (error) {
    Alert.alert('Update error',error.message, [{ text: 'Ok' }]);
  }
}