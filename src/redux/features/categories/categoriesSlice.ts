import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export interface ICategory {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    _count?: { product: number };
}

type CategoriesState = {
    openCreateModal: boolean;
    openEditModal: boolean;
    categories: ICategory[];
    editCategory: ICategory | null;
};

const initialState: CategoriesState = {
    openCreateModal: false,
    openEditModal: false,
    categories: [],
    editCategory: null,
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        createCategory: (state, action) => {
            state.categories = [...state.categories, action.payload];
        },
        updateCategory: (state, action) => {
            const { id, updatedCategory } = action.payload;
            state.categories[id] = updatedCategory;
        },
        toggleCreateModal: (state) => {
            state.openCreateModal = !state.openCreateModal;
        },
        toggleEditModal: (state, action) => {
            state.openEditModal = !state.openEditModal;
            state.editCategory = action.payload;
        },
        deleteCategory: (state, action) => {
            state.categories = state.categories.filter(
                (_, i) => i !== action.payload
            );
            toast.success("Category deleted successfully");
        },
    },
});
export const {
    createCategory,
    updateCategory,
    toggleCreateModal,
    toggleEditModal,
    deleteCategory,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
