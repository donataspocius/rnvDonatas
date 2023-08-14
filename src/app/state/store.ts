import {configureStore} from '@reduxjs/toolkit';
import middlewares from './middlewares/middlewares';
import contentReducer from './content/contentSlice';
import authReducer from './auth/authSlice';

export const store = configureStore({
  reducer: {
    content: contentReducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
      imutableCheck: false,
    }).concat(middlewares);
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
