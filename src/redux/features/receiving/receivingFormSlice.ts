import { createSlice } from "@reduxjs/toolkit";
import type { IProductVariant } from "../items/itemApiSlice";

type Payments = {
  method: string;
  amount: number;
};

interface ProductVariant extends IProductVariant {
  quantity: number;
  totalPrice: number;
}

type ReceivingForm = {
  supplierId: string;
  payments: Payments[];
  recieveVariant: ProductVariant[];
  totalAmount: number;
  dueAmount: number;
  discountAmount: number;
  discountPercentage: number;
  receivingDate: string;
};

type SalesFormStateTypes = {
  receivingForm: ReceivingForm;
};

const initialState: SalesFormStateTypes = {
  receivingForm: {
    supplierId: "",
    payments: [],
    recieveVariant: [],
    totalAmount: 0,
    dueAmount: 0,
    discountAmount: 0,
    discountPercentage: 0,
    receivingDate: "",
  },
};

const receivingFormSlice = createSlice({
  name: "receivingForm",
  initialState,
  reducers: {
    addSelectedItems: (state, action) => {
      state.receivingForm.recieveVariant = [
        ...state.receivingForm.recieveVariant,
        action.payload,
      ];
    },
    removeSelectedItem: (state, action) => {
      state.receivingForm.recieveVariant = action.payload;
    },
    updateSelectedItem: (state, action) => {
      state.receivingForm.recieveVariant = action.payload;
    },
    addPayments: (state, action) => {
      state.receivingForm.payments = action.payload;
    },
    removePayments: (state, action) => {
      state.receivingForm.payments = action.payload;
    },
    setSuppierId: (state, action) => {
      state.receivingForm.supplierId = action.payload;
    },
    updateTotalAmount: (state, action) => {
      state.receivingForm.totalAmount = action.payload;
    },
    changeDueAmount: (state, action) => {
      state.receivingForm.dueAmount = action.payload;
    },
    updateDiscountPercentage: (state, action) => {
      state.receivingForm.discountPercentage = action.payload;
    },
    updateDiscountAmount: (state, action) => {
      state.receivingForm.discountAmount = action.payload;
    },
    changeReceivingDate: (state, action) => {
      state.receivingForm.receivingDate = action.payload;
    },
    resetForm: (state) => {
      state.receivingForm = {
        supplierId: "",
        payments: [],
        recieveVariant: [],
        totalAmount: 0,
        dueAmount: 0,
        discountAmount: 0,
        discountPercentage: 0,
        receivingDate: "",
      };
    },
  },
});

export const {
  addPayments,
  removePayments,
  setSuppierId,
  addSelectedItems,
  removeSelectedItem,
  updateSelectedItem,
  updateTotalAmount,
  changeDueAmount,
  updateDiscountAmount,
  updateDiscountPercentage,
  changeReceivingDate,
  resetForm,
} = receivingFormSlice.actions;
export default receivingFormSlice.reducer;
