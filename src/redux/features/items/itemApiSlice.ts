import { baseApi } from "../../api/baseApi";

export type IProductSummary = {
  id: string;
  name: string;
  brand: string;
  sellPrice: number;
  costPrice: number;
  category: {
    name: string;
  };
  totalStock: number;
};

export type ICategory = {
  id: string;
  name: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type IProductVariant = {
  id: string;
  name: string;
  barcode: string;
  stock: number;
  sellPrice: number;
  costPrice: number;
  attributes: {
    [key: string]: string; // e.g., { size: '42', color: 'Red' }
  };
  productId: string;
  isDeleted: boolean;
  trashAttributes: Record<string, string> | null;
  createdAt: string;
  updatedAt: string;
};

export type IProduct = {
  id: string;
  name: string;
  description: string;
  brand: string;
  sellPrice: number;
  costPrice: number;
  categoryId: string;
  isDeleted: boolean;
  attributes: Record<string, string> | null;
  discountPercentage: number | null;
  createdAt: string;
  updatedAt: string;
  category: ICategory;
  variant: IProductVariant[];
};

const itemsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query({
      query: (args = {}) => {
        const { page, limit = 1, search = "" } = args || {};

        const queryParams = new URLSearchParams();
        if (search) queryParams.append("search", search);
        if (page) queryParams.append("page", page);
        if (limit) queryParams.append("limit", limit);

        return {
          url: `/products?${queryParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["items"],
      transformResponse: (response) => response?.data,
    }),
    createItem: builder.mutation({
      query: (itemData) => ({
        url: "/products",
        method: "POST",
        body: itemData,
      }),
      invalidatesTags: ["items"],
    }),
    deleteItem: builder.mutation({
      query: (itemId) => ({
        url: `products/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["items"],
    }),
    getSingleItem: builder.query({
      query: (itemId) => ({
        url: `/products/${itemId}`,
        method: "GET",
      }),
      providesTags: ["items"],
      transformResponse: (response) => response?.data,
    }),
  }),
});

export const {
  useGetItemsQuery,
  useCreateItemMutation,
  useDeleteItemMutation,
  useGetSingleItemQuery,
} = itemsApi;
