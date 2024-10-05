import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from "./auth/slice";
import { teachersReducer } from "./teachers/slice";
import { filterReducer } from "./filters/slice";
import { favoritesReducer } from './favorites/slice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const authConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const favoritesConfig = {
  key: "favorites",
  storage,
  whitelist: ['favorites'],
};

const persistedAuthReducer = persistReducer(authConfig, authReducer);

const persistedFavoritesReducer = persistReducer(favoritesConfig, favoritesReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    filters: filterReducer,
    teachers: teachersReducer,
    favorites: persistedFavoritesReducer
  },
  
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
