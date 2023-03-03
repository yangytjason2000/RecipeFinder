import Amplify,{ Auth } from 'aws-amplify';
export async function getFood(setFoodList){
    await fetch('https://gdh7356lm2.execute-api.us-west-1.amazonaws.com/prod/ingredient',{
      method: "GET",
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getIdToken()
          .getJwtToken()}`
      }
    })
    .then(response=>response.json())
    .then(responseData=>{setFoodList(responseData)})
}