import { useEffect } from "react";
export function getFood(setFoodList){
useEffect(()=>{
    fetch('https://a4o8ta8sa4.execute-api.us-east-2.amazonaws.com/prod/ingredient',{
      method: "GET",
    })
    .then(response=>response.json())
    .then(responseData=>{setFoodList(responseData)})
},[])}