import User_page from './components/User_page.js';
import LoginModal from './components/LoginModal.js';
import Amplify,{ Auth } from '@aws-amplify/core';
import Fridge from './components/Fridge/Fridge.js';
import FoodModal from './components/Fridge/FoodModal.js';
import Recipe from './components/Recipe/Recipe.js';
import RecipeModal from './components/Recipe/RecipeModal.js';
import MethodModal from './components/Recipe/MethodModal.js';
import AddIngredient from './components/Recipe/AddIngredient.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
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

  function Recipe_page(){
    return (
    <Stack.Navigator initialRouteName="Recipe" screenOptions={{
      headerStyle: {
        shadowColor: 'transparent', // this covers iOS
        elevation: 0, // Hide the line between header and main component
      },
    }}>
      <Stack.Screen name="Recipe" component={Recipe} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modify Recipe" component={RecipeModal}/>
        <Stack.Screen name="Method" component={MethodModal}/>
        <Stack.Screen name="AddIngredient" component={AddIngredient}/>
      </Stack.Group>
    </Stack.Navigator>
    )
  }
  function Fridge_page(){
    return (
    <Stack.Navigator initialRouteName="Fridge">
      <Stack.Screen name="Fridge" component={Fridge} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modify Food" component={FoodModal}/>
      </Stack.Group>
    </Stack.Navigator>
    )
  }
  function Me_page(){
    return (
      <Stack.Navigator initialRouteName="User_page">
      <Stack.Screen name="User" component={User_page} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Sign in Page" component={LoginModal}/>
      </Stack.Group>
    </Stack.Navigator>
    )
  }
  return (
    <NavigationContainer>
      <Tab.Navigator>
      <Tab.Screen name="Fridge_page" component={Fridge_page} options={{headerShown: false, tabBarLabel: "Fridge",
          tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="kitchen" size={size} color={color} />
        ),}}/>
      <Tab.Screen name="Recipe_page" component={Recipe_page} options={{headerShown: false, tabBarLabel: "Recipe",
          tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="menu-book" size={size} color={color} />
        ),}}/>
      <Tab.Screen name="Me" component={Me_page}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="person" size={size} color={color} />
        ),
      }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}