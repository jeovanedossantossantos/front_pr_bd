import { configureStore } from '@reduxjs/toolkit';

import { useDispatch } from 'react-redux';
import { rtkApi } from "../features/rtkquery";
export const store = configureStore({
  reducer: {
    [rtkApi.reducerPath]: rtkApi.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()