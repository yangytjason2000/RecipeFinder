import {Text, } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from '../../styles';
const Item = ({food,navigateToAdd}) => {
    return(<TouchableOpacity onPress={async () => await navigateToAdd(food.name,food.quantity,food.unit,food.emoji,false)}>
      <Text style={styles.food}>{food.emoji+" "+food.name+" "+food.quantity+food.unit}</Text>
    </TouchableOpacity>)
};
export default Item;