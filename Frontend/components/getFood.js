import { useEffect } from "react";
export function getFood(setFoodList){
useEffect(()=>{
    fetch('https://xj8samw1ed.execute-api.us-west-1.amazonaws.com/prod/ingredient',{
      method: "GET",
    })
    .then(response=>response.json())
    .then(responseData=>{setFoodList(responseData)})
},[])}