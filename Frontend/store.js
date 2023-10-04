import { configureStore } from '@reduxjs/toolkit'
import recommendReducer from './reducers/recommendReducer'
import foodListReducer from './reducers/foodListReducer'
import recipeListReducer from './reducers/recipeListReducer'
export default configureStore({
  reducer: {
    recommend: recommendReducer,
    foodList: foodListReducer,  
    recipeList: recipeListReducer,
  }
})