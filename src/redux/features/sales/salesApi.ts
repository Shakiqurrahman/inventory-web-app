import { baseApi } from "../../api/baseApi";

const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVariantSuggestions: builder.query({
      query: (args = {}) => {
        const { search = "" } = args || {};

        const queryParams = new URLSearchParams();
        if (search) queryParams.append("searchTerm", search);

        return {
          url: `/products/variant/suggestions?${queryParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["sales"],
      transformResponse: (response) => response?.data,
    }),

    getVariantByIdOrBarCode: builder.query({
      query: (vairantId) => ({
        url: `/products/variant/${vairantId}`,
        method: "GET",
      }),
      providesTags: ["sales"],
      transformResponse: (response) => response?.data,
    }),
    createSale: builder.mutation({
      query: (formData) => ({
        url: `/sales`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["sales"],
      transformResponse: (response) => response?.data,
    }),
    getSaleById: builder.query({
      query: (saleId) => ({
        url: `/sales/${saleId}`,
        method: "GET",
      }),
      providesTags: ["sales"],
      transformResponse: (response) => response?.data,
    }),
  }),
});

export const {
  useGetVariantSuggestionsQuery,
  useGetVariantByIdOrBarCodeQuery,
  useCreateSaleMutation,
  useGetSaleByIdQuery,
  useLazyGetSaleByIdQuery,
} = salesApi;
