import type {
  IDashboardOverview,
  IPieChartData,
  IWeeklySale,
} from "../../../types/dashboard";
import { baseApi } from "../../api/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardOverview: builder.query<IDashboardOverview, null>({
      query: () => ({
        url: "/dashboard",
        method: "GET",
      }),
      providesTags: ["dashboard"],
      transformResponse: (response: unknown): IDashboardOverview => {
        return (response as { data: IDashboardOverview }).data;
      },
    }),

    getWeeklySales: builder.query<IWeeklySale[], null>({
      query: () => ({
        url: `/dashboard/weekly-sales`,
        method: "GET",
      }),
      providesTags: ["dashboard"],
      transformResponse: (response: unknown): IWeeklySale[] => {
        return (response as { data: IWeeklySale[] }).data;
      },
    }),

    getPieChartData: builder.query<IPieChartData, null>({
      query: () => ({
        url: `/dashboard/pie-chart-info`,
        method: "GET",
      }),
      providesTags: ["dashboard"],
      transformResponse: (response: unknown): IPieChartData => {
        return (response as { data: IPieChartData }).data;
      },
    }),
  }),
});

export const {
  useGetDashboardOverviewQuery,
  useGetWeeklySalesQuery,
  useGetPieChartDataQuery,
} = dashboardApi;
