import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("theme") || "light";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        value: initialState,
    },
    reducers: {
        toggleTheme: (state) => {
            state.value = state.value === "light" ? "dark" : "light";
            localStorage.setItem("theme", state.value);
        },
        setTheme: (state, action) => {
            state.value = action.payload;
            localStorage.setItem("theme", action.payload);
        },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
