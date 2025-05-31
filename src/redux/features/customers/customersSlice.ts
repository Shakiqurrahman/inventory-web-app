import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

type Customers = {
    id?: number;
    name: string;
    phone: string;
};

type CategoriesState = {
    openCreateCustomerModal: boolean;
    openEditCutomerModal: boolean;
    customers: Customers[];
    editCategory: Customers | null;
};

const initialState: CategoriesState = {
    openCreateCustomerModal: false,
    openEditCutomerModal: false,
    customers: [],
    editCategory: null,
};

const customersSlice = createSlice({
    name: "customers",
    initialState,
    reducers: {
        createCustomer: (state, action) => {
            state.customers = [...state.customers, action.payload];
        },
        updateCustomer: (state, action) => {
            const { id, updatedCategory } = action.payload;
            state.customers[id] = updatedCategory;
        },
        toggleCustomerModal: (state) => {
            state.openCreateCustomerModal = !state.openCreateCustomerModal;
        },
        toggleEditCustomerModal: (state, action) => {
            state.openEditCutomerModal = !state.openEditCutomerModal;
            state.editCategory = action.payload;
        },
        deleteCustomer: (state, action) => {
            state.customers = state.customers.filter(
                (_, i) => i !== action.payload
            );
            toast.success("Category deleted successfully");
        },
    },
});
export const {
    createCustomer,
    updateCustomer,
    toggleCustomerModal,
    toggleEditCustomerModal,
    deleteCustomer,
} = customersSlice.actions;
export default customersSlice.reducer;
