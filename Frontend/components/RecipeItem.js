import {Text,} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from '../styles';
const Item = ({recipe,navigateToRecipe}) => {
    function setSelected(){
        navigateToRecipe(recipe);
    }
    return(<TouchableOpacity onPress={setSelected} style={styles.item}>
      <Text style={styles.food}>{recipe.name}</Text>
    </TouchableOpacity>)
};
export default Item;