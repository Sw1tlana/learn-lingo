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

const favoritePersistConfig = {
    key: 'favorites', 
    storage,
    whitelist: ['favoriteTeachers'], 
};

const persistedAuthReducer = persistReducer(authConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    filters: filterReducer,
    teachers: teachersReducer,
    favorite: persistReducer(favoritePersistConfig, favoritesReducer),
  },
  
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);