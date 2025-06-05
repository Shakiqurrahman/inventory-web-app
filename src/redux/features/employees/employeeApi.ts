import { baseApi } from "../../api/baseApi";

const employeesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getEmployeeList: builder.query({
            query: () => ({
                url: "/employees",
                method: "GET",
            }),
            providesTags: ["employees"],
            transformResponse: (response) => response?.data,
        }),
        createEmployee: builder.mutation({
            query: (userInfo) => ({
                url: "/employees",
                method: "POST",
                body: userInfo,
            }),
            invalidatesTags: ["employees"],
        }),

        deleteEmployee: builder.mutation({
            query: (id) => ({
                url: `/employees/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["employees"],
        }),
        updateEmployee: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/employees/${id}`,
                method: "PUT",
                body: body,
            }),
            invalidatesTags: ["employees"],
        }),
    }),
});

export const {
    useGetEmployeeListQuery,
    useCreateEmployeeMutation,
    useDeleteEmployeeMutation,
    useUpdateEmployeeMutation,
} = employeesApi;
