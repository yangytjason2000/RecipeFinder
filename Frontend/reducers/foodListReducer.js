import { createSlice } from "@reduxjs/toolkit";

export const foodListSlice = createSlice({
  name: "foodList",
  initialState: {
    foodList: []
  },
  reducers:{
    changeFoodList: (state,action) => {
        state.foodList = action.payload;
    },
  }
});

export const {changeFoodList} = foodListSlice.actions;

export default foodListSlice.reducer;