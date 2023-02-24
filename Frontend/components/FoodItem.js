import {Text, TouchableOpacity,} from 'react-native';
import { styles } from '../styles';
const Item = ({food,setName,setEmoji,setNumber,setDate,setFoodModalVisible,isRecipe=false}) => {
    function setSelected(){
        setFoodModalVisible(true);
        setName(String(food.name));
        setEmoji(food.emoji);
        setNumber(food.quantity);
        if (!isRecipe){
          setDate(new Date(food.date));
        }
    }
    if (isRecipe){
      return(<TouchableOpacity onPress={setSelected}>
        <Text style={styles.food}>{food.emoji+" "+food.name}</Text>
      </TouchableOpacity>)
    }
    else{
      return(<TouchableOpacity onPress={setSelected} style={styles.item}>
        <Text style={styles.food}>{food.emoji+" "+food.name}</Text>
      </TouchableOpacity>)
    }
};
export default Item;