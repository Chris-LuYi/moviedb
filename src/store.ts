import { combineReducers, configureStore } from '@reduxjs/toolkit';
import homeReducer from './models/home';
import movieReducer from './models/movie';
import personReducer from './models/person';
import searchReducer from './models/search';

const rootReducer = combineReducers({
  person: personReducer,
  home: homeReducer,
  movie: movieReducer,
  search: searchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default configureStore({
  reducer: rootReducer,
});

export const getStore = (defaultState: any) => {
  return configureStore({ reducer: rootReducer, preloadedState: defaultState });
};
