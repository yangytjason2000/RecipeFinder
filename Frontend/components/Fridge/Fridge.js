import { Modal, Animated, Text, View, Button, FlatList, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView, ImageBackground} from 'react-native';
import { useState,useRef,useEffect } from 'react';
import { styles } from '../../styles';
import FoodModal from './FoodModal';
import { Auth } from 'aws-amplify';
import { updateErrorCheck } from './FridgeErrorCheck';
import { Swipeable } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import Item from './FoodItem';
import { SearchBar } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { changeFoodList } from '../../reducers/foodListReducer';
export default function Fridge({navigation}) {

  const foodList = useSelector((state) => state.foodList.foodList);

  const [searchQuery, setSearchQuery] = useState('');

  const swipeableRefs = useRef({});

  const dispatch = useDispatch();

  const handleDelete = async (item) => {
    await updateErrorCheck(item,removeFood,dispatch);
    if (swipeableRefs.current[item.name]) {
      swipeableRefs.current[item.name].close();
      delete swipeableRefs.current[item.name];
    }
  }

  const navigateToFridge= (item) => {
    navigation.navigate('Modify Food',
    {item:item,isAdd: false})
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
        data={foodList ? foodList.filter(item => (item.name.includes(searchQuery) || item.emoji.includes(searchQuery))): []}
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
        onSwipeableWillOpen={() => { swipeableRefs.current[item.name].swiping = true;}}
        onSwipeableWillClose={() => { swipeableRefs.current[item.name].swiping = false;}}>
          <Item food={item} navigateToFridge={navigateToFridge}/>
        </Swipeable>}
      />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity  onPress=
          {()=>
            navigation.navigate('Modify Food',
            {item:{name:'',quantity:'',unit:'',emoji:'',date:(new Date()).toISOString()},isAdd:true})} 
          style={styles.iosbutton}>
          <AntDesign name="pluscircleo" size={24} color="#007AFF" />
          <Text style={styles.addTextStyle}> New Food</Text>
        </TouchableOpacity>
    </View>
    </View>
  );
}
async function removeFood(item,dispatch){
  const message={
    "name": item.name,
    "emoji": item.emoji,
    "quantity": item.quantity,
    "unit": item.unit,
    "date": item.date,
  }
  await fetch('https://gdh7356lm2.execute-api.us-west-1.amazonaws.com/prod/ingredients?database=ingredient',{
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
        dispatch(changeFoodList(response));
      })
    }
    else{
      response.json().then(error=>{
        Alert.alert('Error',error.message,[{text: 'OK'}]);
      })
    }
  })
  .catch(error => {
    Alert.alert('Remove error',error.message, [{ text: 'Ok' }]);
  });
}