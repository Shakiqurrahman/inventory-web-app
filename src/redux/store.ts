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
import resetPasswordReducer from "./features/auth/resetPasswordSlice";
import categoriesReducer from "./features/categories/categoriesSlice";
import customerReducar from "./features/customers/customersSlice";
import employeeReducer from "./features/employees/employeeSlice";
import expenseReducer from "./features/expenses/expenseSlice";
import supplierReducer from "./features/suppliers/supplierSlice";
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
    customers: customerReducar,
    employees: employeeReducer,
    resetPassword: resetPasswordReducer,
    expenses: expenseReducer,
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
