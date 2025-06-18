import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export interface IEmployeeSalary {
    id?: string;
    date: string;
    amount: number | string;
    bonusAmount?: number | string;
    employee: string;
    reason?: string;
    approvedBy: string;
}

type employeeSalaryState = {
    employeeSalary: IEmployeeSalary[];
    openCreateEmployeeSalaryModal: boolean;
    openEdotEmployeeSalaryModal: boolean;
    openEditModal: boolean;
};

const initialState: employeeSalaryState = {
    employeeSalary: [],
    openCreateEmployeeSalaryModal: false,
    openEdotEmployeeSalaryModal: false,
    openEditModal: false,
};

const employeeSalarySlice = createSlice({
    name: "employeeSalary",
    initialState,
    reducers: {
        createEmployeeSalary: (state, action) => {
            state.employeeSalary.push(action.payload);
            toast.success("Bank Deposite created successfully");
        },
        updateEmployeeSalary: (
            state,
            action: PayloadAction<{
                index: number;
                updatedEmployeeSalary: IEmployeeSalary;
            }>
        ) => {
            const { index, updatedEmployeeSalary } = action.payload;
            if (index >= 0 && index < state.employeeSalary.length) {
                state.employeeSalary[index] = updatedEmployeeSalary;
                toast.success("Bank deposit updated successfully");
            } else {
                toast.error("Invalid index for update");
            }
        },
        deleteEmployeeSalary: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            if (index >= 0 && index < state.employeeSalary.length) {
                state.employeeSalary.splice(index, 1);
                toast.success("Bank deposit deleted successfully");
            } else {
                toast.error("Invalid index for deletion");
            }
        },
        toggleCreateEmployeeSalaryModal: (state) => {
            state.openCreateEmployeeSalaryModal =
                !state.openCreateEmployeeSalaryModal;
        },
        toggleEditEmployeeSalaryModal: (state) => {
            state.openEdotEmployeeSalaryModal =
                !state.openEdotEmployeeSalaryModal;
        },
    },
});

export const {
    toggleCreateEmployeeSalaryModal,
    toggleEditEmployeeSalaryModal,
    createEmployeeSalary,
    deleteEmployeeSalary,
    updateEmployeeSalary,
} = employeeSalarySlice.actions;
export default employeeSalarySlice.reducer;
