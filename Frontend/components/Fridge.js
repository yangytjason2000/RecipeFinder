import { Modal, StyleSheet, Text, View, Button, FlatList, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView} from 'react-native';
import { useState,useRef,useEffect } from 'react';
import { FadeInView } from './FadeInView';
import { styles } from '../styles';
import FoodModal from './FoodModal';
import Item from './FoodItem';
export default function Fridge({setStatus,foodList}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [foodModalVisible,setFoodModalVisible] = useState(false);
  //name,emoji,number
  const [name,setName] = useState('');
  const [emoji,setEmoji] = useState('');
  const [number,setNumber] = useState('');
  const [date,setDate] = useState(new Date());

  const [selectedName,setSelectedName] = useState('');
  const [selectedEmoji,setSelectedEmoji] = useState('');
  const [selectedNumber,setSelectedNumber] = useState('');
  const [selectedDate,setSelectedDate] = useState(new Date());
  return (
    <View style={styles.fridgeContainer}>
      <SafeAreaView style={styles.container}>
      <FlatList
        data={foodList}
        renderItem={({item}) => <Item food={item} setName={setSelectedName} setEmoji={setSelectedEmoji} 
        setNumber={setSelectedNumber} setDate={setSelectedDate} setFoodModalVisible={setFoodModalVisible}/>}
      />
      </SafeAreaView>
      <FoodModal modalVisible={modalVisible} setModalVisible={setModalVisible} name={name} emoji={emoji} number={number} date={date}
      setName={setName} setEmoji={setEmoji} setNumber={setNumber} setDate={setDate}/>
      <FoodModal modalVisible={foodModalVisible} setModalVisible={setFoodModalVisible} 
      name={selectedName} emoji={selectedEmoji} number={selectedNumber} date={selectedDate} 
      setName={setSelectedName} setEmoji={setSelectedEmoji} setNumber={setSelectedNumber} setDate={setSelectedDate} deleteFlag={true}/>
      <TouchableOpacity  onPress={()=>setModalVisible(true)} style={[styles.button,styles.buttonClose]}>
      <Text style={styles.textStyle}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>setStatus(0)} style={[styles.button,styles.buttonClose]}>
      <Text style={styles.textStyle}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}