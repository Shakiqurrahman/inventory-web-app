import { baseApi } from "../../api/baseApi";

const expensesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getReceivingHistory: builder.query({
            query: () => ({
                url: "/receivings",
                method: "GET",
            }),
            providesTags: ["receivingsHistory"],
            transformResponse: (response) => response?.data,
        }),
        deleteReceivingHistory: builder.mutation({
            query: (id) => ({
                url: `/receivings/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["receivingsHistory"],
        }),
        updateReceivingHistory: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/receivings/${id}`,
                method: "PUT",
                body: body,
            }),
            invalidatesTags: ["receivingsHistory"],
        }),
    }),
});

export const {
    useGetReceivingHistoryQuery,
    useDeleteReceivingHistoryMutation,
    useUpdateReceivingHistoryMutation,
} = expensesApi;
