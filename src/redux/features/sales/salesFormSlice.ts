import { createSlice } from "@reduxjs/toolkit";
import type { IProductVariant } from "../../../types/products";

type Customer = {
  name: string;
  phone: string;
};

type Payments = {
  method: string;
  amount: number;
};

type SalesForm = {
  selectedItems: IProductVariant[];
  selectedEmployee: string;
  customer: Customer;
  payments: Payments[];
};

type SalesFormStateTypes = {
  salesForm: SalesForm;
};

const initialState: SalesFormStateTypes = {
  salesForm: {
    selectedItems: [],
    selectedEmployee: "",
    customer: {
      name: "",
      phone: "",
    },
    payments: [],
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
    setSelectedEmployee: (state, action) => {
      state.salesForm = {
        ...state.salesForm,
        selectedEmployee: action.payload,
      };
    },
    setCustomer: (state, action) => {
      state.salesForm = { ...state.salesForm, customer: action.payload };
    },
    addPayments: (state, action) => {
      state.salesForm = {
        ...state.salesForm,
        payments: [...state.salesForm.payments, action.payload],
      };
    },
    removePayments: (state, action) => {
      state.salesForm = {
        ...state.salesForm,
        payments: state.salesForm.payments.filter(
          (_, i) => i !== action.payload
        ),
      };
    },
  },
});
export const {
  addSelectedItems,
  setSelectedEmployee,
  setCustomer,
  addPayments,
  removePayments,
} = salesFormSlice.actions;
export default salesFormSlice.reducer;
