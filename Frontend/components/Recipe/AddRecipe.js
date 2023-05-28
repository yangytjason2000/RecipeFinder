import Amplify,{ Auth } from 'aws-amplify';
import { Alert } from 'react-native';

export async function addRecipe(name,ingredient,method,setRecipeList){
  const message={
    "name": name,
    "ingredient": ingredient,
    "method": method,
    "date": new Date(),
  }
  await fetch('https://gdh7356lm2.execute-api.us-west-1.amazonaws.com/prod/recipes?database=recipe&mode=single',{
    method: "POST",
    body: JSON.stringify(message),
    headers: {
      Authorization: `Bearer ${(await Auth.currentSession())
        .getIdToken()
        .getJwtToken()}`
    }
  })
  .then(response => {
    if (response.ok){
      response.json().then(response=>{
        setRecipeList(response);
      })
    }
    else{
      response.json().then(error=>{
        Alert.alert('Error',error.message,[{text: 'OK'}]);

      })
    }
  })
  .catch(error => {
    Alert.alert('Update error',error.message, [{ text: 'Ok' }]);
  });
}