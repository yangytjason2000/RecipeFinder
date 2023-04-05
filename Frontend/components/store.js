import { createStore } from 'state-pool';

const initialState = {
  status: 0,
  foodList: [],
  recipeList: [],
  signedIn: false,
  isRecommend: false,
};

const store = createStore(initialState);

export default store;