import { baseApi } from "../../api/baseApi";

const expensesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getEmployeeSalary: builder.query({
            query: (args = {}) => {
                const { page, limit = 1, search = "" } = args || {};

                const queryParams = new URLSearchParams();
                if (search) queryParams.append("search", search);
                if (page) queryParams.append("page", page);
                if (limit) queryParams.append("limit", limit);

                return {
                    url: `/employees/salary?${queryParams.toString()}`,
                    method: "GET",
                };
            },
            providesTags: ["employeeSalary"],
            transformResponse: (response) => response?.data,
        }),
        createEmployeeSalary: builder.mutation({
            query: (salaryINfo) => ({
                url: "/employees/salary",
                method: "POST",
                body: salaryINfo,
            }),
            invalidatesTags: ["employeeSalary"],
        }),

        deleteEmployeeSalary: builder.mutation({
            query: (id) => ({
                url: `/employees/salary/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["employeeSalary"],
        }),
        updateEmployeeSalary: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/employees/salary/${id}`,
                method: "PUT",
                body: body,
            }),
            invalidatesTags: ["employeeSalary"],
        }),
    }),
});

export const {
    useGetEmployeeSalaryQuery,
    useCreateEmployeeSalaryMutation,
    useDeleteEmployeeSalaryMutation,
    useUpdateEmployeeSalaryMutation,
} = expensesApi;
