import { baseApi } from "../../api/baseApi";

const expensesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getExpensesList: builder.query({
            query: () => ({
                url: "/expenses",
                method: "GET",
            }),
            providesTags: ["expenses"],
            transformResponse: (response) => response?.data,
        }),
        createExpenses: builder.mutation({
            query: (userInfo) => ({
                url: "/expenses",
                method: "POST",
                body: userInfo,
            }),
            invalidatesTags: ["expenses"],
        }),

        deleteExpenses: builder.mutation({
            query: (id) => ({
                url: `/expenses/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["expenses"],
        }),
        updateExpenses: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/expenses/${id}`,
                method: "PUT",
                body: body,
            }),
            invalidatesTags: ["expenses"],
        }),
    }),
});

export const {
    useGetExpensesListQuery,
    useCreateExpensesMutation,
    useDeleteExpensesMutation,
    useUpdateExpensesMutation,
} = expensesApi;
