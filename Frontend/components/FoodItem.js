import {Text, TouchableOpacity,} from 'react-native';
import { styles } from '../styles';
import { useState } from 'react';
import FoodModal from './FoodModal';
const Item = ({food,setName,setEmoji,setNumber,setDate,setFoodModalVisible}) => {
    function setSelected(){
        setFoodModalVisible(true);
        setName(String(food.name));
        setEmoji(food.emoji);
        setNumber(food.quantity);
        setDate(food.date);
    }
    return(<TouchableOpacity onPress={setSelected} style={styles.item}>
      <Text style={styles.food}>{food.emoji+" "+food.name}</Text>
    </TouchableOpacity>)
};
export default Item;