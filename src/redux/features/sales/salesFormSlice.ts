import { createSlice } from "@reduxjs/toolkit";
import type { IProductVariant } from "../../../types/products";

type Customer = {
  name: string;
  phone: string;
};

export type Payments = {
  method: string;
  amount: number;
};

interface ProductVariant extends IProductVariant {
  quantity: number;
  discount: number;
  totalPrice: number;
}

type SalesForm = {
  selectedItems: ProductVariant[];
  selectedEmployee: string;
  customerId?: string;
  customer?: Customer;
  payments: Payments[];
  totalAmount: number;
  dueAmount: number;
  freeSale: boolean;
  discountAmount: number;
  discountPercentage: number;
  freeSaleDueAmount: number;
  isCorporateSale: boolean;
};

type SalesFormStateTypes = {
  salesForm: SalesForm;
};

const initialState: SalesFormStateTypes = {
  salesForm: {
    selectedItems: [],
    selectedEmployee: "",
    customerId: "",
    customer: {
      name: "",
      phone: "",
    },
    payments: [],
    totalAmount: 0,
    dueAmount: 0,
    freeSale: false,
    discountAmount: 0,
    discountPercentage: 0,
    freeSaleDueAmount: 0,
    isCorporateSale: false,
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
    removeSelectedItem: (state, action) => {
      state.salesForm = {
        ...state.salesForm,
        selectedItems: action.payload,
      };
    },
    updateSelectedItem: (state, action) => {
      state.salesForm = { ...state.salesForm, selectedItems: action.payload };
    },
    updateTotalAmount: (state, action) => {
      state.salesForm = { ...state.salesForm, totalAmount: action.payload };
    },
    setSelectedEmployee: (state, action) => {
      state.salesForm = {
        ...state.salesForm,
        selectedEmployee: action.payload,
      };
    },
    setCustomerId: (state, action) => {
      state.salesForm.customerId = action.payload;
    },
    setCustomer: (state, action) => {
      state.salesForm = { ...state.salesForm, customer: action.payload };
    },
    changeFreeSaleValue: (state, action) => {
      state.salesForm = { ...state.salesForm, freeSale: action.payload };
    },
    addPayments: (state, action) => {
      state.salesForm = {
        ...state.salesForm,
        payments: action.payload,
      };
    },
    removePayments: (state, action) => {
      state.salesForm = {
        ...state.salesForm,
        payments: action.payload,
      };
    },
    changeDueAmount: (state, action) => {
      state.salesForm = { ...state.salesForm, dueAmount: action.payload };
    },
    updateDiscountPercentage: (state, action) => {
      state.salesForm = {
        ...state.salesForm,
        discountPercentage: action.payload,
      };
    },
    updateDiscountAmount: (state, action) => {
      state.salesForm = {
        ...state.salesForm,
        discountAmount: action.payload,
      };
    },
    resetForm: (state) => {
      state.salesForm = {
        selectedItems: [],
        selectedEmployee: "",
        customerId: "",
        customer: {
          name: "",
          phone: "",
        },
        payments: [],
        totalAmount: 0,
        dueAmount: 0,
        freeSale: false,
        discountAmount: 0,
        discountPercentage: 0,
        freeSaleDueAmount: 0,
        isCorporateSale: false,
      };
    },
    changeFreeSaleDueAmount: (state, action) => {
      state.salesForm.freeSaleDueAmount = action.payload;
    },
    changeCorporateSale: (state, action) => {
      state.salesForm.isCorporateSale = action.payload;
    },
  },
});
export const {
  addSelectedItems,
  removeSelectedItem,
  updateSelectedItem,
  updateTotalAmount,
  setSelectedEmployee,
  setCustomerId,
  setCustomer,
  changeFreeSaleValue,
  addPayments,
  removePayments,
  changeDueAmount,
  updateDiscountPercentage,
  updateDiscountAmount,
  resetForm,
  changeFreeSaleDueAmount,
  changeCorporateSale,
} = salesFormSlice.actions;
export default salesFormSlice.reducer;
