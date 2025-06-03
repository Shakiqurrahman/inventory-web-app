import { baseApi } from "../../api/baseApi";

const categoriesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({
                url: "/categories",
                method: "GET",
            }),
            providesTags: ["categories"],
            transformResponse: (response) => response?.data,
        }),
        createCategory: builder.mutation({
            query: (userInfo) => ({
                url: "/categories",
                method: "POST",
                body: userInfo,
            }),
            invalidatesTags: ["categories"],
        }),

        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/categories/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["categories"],
        }),
        // forgotPassword: builder.mutation({
        //     query: (email) => ({
        //         url: `/auth/forgot-password/${email}`,
        //         method: "POST",
        //     }),
        // }),
    }),
});

export const {
    useCreateCategoryMutation,
    useGetCategoriesQuery,
    useDeleteCategoryMutation,
    // useForgotPasswordMutation,
} = categoriesApi;
