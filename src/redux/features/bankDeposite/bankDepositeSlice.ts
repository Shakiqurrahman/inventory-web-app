import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export interface IBankDeposite {
    id?: string;
    transectionId: string;
    bankName: string;
    accountNumber?: string;
    amount: number;
    reason?: string;
    date: string;
}

type bankDepositeState = {
    bankDeposites: IBankDeposite[];
    openCreateModal: boolean;
    openEditModal: boolean;
    openWithdrawModal: boolean;
};

const initialState: bankDepositeState = {
    bankDeposites: [],
    openCreateModal: false,
    openEditModal: false,
    openWithdrawModal: false,
};

const bankDepositeSlice = createSlice({
    name: "bankDeposite",
    initialState,
    reducers: {
        createBankDeposite: (state, action) => {
            state.bankDeposites.push(action.payload);
            toast.success("Bank Deposite created successfully");
        },
        createWithdraw: (state, action) => {
            state.bankDeposites.push(action.payload);
            toast.success("Employee created successfully");
        },
        updateBankDeposite: (
            state,
            action: PayloadAction<{
                index: number;
                updatedBankDeposite: IBankDeposite;
            }>
        ) => {
            const { index, updatedBankDeposite } = action.payload;
            if (index >= 0 && index < state.bankDeposites.length) {
                state.bankDeposites[index] = updatedBankDeposite;
                toast.success("Bank deposit updated successfully");
            } else {
                toast.error("Invalid index for update");
            }
        },
        deleteBankDeposite: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            if (index >= 0 && index < state.bankDeposites.length) {
                state.bankDeposites.splice(index, 1);
                toast.success("Bank deposit deleted successfully");
            } else {
                toast.error("Invalid index for deletion");
            }
        },
        toggleCreateDepositeModal: (state) => {
            state.openCreateModal = !state.openCreateModal;
        },
        toggleEditDepositeModal: (state) => {
            state.openEditModal = !state.openEditModal;
        },
        toggleWithdrawModal: (state) => {
            state.openWithdrawModal = !state.openWithdrawModal;
        },
    },
});

export const {
    toggleCreateDepositeModal,
    toggleEditDepositeModal,
    toggleWithdrawModal,
    createBankDeposite,
    updateBankDeposite,
    deleteBankDeposite,
    createWithdraw,
} = bankDepositeSlice.actions;
export default bankDepositeSlice.reducer;
