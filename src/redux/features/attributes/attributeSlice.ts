import { createSlice } from "@reduxjs/toolkit";

type Attribute = {
  id?: number;
  name: string;
  attributeValues: string[];
};

type AttributeState = {
  attributes: Attribute[];
};

const initialState: AttributeState = {
  attributes: [
    {
      id: 1,
      name: "color",
      attributeValues: ["red", "green", "blue"],
    },
    {
      id: 2,
      name: "size",
      attributeValues: ["M", "L", "XL"],
    },
  ],
};

const attributeSlice = createSlice({
  name: "attributes",
  initialState,
  reducers: {
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
export const { addAttribute, deleteAttribute, updateAttribute } =
  attributeSlice.actions;
export default attributeSlice.reducer;
