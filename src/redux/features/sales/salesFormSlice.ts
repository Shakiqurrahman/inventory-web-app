import { createSlice } from "@reduxjs/toolkit";
import type { IProductVariant } from "../../../types/products";

type SalesForm = {
  selectedItems: IProductVariant[];
};

type SalesFormStateTypes = {
  salesForm: SalesForm;
};

const initialState: SalesFormStateTypes = {
  salesForm: {
    selectedItems: [],
  },
};

const salesFormSlice = createSlice({
  name: "salesForm",
  initialState,
  reducers: {
    addSelectedItems: (state, action) => {
      state.salesForm = {
        ...state.salesForm,
        selectedItems: [...state.salesForm.selectedItems, action.payload],
      };
    },
  },
});
export const { addSelectedItems } = salesFormSlice.actions;
export default salesFormSlice.reducer;
