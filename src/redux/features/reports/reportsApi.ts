import { baseApi } from "../../api/baseApi";

export type ITopSellingItem = {
  productId: string;
  productName: string;
  barcode: string;
  variantName: string;
  totalSoldQuantity: number;
};

const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOverviews: builder.query({
      query: () => ({
        url: `/reports/overview`,
        method: "GET",
      }),
      providesTags: ["reports"],
      transformResponse: (response) => response?.data,
    }),
    getTopSellingReports: builder.query({
      query: (limit) => ({
        url: `/reports/top-selling-products?limit=${limit || 6}`,
        method: "GET",
      }),
      providesTags: ["reports"],
      transformResponse: (response) => response?.data,
    }),
  }),
});

export const { useGetOverviewsQuery, useGetTopSellingReportsQuery } =
  reportsApi;
