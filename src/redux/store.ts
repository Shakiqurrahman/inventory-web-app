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
import bankDepositeSlice from "./features/bankDeposite/bankDepositeSlice";
import categoriesReducer from "./features/categories/categoriesSlice";
import customerReducar from "./features/customers/customersSlice";
import employeeReducer from "./features/employees/employeeSlice";
import employeeSalarySlice from "./features/employeeSalary/employeeSalarySlice";
import expenseReducer from "./features/expenses/expenseSlice";
import itemFormReducer from "./features/items/itemFormSlice";
import recivingFormReduer from "./features/receiving/receivingFormSlice";
import receiveHistory from "./features/receivingHistory/receivingHIstorySlice";
import salesFormReducer from "./features/sales/salesFormSlice";
import saleHistoryReducer from "./features/salesHistory/saleHistorySlice";
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

// const persistedSalesFormReducer = persistReducer(
//   createPersistConfig("sales"),
//   salesFormReducer
// );

// const persistedReceivingFormReducer = persistReducer(
//   createPersistConfig("receiving"),
//   recivingFormReduer
// );

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
        bankDeposite: bankDepositeSlice,
        itemForm: itemFormReducer,
        salesForm: salesFormReducer,
        receivingForm: recivingFormReduer,
        saleHistory: saleHistoryReducer,
        receiveHistory: receiveHistory,
        employeeSalary: employeeSalarySlice,
    },

    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(baseApi.middleware),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
