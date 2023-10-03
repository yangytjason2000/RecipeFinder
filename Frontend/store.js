import { configureStore } from '@reduxjs/toolkit'
import recommendReducer from './reducers/recommendReducer'
import foodListReducer from './reducers/foodListReducer'
export default configureStore({
  reducer: {
    recommend:recommendReducer,
    foodList:foodListReducer,  
  }
})