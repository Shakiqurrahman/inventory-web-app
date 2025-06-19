import { baseApi } from "../../api/baseApi";

const expensesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSalesHistory: builder.query({
      query: (args = {}) => {
        const {
          page,
          limit = 20,
          search = "",
          dateRange = "all_time",
        } = args || {};

        const queryParams = new URLSearchParams();
        if (search) queryParams.append("search", search);
        if (page) queryParams.append("page", page);
        if (limit) queryParams.append("limit", limit);
        if (dateRange) queryParams.append("dateRange", dateRange);

        return {
          url: `/sales?${queryParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["saleHistory"],
      transformResponse: (response) => response?.data,
    }),
    deleteSalesHistory: builder.mutation({
      query: (id) => ({
        url: `/sales/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["saleHistory"],
    }),
    updateSalesHistory: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/sales/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["saleHistory"],
    }),
    returnSales: builder.mutation({
      query: ({ id, returnData }) => ({
        url: `/sales/${id}/refund`,
        method: "PATCH",
        body: returnData,
      }),
      invalidatesTags: ["saleHistory"],
    }),
    getSalesHistoryById: builder.query({
      query: (saleId) => ({
        url: `/sales/${saleId}`,
        method: "GET",
      }),
      providesTags: ["saleHistory"],
      transformResponse: (response) => response?.data,
    }),
    updateSales: builder.mutation({
      query: (updatedData) => ({
        url: `/sales/${updatedData?.id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["saleHistory"],
    }),
  }),
});

export const {
  useGetSalesHistoryQuery,
  useDeleteSalesHistoryMutation,
  useUpdateSalesHistoryMutation,
  useReturnSalesMutation,
  useGetSalesHistoryByIdQuery,
  useUpdateSalesMutation,
} = expensesApi;
