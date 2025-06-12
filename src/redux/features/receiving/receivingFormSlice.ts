import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Payments = {
    method: string;
    amount: number;
};

type ReceivingForm = {
    selectedEmployee: string;
    payments: Payments[];
};

type SalesFormStateTypes = {
    receivingForm: ReceivingForm;
};

const initialState: SalesFormStateTypes = {
    receivingForm: {
        selectedEmployee: "",
        payments: [],
    },
};

const receivingFormSlice = createSlice({
    name: "receivingForm",
    initialState,
    reducers: {
        addPayments: (state, action: PayloadAction<Payments>) => {
            state.receivingForm.payments.push(action.payload);
        },
    },
});

export const { addPayments } = receivingFormSlice.actions;
export default receivingFormSlice.reducer;
