import Amplify,{ Auth } from 'aws-amplify';
export async function getUsername(setUserName){
    await Auth.currentUserInfo()
    .then(response=>setUserName(response.username))
    .catch(()=>setUserName(null))
}