import { createSlice } from "@reduxjs/toolkit";

export const recommendSlice = createSlice({
  name: "recommend",
  initialState: {
    isRecommend: false
  },
  reducers:{
    changeRecommend: (state) => {
        state.isRecommend = !state.isRecommend
    },
  }
});

export const {changeRecommend} = recommendSlice.actions;

export default recommendSlice.reducer;