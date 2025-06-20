import { createSlice } from "@reduxjs/toolkit";

export type IAttribute = {
  id: string;
  name: string;
  values: string[];
  createdAt: Date;
  updatedAt: Date;
};

type Attribute = {
  id?: string;
  name: string;
  attributeValues: string[];
};

type AttributeState = {
  attributes: Attribute[];
};

const initialState: AttributeState = {
  attributes: [],
};

const attributeSlice = createSlice({
  name: "attributes",
  initialState,
  reducers: {
    getAttributes: (state, action) => {
      state.attributes = action.payload;
    },
    addAttribute: (state, action) => {
      const newAttribute = action.payload;
      state.attributes.push(newAttribute);
    },
    updateAttribute: (state, action) => {
      const { index, updatedAttribute } = action.payload;
      if (state.attributes[index]) {
        state.attributes[index] = updatedAttribute;
      }
    },
    deleteAttribute: (state, action) => {
      const index = action.payload;
      state.attributes.splice(index, 1);
    },
  },
});
export const { addAttribute, deleteAttribute, updateAttribute, getAttributes } =
  attributeSlice.actions;
export default attributeSlice.reducer;
