import { createStore } from 'state-pool';

const initialState = {
  foodList: [],
  recipeList: [],
  signedIn: false,
  isRecommend: false,
};

const store = createStore(initialState);

export default store;