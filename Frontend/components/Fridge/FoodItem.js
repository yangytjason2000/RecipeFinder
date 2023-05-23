import {Text, } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from '../../styles';
const Item = ({food,navigateToFridge}) => {
    return(<TouchableOpacity onPress={() => navigateToFridge(food)} 
    style={styles.item}>
      <Text style={styles.food}>{food.emoji+" "+food.name}</Text>
    </TouchableOpacity>)
};
export default Item;