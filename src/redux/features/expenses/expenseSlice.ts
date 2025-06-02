import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

type Expense = {
  date: string;
  amount: string;
  tax: string;
  paymentMethod: "Cash" | "Card" | "Check" | "bKash" | "Other";
  reason: string;
  recipientName: string;
  approvedBy: string;
};

type ExpenseState = {
  expenses: Expense[];
};

const initialState: ExpenseState = {
  expenses: [],
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    createExpense: (state, action) => {
      state.expenses.push(action.payload);
      toast.success("Expense created successfully");
    },
    updateExpense: (state, action) => {
      const { id, updatedExpense } = action.payload;
      state.expenses[id] = updatedExpense;
      toast.success("Expense updated successfully");
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter((_, i) => i !== action.payload);
      toast.success("Expense deleted successfully");
    },
  },
});
export const { createExpense, deleteExpense, updateExpense } =
  expenseSlice.actions;
export default expenseSlice.reducer;
