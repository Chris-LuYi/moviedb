import { combineReducers, configureStore } from '@reduxjs/toolkit';
import homeReducer from './models/home';
import movieReducer from './models/movie';
import personReducer from './models/person';

const rootReducer = combineReducers({
  person: personReducer,
  home: homeReducer,
  movie: movieReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default configureStore({
  reducer: rootReducer,
});

export const getStore = (defaultState: any) => {
  return configureStore({ reducer: rootReducer, preloadedState: defaultState });
};
