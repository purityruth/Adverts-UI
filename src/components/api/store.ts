import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { apiSlice } from './apiSlice';


export const store = configureStore({
  reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat([apiSlice.middleware]),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
