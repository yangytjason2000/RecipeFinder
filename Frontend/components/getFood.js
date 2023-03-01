import { useEffect } from "react";
export function getFood(setFoodList){
useEffect(()=>{
    fetch('https://v4o0dzr6rl.execute-api.us-west-1.amazonaws.com/prod/ingredient',{
      method: "GET",
    })
    .then(response=>response.json())
    .then(responseData=>{setFoodList(responseData)})
},[])}