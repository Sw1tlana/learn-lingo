import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from "./auth/slice";
import { teachersReducer } from "./teachers/slice";
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

const persistedAuthReducer = persistReducer(authConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    teachers: teachersReducer,
  },
  
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);