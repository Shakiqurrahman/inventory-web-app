import { baseApi } from "../../api/baseApi";

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
  }),
});

export const { useGetOverviewsQuery } = reportsApi;
