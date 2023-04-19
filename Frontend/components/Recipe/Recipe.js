import { Modal, Animated, Text, View, Alert, FlatList, SafeAreaView, TouchableOpacity,} from 'react-native';
import { useState,useRef,useEffect } from 'react';
import Amplify,{ Auth } from 'aws-amplify';
import { styles } from '../../styles';
import { getRecipe } from '../getRecipe';
import store from '../store';
import Item from './RecipeItem';
import { updateErrorCheck } from './RecipeErrorCheck';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';

export default function Recipe({navigation}) {
  const [recipeList,setRecipeList] = store.useState("recipeList");
  const [isRecommend,setIsRecommend] = store.useState("isRecommend");

  const [searchQuery, setSearchQuery] = useState('');


  const swipeableRefs = useRef({});

  const navigateToRecipe = (item) => {
    navigation.navigate('Modify Recipe',
    {initName:item.name,initIngredient:item.ingredient,initMethod:item.method,isAdd:false})
  }

  const handleDelete = async (item) => {
    await updateErrorCheck(item.name,item.ingredient,item.method,setRecipeList,removeRecipe);
    if (swipeableRefs.current[item.name]) {
      swipeableRefs.current[item.name].close();
      delete swipeableRefs.current[item.name];
    }
  }

  return (
    <View style={styles.fridgeContainer}>
      <SearchBar
        platform={Platform.OS}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search"
        containerStyle={{ backgroundColor: '#E8E8E8' }}
      />
      <View style={styles.container}>
      <FlatList
        data={recipeList ? recipeList.filter(item => item.name.includes(searchQuery)): []}
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
        onSwipeableWillOpen={() => {  swipeableRefs.current[item.name].swiping = true; }}
        onSwipeableWillClose={() => {  swipeableRefs.current[item.name].swiping = false; }}>
        <Item recipe={item} navigateToRecipe={navigateToRecipe}/>
        </Swipeable>}
      />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity  onPress={()=>navigation.navigate('Modify Recipe',{name:'',ingredient:[],method:'',isAdd:true})} 
        style={styles.iosbutton}>
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
  await fetch('https://gdh7356lm2.execute-api.us-west-1.amazonaws.com/prod/recipes?database=recipe&mode=recommend',{
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
  await fetch('https://gdh7356lm2.execute-api.us-west-1.amazonaws.com/prod/recipes?database=recipe',{
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