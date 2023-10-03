import Amplify,{ Auth } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { changeFoodList } from '../reducers/foodListReducer';
export async function getFood(dispatch){
    fetch('https://gdh7356lm2.execute-api.us-west-1.amazonaws.com/prod/ingredients?database=ingredient&mode=all',{
      method: "GET",
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getIdToken()
          .getJwtToken()}`
      }
    })
    .then(response=>response.json())
    .then(responseData=>{dispatch(changeFoodList(responseData))})
}