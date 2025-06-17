/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ICategory } from "../redux/features/items/itemApiSlice";

type Product = {
  id: string;
  name: string;
  description: string;
  brand: string;
  sellPrice: number;
  costPrice: number;
  categoryId: string;
  isDeleted: boolean;
  attributes: Record<string, string>;
  discountPercentage: number | null;
  createdAt: string;
  updatedAt: string;
  category: ICategory;
};

export type IProductVariant = {
  id: string;
  name: string;
  barcode: string;
  stock: number;
  sellPrice: number;
  costPrice: number;
  attributes: Record<string, string>;
  productId: string;
  isDeleted: boolean;
  trashAttributes: any;
  createdAt: string;
  updatedAt: string;
  product: Product;
};

export type ISaleVariant = {
  createdAt: string;
  discountPercentage: number;
  dueAmount: number;
  id: string;
  isFree: boolean;
  price: number;
  quantity: number;
  saleId: string;
  updatedAt: string;
  variant: IProductVariant;
  variantId: string;
  subTotal: number;
};

export type IProductSuggestions = {
  id: string;
  name: string;
  barcode: string;
  stock: number;
  sellPrice: number;
  costPrice: number;
  attributes: Record<string, string>;
};
