import Amplify,{ Auth } from 'aws-amplify';
export async function getRecipe(setRecipeList){
    await fetch('https://gdh7356lm2.execute-api.us-west-1.amazonaws.com/prod/recipe',{
      method: "GET",
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getIdToken()
          .getJwtToken()}`
      }
    })
    .then(response=>response.json())
    .then(responseData=>{setRecipeList(responseData)})
}