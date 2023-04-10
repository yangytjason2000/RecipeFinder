import { Modal, Animated, Text, View, Button, FlatList, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView, ImageBackground} from 'react-native';
import { useState,useRef,useEffect } from 'react';
import { styles } from '../styles';
import FoodModal from './FoodModal';
import { Auth } from 'aws-amplify';
import { updateErrorCheck } from './FridgeErrorCheck';
import { Swipeable } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import store from './store';
import Item from './FoodItem';
export default function Fridge({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [foodModalVisible,setFoodModalVisible] = useState(false);

  const [foodList, setFoodList] = store.useState("foodList");
  //name,emoji,number
  const [name,setName] = useState('');
  const [emoji,setEmoji] = useState('');
  const [number,setNumber] = useState('');
  const [unit,setUnit] = useState('');
  const [date,setDate] = useState(new Date());
  
  const [selectedName,setSelectedName] = useState('');
  const [selectedEmoji,setSelectedEmoji] = useState('');
  const [selectedNumber,setSelectedNumber] = useState('');
  const [selectedUnit,setSelectedUnit] = useState('');
  const [selectedDate,setSelectedDate] = useState(new Date());

  const swiping = useRef({});

  const swipeableRefs = useRef({});

  useEffect(() => {
    for (const key in swipeableRefs.current){
      if (swiping.current[key]!=null){
        if (swiping.current[key] === false) {
          if (swipeableRefs.current[key]!=null){
            swipeableRefs.current[key].close();
          }
        }
      }
      else{
        if (swipeableRefs.current[key]!=null){
          swipeableRefs.current[key].close();
        }
      }
    }
  }, [foodList]);


  const handleDelete = async (item) => {
    await updateErrorCheck(item.name,item.number,item.unit,item.emoji,item.date,setFoodList,removeFood);
    delete swipeableRefs.current[item.name];
    delete swiping.current[item.name];
  }

  return (
    <View style={styles.fridgeContainer}>
      <View style={styles.container}>
      <FlatList
        data={foodList}
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
        <Item food={item} setName={setSelectedName} setEmoji={setSelectedEmoji} 
        setNumber={setSelectedNumber} setUnit={setSelectedUnit} setDate={setSelectedDate} 
        setFoodModalVisible={setFoodModalVisible} isRecipe={false}/>
        </Swipeable>}
      />
      </View>
      <FoodModal modalVisible={modalVisible} setModalVisible={setModalVisible} 
      name={name} emoji={emoji} number={number} unit={unit} date={date} foodList={foodList}
      setName={setName} setEmoji={setEmoji} setNumber={setNumber} setUnit={setUnit}
      setDate={setDate} setFoodList={setFoodList} isRecipe={false}/>
      <FoodModal modalVisible={foodModalVisible} setModalVisible={setFoodModalVisible} 
      name={selectedName} emoji={selectedEmoji} number={selectedNumber} unit={selectedUnit} date={selectedDate} foodList={foodList}
      setName={setSelectedName} setEmoji={setSelectedEmoji} setNumber={setSelectedNumber} setUnit={setSelectedUnit}
      setDate={setSelectedDate} setFoodList={setFoodList} deleteFlag={true} isRecipe={false}/>
      <View style={styles.buttonContainer}>
        <TouchableOpacity  onPress={()=>setModalVisible(true)} style={styles.iosbutton}>
          <AntDesign name="pluscircleo" size={24} color="#007AFF" />
          <Text style={styles.addTextStyle}> New Food</Text>
        </TouchableOpacity>
    </View>
    </View>
  );
}
async function removeFood(name,number,unit,emoji,date,setFoodList){
  const message={
    "name": name,
    "emoji": emoji,
    "quantity": number,
    "unit": unit,
    "date": date,
  }
  await fetch('https://gdh7356lm2.execute-api.us-west-1.amazonaws.com/prod/ingredient',{
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
        setFoodList(response);
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