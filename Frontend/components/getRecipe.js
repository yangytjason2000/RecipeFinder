import Amplify,{ Auth } from 'aws-amplify';
export async function getRecipe(setRecipeList){
    await fetch('https://gdh7356lm2.execute-api.us-west-1.amazonaws.com/prod/recipes?database=recipe&mode=all',{
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