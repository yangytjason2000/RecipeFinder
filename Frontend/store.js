import { configureStore } from '@reduxjs/toolkit'
import recommendReducer from './reducers/recommendReducer'
export default configureStore({
  reducer: {recommend:recommendReducer}
})