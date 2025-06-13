import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Payments = {
  method: string;
  amount: number;
};

type ReceivingForm = {
  supplierId: string;
  payments: Payments[];
};

type SalesFormStateTypes = {
  receivingForm: ReceivingForm;
};

const initialState: SalesFormStateTypes = {
  receivingForm: {
    supplierId: "",
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
    setSuppierId: (state, action) => {
      state.receivingForm.supplierId = action.payload;
    },
  },
});

export const { addPayments, setSuppierId } = receivingFormSlice.actions;
export default receivingFormSlice.reducer;
