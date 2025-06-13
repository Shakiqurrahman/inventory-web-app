import { baseApi } from "../../api/baseApi";

const expensesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBankDepositList: builder.query({
            query: (args = {}) => {
                const { page, limit = 1, search = "" } = args || {};

                const queryParams = new URLSearchParams();
                if (search) queryParams.append("search", search);
                if (page) queryParams.append("page", page);
                if (limit) queryParams.append("limit", limit);

                return {
                    url: `/bank_deposits?${queryParams.toString()}`,
                    method: "GET",
                };
            },
            providesTags: ["bankDeposit"],
            transformResponse: (response) => response?.data,
        }),
        createBankDeposit: builder.mutation({
            query: (body) => ({
                url: "/bank_deposits",
                method: "POST",
                body,
            }),
            invalidatesTags: ["bankDeposit"],
        }),

        deleteBankDeposit: builder.mutation({
            query: (id) => ({
                url: `/bank_deposits/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["bankDeposit"],
        }),
    }),
});

export const {
    useGetBankDepositListQuery,
    useCreateBankDepositMutation,
    useDeleteBankDepositMutation,
} = expensesApi;
