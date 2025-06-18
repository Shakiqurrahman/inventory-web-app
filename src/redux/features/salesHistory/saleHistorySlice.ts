import { createSlice } from "@reduxjs/toolkit";
import type { ISaleVariant } from "../../../types/products";

export type ISaleHistory = {
    id?: number;
    invoiceId: string;
    customer: { id?: number; name: string; phone: string };
    dueAmount: string;
    itemBrand: string;
    itemName: string;
    paidAmount: string;
    paymentMethod: string;
    status: boolean;
    totalPrice: string;
    saleStatus: "PAID" | "DUE";
    payments: { amount: number; method: string }[];
    saleVariant: ISaleVariant[];
    isCorporateSale: boolean;
};

type saleHistoryState = {
    openReturnModal: boolean;
    selectedSale: object;
};

const initialState: saleHistoryState = {
    openReturnModal: false,
    selectedSale: {},
};

const saleHistorySlice = createSlice({
    name: "saleHistory",
    initialState,
    reducers: {
        toggleReturnModal: (state) => {
            state.openReturnModal = !state.openReturnModal;
        },
    },
});

export const { toggleReturnModal } = saleHistorySlice.actions;
export default saleHistorySlice.reducer;
