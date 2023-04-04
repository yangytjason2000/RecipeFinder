import { Modal, StyleSheet, Text, View, Alert, FlatList, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView, ImageBackground} from 'react-native';
import { useState,useRef,useEffect } from 'react';
import Amplify,{ Auth } from 'aws-amplify';
import { styles } from '../styles';
import { getRecipe } from './getRecipe';
import RecipeModal from './RecipeModal';
import Item from './RecipeItem';
export default function Recipe({setStatus,recipeList,setRecipeList,isRecommend,setIsRecommend,setFoodList}) {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [RecipeModalVisible,setRecipeModalVisible] = useState(false);
  //name,emoji,number
  const [name,setName] = useState('');
  const [ingredient,setIngredient] = useState([]);
  const [method,setMethod] = useState('');

  const [selectedName,setSelectedName] = useState('');
  const [selectedIngredient,setSelectedIngredient] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState('');
  return (
    <View style={styles.fridgeContainer}>
      <SafeAreaView style={styles.container}>
      <FlatList
        data={recipeList}
        renderItem={({item}) => <Item recipe={item} setName={setSelectedName} setIngredient={setSelectedIngredient}
        setMethod={setSelectedMethod} setRecipeModalVisible={setRecipeModalVisible}/>}
      />
      </SafeAreaView>
      <RecipeModal modalVisible={addModalVisible} setModalVisible={setAddModalVisible} 
      name={name} ingredient={ingredient} method={method} 
      setName={setName} setIngredient={setIngredient} setMethod={setMethod} 
      setRecipeList={setRecipeList} isAdd={true} setFoodList={setFoodList}>
      </RecipeModal>
      <RecipeModal modalVisible={RecipeModalVisible} setModalVisible={setRecipeModalVisible} 
      name={selectedName} ingredient={selectedIngredient} method={selectedMethod} 
      setName={setSelectedName} setIngredient={setSelectedIngredient} setMethod={setSelectedMethod} 
      setRecipeList={setRecipeList} setFoodList={setFoodList}>
      </RecipeModal>
      <View style={styles.buttonLayout}>
        <TouchableOpacity  onPress={()=>setAddModalVisible(true)} style={[styles.button,styles.buttonClose]}>
        <Text style={styles.textStyle}>Add</Text>
        </TouchableOpacity>
        {!isRecommend && <TouchableOpacity  onPress={()=>getRecommendRecipe(setRecipeList,setIsRecommend)} 
        style={[styles.button,styles.buttonClose]}>
        <Text style={styles.textStyle}>Recommend</Text>
        </TouchableOpacity>}
        {isRecommend && <TouchableOpacity  onPress={()=>getAllRecipe(setRecipeList,setIsRecommend)} 
        style={[styles.button,styles.buttonClose]}>
        <Text style={styles.textStyle}>Get All Recipes</Text>
        </TouchableOpacity>}
        <TouchableOpacity onPress={()=>setStatus(0)} style={[styles.button,styles.buttonClose]}>
        <Text style={styles.textStyle}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
async function getRecommendRecipe(setRecipeList,setIsRecommend){
  await fetch('https://gdh7356lm2.execute-api.us-west-1.amazonaws.com/prod/recipe/recommend',{
    method: "GET",
    headers: {
      Authorization: `Bearer ${(await Auth.currentSession())
        .getIdToken()
        .getJwtToken()}`
    }
  })
  .then(response => response.json())
  .then(response => {setRecipeList(response);setIsRecommend(true)})
  .catch(error => {
    Alert.alert('Error',error.message, [{ text: 'Ok' }]);
  });
}
async function getAllRecipe(setRecipeList,setIsRecommend){
  await getRecipe(setRecipeList)
  .then(response => setIsRecommend(false))
  .catch(error => {
    Alert.alert('Error',error.message, [{ text: 'Ok' }]);
  });
}