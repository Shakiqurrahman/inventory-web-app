import { baseApi } from "../../api/baseApi";

const receivingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReceive: builder.mutation({
      query: (formData) => ({
        url: `/receivings`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["receivings"],
      transformResponse: (response) => response?.data,
    }),
    getReceiveById: builder.query({
      query: (receiveId) => ({
        url: `/receivings/${receiveId}`,
        method: "GET",
      }),
      providesTags: ["receivings"],
      transformResponse: (response) => response?.data,
    }),
  }),
});

export const { useCreateReceiveMutation, useGetReceiveByIdQuery } =
  receivingApi;
