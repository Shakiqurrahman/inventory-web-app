import { createSlice } from "@reduxjs/toolkit";

export interface IBankDeposite {
    id: string;
    transectionId: string;
    bankName: string;
    accountNumber: string;
    amount: number;
    reason: string;
    date: string;
}

type bankDepositeState = {
    bankDeposites: IBankDeposite[];
    openCreateModal: boolean;
};

const initialState: bankDepositeState = {
    bankDeposites: [],
    openCreateModal: false,
};

const bankDepositeSlice = createSlice({
    name: "bankDeposite",
    initialState,
    reducers: {
        toggleCreateDepositeModal: (state) => {
            state.openCreateModal = !state.openCreateModal;
        },
    },
});

export const { toggleCreateDepositeModal } = bankDepositeSlice.actions;
export default bankDepositeSlice.reducer;
