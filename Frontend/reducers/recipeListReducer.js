import { createSlice } from "@reduxjs/toolkit";

export const recipeListSlice = createSlice({
  name: "recipeList",
  initialState: {
    recipeList: []
  },
  reducers:{
    changeRecipeList: (state,action) => {
        state.recipeList = action.payload;
    },
  }
});

export const {changeRecipeList} = recipeListSlice.actions;

export default recipeListSlice.reducer;