import { baseApi } from "../../api/baseApi";

const storeConfigApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStoreConfigData: builder.query({
      query: () => ({
        url: "/store-configs",
        method: "GET",
      }),
      providesTags: ["storeConfig"],
      transformResponse: (response) => response?.data,
    }),
    saveStoreConfigData: builder.mutation({
      query: (formData) => ({
        url: "/store-configs",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["storeConfig"],
    }),
  }),
});

export const { useGetStoreConfigDataQuery, useSaveStoreConfigDataMutation } =
  storeConfigApi;
