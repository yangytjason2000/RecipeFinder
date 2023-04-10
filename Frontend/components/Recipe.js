import { Modal, Animated, Text, View, Alert, FlatList, SafeAreaView, TouchableOpacity,} from 'react-native';
import { useState,useRef,useEffect } from 'react';
import Amplify,{ Auth } from 'aws-amplify';
import { styles } from '../styles';
import { getRecipe } from './getRecipe';
import RecipeModal from './RecipeModal';
import store from './store';
import Item from './RecipeItem';
import { updateErrorCheck } from './RecipeErrorCheck';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
export default function Recipe({navigation}) {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [RecipeModalVisible,setRecipeModalVisible] = useState(false);

  const [foodList, setFoodList] = store.useState("foodList");
  const [recipeList,setRecipeList] = store.useState("recipeList");
  const [isRecommend,setIsRecommend] = store.useState("isRecommend");

  //name,emoji,number
  const [name,setName] = useState('');
  const [ingredient,setIngredient] = useState([]);
  const [method,setMethod] = useState('');

  const [selectedName,setSelectedName] = useState('');
  const [selectedIngredient,setSelectedIngredient] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState('');


  const swiping = useRef({});

  const swipeableRefs = useRef({});

  useEffect(() => {
    for (const key in swiping.current) {
      if (swiping.current[key] === false) {
        if (swipeableRefs.current[key]!=null){
          swipeableRefs.current[key].close();
        }
      }
    }
  }, [recipeList]);


  const handleDelete = async (item) => {
    await updateErrorCheck(item.name,item.ingredient,item.method,setRecipeList,removeRecipe);
    delete swiping.current[item.name]
  }

  return (
    <View style={styles.fridgeContainer}>
      <View style={styles.container}>
      <FlatList
        data={recipeList}
        renderItem={({item}) => 
        <Swipeable 
          ref={ref => swipeableRefs.current[item.name] = ref}
          renderRightActions={(progress,dragX) => 
          <TouchableOpacity
          onPress={() => handleDelete(item)}
          >
            <Animated.View
              style={[
                styles.deleteButton,
                {
                transform: [
                {
                  translateX: dragX.interpolate({
                  inputRange: [-70, 0],
                  outputRange: [0, 70],
                  extrapolate: 'clamp',
                  }),
                },
              ],
              },
            ]}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </Animated.View>
       </TouchableOpacity>
       
        }
        onSwipeableWillOpen={() => { swiping.current[item.name] = true; }}
        onSwipeableWillClose={() => { swiping.current[item.name] = false; }}>
        <Item recipe={item} setName={setSelectedName} setIngredient={setSelectedIngredient}
        setMethod={setSelectedMethod} setRecipeModalVisible={setRecipeModalVisible}/>
        </Swipeable>}
      />
      </View>
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity  onPress={()=>setAddModalVisible(true)} style={styles.iosbutton}>
          <AntDesign name="pluscircleo" size={24} color="#007AFF" />
          <Text style={styles.addTextStyle}> New Recipe</Text>
        </TouchableOpacity>
        {!isRecommend && <TouchableOpacity  
        onPress={async ()=>await recommendErrorCheck(setRecipeList,setIsRecommend,getRecommendRecipe)} 
        style={styles.iosbutton}>
          <MaterialCommunityIcons name='thumb-up' size={22} color='green'/>
          <Text style={styles.recommendTextStyle}> Recommend</Text>
        </TouchableOpacity>}
        {isRecommend && <TouchableOpacity 
        onPress={async ()=>await recommendErrorCheck(setRecipeList,setIsRecommend,getAllRecipe)} 
        style={styles.iosbutton}>
        <Text style={styles.recommendTextStyle}>All Recipes</Text>
        </TouchableOpacity>}
      </View>
    </View>
  );
}
async function recommendErrorCheck(setRecipeList,setIsRecommend,recommendMethod){
  try {
    await Auth.currentAuthenticatedUser()
    .then(()=>recommendMethod(setRecipeList,setIsRecommend))
  } catch (error) {
    Alert.alert('Recommend error',error.message, [{ text: 'Ok' }]);
  }
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
async function removeRecipe(name,ingredient,method,setRecipeList){
  const message={
    "name": name,
    "ingredient": ingredient,
    "method": method
  }
  await fetch('https://gdh7356lm2.execute-api.us-west-1.amazonaws.com/prod/recipe',{
    method: "DELETE",
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
        setRecipeList(response);;
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