import { baseApi } from "../../api/baseApi";

const itemsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
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
  }),
});

export const { useGetItemsQuery, useCreateItemMutation } = itemsApi;
