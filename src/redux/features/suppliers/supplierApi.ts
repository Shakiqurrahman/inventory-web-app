import { baseApi } from "../../api/baseApi";

const supplierApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSupplier: builder.query({
            query: (args = {}) => {
                const { page, limit = 1, search = "" } = args || {};

                const queryParams = new URLSearchParams();
                if (search) queryParams.append("search", search);
                if (page) queryParams.append("page", page);
                if (limit) queryParams.append("limit", limit);

                return {
                    url: `/suppliers?${queryParams.toString()}`,
                    method: "GET",
                };
            },
            providesTags: ["suppliers"],
            transformResponse: (response) => response?.data,
        }),
        createSupplier: builder.mutation({
            query: (supplierObj) => ({
                url: "/suppliers",
                method: "POST",
                body: supplierObj,
            }),

            invalidatesTags: ["suppliers"],
        }),

        deleteSupplier: builder.mutation({
            query: (id) => ({
                url: `/suppliers/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["suppliers"],
        }),
        updateSupplier: builder.mutation({
            query: ({ payload, id }) => ({
                url: `/suppliers/${id}`,
                method: "PUT",
                body: payload,
            }),
            invalidatesTags: ["suppliers"],
        }),
    }),
});

export const {
    useGetSupplierQuery,
    useCreateSupplierMutation,
    useDeleteSupplierMutation,
    useUpdateSupplierMutation,
} = supplierApi;
