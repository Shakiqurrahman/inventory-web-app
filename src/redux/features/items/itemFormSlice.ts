import { createSlice } from "@reduxjs/toolkit";

type Form = {
  name: string;
  costPrice: string;
  sellPrice: string;
  discountPercentage: string;
  description: string;
  categoryId: string;
  brand: string;
  stock: string;
  isVariantChecked: boolean;
};

type Attribute = {
  name: string;
  attributeValues: string[];
  trashValues: string[];
};

type Variation = {
  name: string;
  attributes: string[];
  trashAttributes: string[];
  stock: string;
  costPrice: string;
  sellPrice: string;
};

type ItemFormState = {
  form: Form;
  attributes: Attribute[];
  variations: Variation[];
};

const initialState: ItemFormState = {
  form: {
    name: "",
    costPrice: "",
    sellPrice: "",
    discountPercentage: "",
    description: "",
    categoryId: "",
    brand: "",
    stock: "",
    isVariantChecked: false,
  },
  attributes: [],
  variations: [],
};

const itemFormSlice = createSlice({
  name: "itemForm",
  initialState,
  reducers: {
    createForm: (state, action) => {
      state.form = action.payload;
    },
    changeFormValues: (state, action) => {
      state.form = { ...state.form, ...action.payload };
    },
    addAttributeToItem: (state, action) => {
      state.attributes.push(action.payload);
    },
    removeAttributeFromItem: (state, action) => {
      state.attributes.splice(action.payload, 1);
    },
    removeAttributeValuesFromItem: (state, action) => {
      const { index, updatedAttribute } = action.payload;
      state.attributes[index] = updatedAttribute;
    },
    restoreAttributeValuesFromTrash: (state, action) => {
      const { index, updatedAttribute } = action.payload;
      state.attributes[index] = updatedAttribute;
    },
    addVariationField: (state, action) => {
      state.variations.push(action.payload);
    },
    removeVariationField: (state, action) => {
      state.variations = state.variations.filter(
        (_, i) => i !== action.payload
      );
    },
    autoGenerateVariations: (state, action) => {
      state.variations = [...state.variations, ...action.payload];
    },
    newAutoGenerateVariations: (state, action) => {
      state.variations = action.payload;
    },
    updateVariationValues: (state, action) => {
      const { index, updatedVariation } = action.payload;
      if (state.variations[index]) {
        state.variations[index] = updatedVariation;
      }
    },
    removeVariationAttributesFromItem: (state, action) => {
      const { index, updatedAttribute } = action.payload;
      state.variations[index] = updatedAttribute;
    },
    restoreVariationAttributesFromTrash: (state, action) => {
      const { index, updatedAttribute } = action.payload;
      state.variations[index] = updatedAttribute;
    },
    resetItemForm: (state, action) => {
      const { form, attributes, variations } = action.payload;
      state.form = form;
      state.attributes = attributes;
      state.variations = variations;
    },
  },
});

export const {
  createForm,
  changeFormValues,
  addAttributeToItem,
  removeAttributeFromItem,
  removeAttributeValuesFromItem,
  restoreAttributeValuesFromTrash,
  addVariationField,
  removeVariationField,
  autoGenerateVariations,
  newAutoGenerateVariations,
  updateVariationValues,
  removeVariationAttributesFromItem,
  restoreVariationAttributesFromTrash,
  resetItemForm,
} = itemFormSlice.actions;
export default itemFormSlice.reducer;
