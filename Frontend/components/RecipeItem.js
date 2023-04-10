import {Text,} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from '../styles';
const Item = ({recipe,setName,setIngredient,setMethod,setRecipeModalVisible}) => {
    function setSelected(){
        setRecipeModalVisible(true);
        setName(recipe.name);
        setIngredient(recipe.ingredient);
        setMethod(recipe.method);
    }
    return(<TouchableOpacity onPress={setSelected} style={styles.item}>
      <Text style={styles.food}>{recipe.name}</Text>
    </TouchableOpacity>)
};
export default Item;