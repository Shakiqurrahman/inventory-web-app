import { createSlice } from "@reduxjs/toolkit";

interface ResetState {
    resetToken: string | null;
}

const initialState: ResetState = {
    resetToken: null,
};

const resetPasswordSlice = createSlice({
    name: "resetPassword",
    initialState,
    reducers: {
        setResetToken: (state, action) => {
            state.resetToken = action.payload;
        },
        clearResetToken: (state) => {
            state.resetToken = null;
        },
    },
});

export const { setResetToken, clearResetToken } = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
