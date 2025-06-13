import { baseApi } from "../../api/baseApi";

export type ICustomer = {
  id: string;
  name: string;
  phone: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

const customersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: (args = {}) => {
        const { page, limit = 1, search = "" } = args || {};

        const queryParams = new URLSearchParams();
        if (search) queryParams.append("search", search);
        if (page) queryParams.append("page", page);
        if (limit) queryParams.append("limit", limit);

        return {
          url: `/customers?${queryParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["customers"],
      transformResponse: (response) => response?.data,
    }),
  }),
});

export const { useGetCustomersQuery } = customersApi;
