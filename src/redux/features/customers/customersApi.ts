import { baseApi } from "../../api/baseApi";

const categoriesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCustomers: builder.query({
            query: () => ({
                url: "/categories",
                method: "GET",
            }),
            providesTags: ["categories"],
            transformResponse: (response) => response?.data,
        }),
        createCustomers: builder.mutation({
            query: (userInfo) => ({
                url: "/categories",
                method: "POST",
                body: userInfo,
            }),
            invalidatesTags: ["categories"],
        }),

        deleteCustomers: builder.mutation({
            query: (id) => ({
                url: `/categories/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["categories"],
        }),
        updateCustomers: builder.mutation({
            query: ({ id, name }) => ({
                url: `/categories/${id}`,
                method: "PUT",
                body: { name },
            }),
            invalidatesTags: ["categories"],
        }),
    }),
});

export const {
    useGetCustomersQuery,
    useCreateCustomersMutation,
    useDeleteCustomersMutation,
    useUpdateCustomersMutation,
} = categoriesApi;
