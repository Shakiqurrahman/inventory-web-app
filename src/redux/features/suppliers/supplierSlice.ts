import { createSlice } from "@reduxjs/toolkit";
import type { SupplierForm } from "../types";
// adjust the path as needed

interface supplierState {
    data: SupplierForm[];
}

const initialState: supplierState = {
    data: [],
};

const supplierSlice = createSlice({
    name: "supplier",
    initialState,
    reducers: {
        setSupplierData: (state, action) => {
            state.data = [...state.data, action.payload];
        },
        resetSupplierData: (state) => {
            state.data = [];
        },
        updateSupplierData: (state, action) => {
            const index = state.data.findIndex(
                (s: SupplierForm) => s.phone === action.payload.phone
            );
            if (index !== -1) {
                state.data[index] = action.payload;
            }
        },
        deletesupplierData: (state, action) => {
            state.data = state.data.filter((_, i) => i !== action.payload);
        },
    },
});

export const {
    setSupplierData,
    resetSupplierData,
    deletesupplierData,
    updateSupplierData,
} = supplierSlice.actions;
export default supplierSlice.reducer;
