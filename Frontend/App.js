import  Main  from './components/Main.js';
// import { IconButton } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Amplify,{ Auth } from '@aws-amplify/core';
import Fridge from './components/Fridge/Fridge.js';
import Recipe from './components/Recipe/Recipe.js';
import RecipeModal from './components/Recipe/RecipeModal.js';
import MethodModal from './components/Recipe/MethodModal.js';
import AddIngredient from './components/Recipe/AddIngredient.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
export default function App() {
  Amplify.configure({
    Auth: {
  
        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        // REQUIRED - Amazon Cognito Region
        region: 'us-west-1',
  
        // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
        // Required only if it's different from Amazon Cognito Region
  
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-west-1_00EyNRs0W',
  
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: 'm44i4l7u5j031rrdm3ffeu4q3',
    }
  });
  
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  // Custom IconButton component
  const IconButton = ({ onPress, iconName, iconSize, iconColor }) => {
    return (
      <Ionicons.Button
        name={iconName}
        onPress={onPress}
        size={iconSize}
        color={iconColor}
        backgroundColor="transparent"
      />
    );
  };

  function Recipe_page(){
    return (
    <Stack.Navigator initialRouteName="Recipe">
      <Stack.Screen name="Recipe" component={Recipe} options={{
          headerTitle: 'Recipe',
          headerRight: () => (
            <IconButton
              onPress={() => {
                // Handle button press
                // navigation.navigate('Modify Recipe',{initName:'',initIngredient:[],initMethod:'',isAdd:true})
              }}
              iconName="ios-add" // Specify the icon name from Ionicons
              iconSize={30}
              iconColor="#000"
            />
          ),
        }}/>
      <Stack.Screen name="Modify Recipe" component={RecipeModal} />
      <Stack.Screen name="Method" component={MethodModal} />
      <Stack.Screen name="AddIngredient" component={AddIngredient} />
    </Stack.Navigator>
    )
  }
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="RecipeFinder">
        <Stack.Screen name="RecipeFinder" component={Main} />
        <Stack.Screen name="Fridge" component={Fridge} />
        <Stack.Screen name="Recipe" component={Recipe} />
        <Stack.Screen name="Modify Recipe" component={RecipeModal}/>
        <Stack.Screen name="Method" component={MethodModal}/>
        <Stack.Screen name="AddIngredient" component={AddIngredient}/>
      </Stack.Navigator> */}
      <Tab.Navigator>
        <Tab.Screen name="RecipeFinder" component={Main}/>
        <Tab.Screen name="Fridge" component={Fridge} />
        <Tab.Screen name="Recipe_page" component={Recipe_page} options={{headerShown: false}}/>

      </Tab.Navigator>
    </NavigationContainer>
  );
}