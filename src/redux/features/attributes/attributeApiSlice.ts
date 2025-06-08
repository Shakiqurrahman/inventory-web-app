import { baseApi } from "../../api/baseApi";

const attributesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAttributes: builder.query({
      query: () => ({
        url: "/attributes",
        method: "GET",
      }),
      providesTags: ["attributes"],
      transformResponse: (response) => response?.data,
    }),
    saveAttributes: builder.mutation({
      query: (attributesData) => ({
        url: "/attributes",
        method: "POST",
        body: attributesData,
      }),
      invalidatesTags: ["attributes"],
    }),
  }),
});

export const { useGetAttributesQuery, useSaveAttributesMutation } =
  attributesApi;
