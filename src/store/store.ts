import {
  configureStore,
  combineReducers,
  PreloadedState,
} from '@reduxjs/toolkit';
import respParam from './slices/RespParam';
import nextPage from './slices/NextPage';
import { filmApi } from '../controller/FilmAPI';

const rootReduser = combineReducers({
  respParam,
  nextPage,
  [filmApi.reducerPath]: filmApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReduser,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(filmApi.middleware),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReduser>;
export type StoreType = ReturnType<typeof setupStore>;
export type AppDispatch = StoreType['dispatch'];
