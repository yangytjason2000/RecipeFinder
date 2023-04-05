import { Modal, StyleSheet, Text, View, Button, FlatList, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView, ImageBackground} from 'react-native';
import { useState,useRef,useEffect } from 'react';
import { FadeInView } from './FadeInView';
import { styles } from '../styles';
import FoodModal from './FoodModal';
import Item from './FoodItem';
export default function RecipeFridge({foodList,setFoodList}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [foodModalVisible,setFoodModalVisible] = useState(false);

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
  return (
    <View style={styles.recipeContainer}>
      <SafeAreaView style={styles.container}>
      <FlatList
        data={foodList}
        renderItem={({item}) => <Item food={item} setName={setSelectedName} setEmoji={setSelectedEmoji} 
        setNumber={setSelectedNumber} setUnit={setSelectedUnit} setDate={setSelectedDate} 
        setFoodModalVisible={setFoodModalVisible} isRecipe={true}/>}
      />
      </SafeAreaView>
      <FoodModal modalVisible={modalVisible} setModalVisible={setModalVisible} 
      name={name} emoji={emoji} number={number} unit={unit} date={date} foodList={foodList}
      setName={setName} setEmoji={setEmoji} setNumber={setNumber} setUnit={setUnit}
      setDate={setDate} setFoodList={setFoodList} isRecipe={true}/>
      <FoodModal modalVisible={foodModalVisible} setModalVisible={setFoodModalVisible} 
      name={selectedName} emoji={selectedEmoji} number={selectedNumber} unit={selectedUnit} date={selectedDate} foodList={foodList}
      setName={setSelectedName} setEmoji={setSelectedEmoji} setNumber={setSelectedNumber} setUnit={setSelectedUnit}
      setDate={setSelectedDate} setFoodList={setFoodList} deleteFlag={true} isRecipe={true}/>
      <View style={styles.buttonContainer}>
      <TouchableOpacity  onPress={()=>setModalVisible(true)} style={[styles.button,styles.buttonClose]}>
        <Text style={styles.textStyle}>Add Food</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}