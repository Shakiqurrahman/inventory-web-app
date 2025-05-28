import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { SupplierForm } from "./types.ts"; // adjust the path as needed

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
        setSupplierData: (state, action: PayloadAction<SupplierForm>) => {
            state.data.push(action.payload);
        },
        resetSupplierData: (state) => {
            state.data = [];
        },
    },
});

export const { setSupplierData, resetSupplierData } = supplierSlice.actions;
export default supplierSlice.reducer;
