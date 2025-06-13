import { baseApi } from "../../api/baseApi";

const expensesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSalesHistory: builder.query({
            query: (args = {}) => {
                const { page, limit = 1, search = "" } = args || {};

                const queryParams = new URLSearchParams();
                if (search) queryParams.append("search", search);
                if (page) queryParams.append("page", page);
                if (limit) queryParams.append("limit", limit);

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
    }),
});

export const {
    useGetSalesHistoryQuery,
    useDeleteSalesHistoryMutation,
    useUpdateSalesHistoryMutation,
} = expensesApi;
