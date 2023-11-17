import { configureStore, combineReducers } from '@reduxjs/toolkit';
import respParam from './slices/RespParam';
import nextPage from './slices/NextPage';
import { filmApi } from '../controller/FilmAPI';

const rootReduser = combineReducers({
  respParam,
  nextPage,
  [filmApi.reducerPath]: filmApi.reducer,
});

export const store = configureStore({
  reducer: rootReduser,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(filmApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
