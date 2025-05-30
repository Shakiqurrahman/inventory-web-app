import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";
import attributesReducer from "./features/attributes/attributeSlice";
import authReducer from "./features/auth/authSlice";
import categoriesReducer from "./features/categories/categoriesSlice";
import supplierReducer from "./features/supplierSlice";
import themeReducer from "./features/theme/themeSlice";

const createPersistConfig = (key: string) => ({
  key,
  storage,
});

const persistedAuthReducer = persistReducer(
  createPersistConfig("auth"),
  authReducer
);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    theme: themeReducer,
    supplier: supplierReducer,
    categories: categoriesReducer,
    attributes: attributesReducer,
  },

  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
