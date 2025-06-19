import { createSlice } from "@reduxjs/toolkit";
import type { ISaleVariant } from "../../../types/products";
import type { IEmployee } from "../employees/employeeSlice";
import type { IProductVariant } from "../items/itemApiSlice";

export type IReturnItem = {
  createdAt: string;
  id: string;
  isDeleted: boolean;
  price: number;
  quantity: number;
  saleId: string;
  updatedAt: string;
  variant: IProductVariant;
  variantId: string;
};

export type ISaleHistory = {
  id: string;
  invoiceId: string;
  customer: { id?: number; name: string; phone: string };
  dueAmount: number;
  itemBrand: string;
  itemName: string;
  paidAmount: number;
  paymentMethod: string;
  status: boolean;
  totalPrice: number;
  returnAmount: number;
  reason?: string;
  saleStatus: "PAID" | "DUE" | "REFUNDED";
  payments: { amount: number; method: string }[];
  saleVariant: ISaleVariant[];
  isCorporateSale: boolean;
  createdAt: string;
  customerId: string;
  discountAmount: number;
  discountPercentage: number;
  employee: IEmployee;
  employeeId: string;
  isDeleted: boolean;
  isFree: boolean;
  returnItems: IReturnItem[];
  updatedAt: string;
};

type saleHistoryState = {
  openReturnModal: boolean;
  selectedSales: ISaleVariant[];
  removedItems: ISaleVariant[];
  refundAmount: string;
  reason: string;
};

const initialState: saleHistoryState = {
  openReturnModal: false,
  selectedSales: [],
  removedItems: [],
  refundAmount: "",
  reason: "",
};

const saleHistorySlice = createSlice({
  name: "saleHistory",
  initialState,
  reducers: {
    toggleReturnModal: (state) => {
      state.openReturnModal = !state.openReturnModal;
      if (state.openReturnModal) {
        state.removedItems = [];
        state.reason = "";
        state.refundAmount = "";
      }
    },
    addSelectedSales: (state, action) => {
      state.selectedSales = action.payload;
    },
    addRemovedItems: (state, action) => {
      state.removedItems = action.payload;
    },
    changeRefundAmount: (state, action) => {
      state.refundAmount = action.payload;
    },
    changeReason: (state, action) => {
      state.reason = action.payload;
    },
  },
});

export const {
  toggleReturnModal,
  addSelectedSales,
  addRemovedItems,
  changeReason,
  changeRefundAmount,
} = saleHistorySlice.actions;
export default saleHistorySlice.reducer;
