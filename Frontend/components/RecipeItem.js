import {Text, TouchableOpacity,} from 'react-native';
import { styles } from '../styles';
const Item = ({recipe,setName,setIngredient,setMethod,setRecipeModalVisible,swiping}) => {
    function setSelected(){
        if (swiping){
          return
        }
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