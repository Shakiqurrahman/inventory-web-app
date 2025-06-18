import { createSlice } from "@reduxjs/toolkit";
import type { IReceiveVariant } from "../../../types/products";
import type { ISupplier } from "../suppliers/supplierSlice";

export type IReceiveHistory = {
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
  discountAmount: number;
  discountPercentage: number;
  receivingDate: string;
  saleStatus: "PAID" | "DUE";
  payments: { amount: number; method: string }[];
  recieveVariant: IReceiveVariant[];
  isCorporateSale: boolean;
  createdAt: string;
  supplier: ISupplier;
};

type receiveHistoryState = {
  openReceiveReturnModal: boolean;
  selectedReceives: IReceiveVariant[];
  removedItems: IReceiveVariant[];
  refundAmount: string;
  reason: string;
};

const initialState: receiveHistoryState = {
  openReceiveReturnModal: false,
  selectedReceives: [],
  removedItems: [],
  refundAmount: "",
  reason: "",
};

const receiveHistorySlice = createSlice({
  name: "saleHistory",
  initialState,
  reducers: {
    toggleReceiveReturnModal: (state) => {
      state.openReceiveReturnModal = !state.openReceiveReturnModal;
      if (state.openReceiveReturnModal) {
        state.removedItems = [];
        state.reason = "";
        state.refundAmount = "";
      }
    },
    addSelectedReceives: (state, action) => {
      state.selectedReceives = action.payload;
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
  toggleReceiveReturnModal,
  addRemovedItems,
  addSelectedReceives,
  changeReason,
  changeRefundAmount,
} = receiveHistorySlice.actions;
export default receiveHistorySlice.reducer;
