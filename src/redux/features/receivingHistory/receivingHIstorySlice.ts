import { createSlice } from "@reduxjs/toolkit";
import type { IReceiveVariant } from "../../../types/products";
import type { ISupplier } from "../suppliers/supplierSlice";

export type IReceiveHistory = {
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
    recieveVariant: IReceiveVariant[];
    isCorporateSale: boolean;
    createdAt: string;
    supplier: ISupplier;
};

type receiveHistoryState = {
    openReceiveReturnModal: boolean;
    selectedSale: object;
};

const initialState: receiveHistoryState = {
    openReceiveReturnModal: false,
    selectedSale: {},
};

const receiveHistorySlice = createSlice({
    name: "saleHistory",
    initialState,
    reducers: {
        toggleReceiveReturnModal: (state) => {
            state.openReceiveReturnModal = !state.openReceiveReturnModal;
        },
    },
});

export const { toggleReceiveReturnModal } = receiveHistorySlice.actions;
export default receiveHistorySlice.reducer;
