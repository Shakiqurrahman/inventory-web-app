import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export type IEmployee = {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    role: "STAFF" | "MANAGER";
};

type EmployeeState = {
    employees: IEmployee[];
};

const initialState: EmployeeState = {
    employees: [],
};

const employeeSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {
        createEmployee: (state, action) => {
            state.employees.push(action.payload);
            toast.success("Employee created successfully");
        },
        updateEmployee: (state, action) => {
            const { id, updatedEmployee } = action.payload;
            state.employees[id] = updatedEmployee;
            toast.success("Employee updated successfully");
        },
        deleteEmployee: (state, action) => {
            state.employees = state.employees.filter(
                (_, i) => i !== action.payload
            );
            toast.success("Employee deleted successfully");
        },
    },
});
export const { createEmployee, deleteEmployee, updateEmployee } =
    employeeSlice.actions;
export default employeeSlice.reducer;
