import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

// Define your base query with the API base URL
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://warm-journey-18609535df73.herokuapp.com/api/v1/',
  prepareHeaders: (headers) => {
    // Get the token from the URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token');

    // If a token exists, add the Authorization header
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

// API slice for advert-related endpoints
export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({
    createAdvert: builder.mutation({
      query: (formData) => ({
        url: 'adverts/create/',
        method: 'post',
        body: formData, // Assuming formData is an object with the necessary data
      }),
    }),
  }),
});

// Redux store and configure middleware
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([apiSlice.middleware]),
});

// Redux persistor
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Export the createAdvert endpoint and associated hooks
export const { useCreateAdvertMutation } = apiSlice;
