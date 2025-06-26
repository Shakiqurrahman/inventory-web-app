import { useGetOverviewsQuery } from "../../redux/features/reports/reportsApi";
import ProfitAndLossReportCard from "./ProfitAndLossReportCard";
import PurchaseAnalytics from "./PurchaseAnalytics";
import SaleAnalytics from "./SaleAnalytics";
import SalesOverviewChart from "./SalesOverviewChart";
import TopSellingItems from "./TopSellingItems";

const ReportsPage = () => {
  const { data: overviewsData } = useGetOverviewsQuery(null);
  return (
    <div>
      <h1 className="p-4 font-medium bg-white dark:bg-stone-700 dark:text-gray-300">
        All Reports Summary
      </h1>
      <div className="bg-white dark:bg-stone-700 mt-4">
        <div className="flex items-center justify-between gap-2 p-3 border-b border-gray-200 bg-[#F9F9F9] dark:bg-stone-600 dark:text-gray-300 dark:border-gray-500 text-sm">
          <h1>Reports - Profit & Loss</h1>
          <select className="text-sm px-3 py-1 border border-gray-300 dark:border-gray-500 rounded text-gray-500 dark:text-gray-300 outline-none">
            <option value="2024">2024</option>
          </select>
        </div>
        <div className="p-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <ProfitAndLossReportCard
            name="Expenses"
            value={overviewsData?.totalExpenses || "0"}
          />
          <ProfitAndLossReportCard
            name="Receiving"
            value={overviewsData?.totalReceivingAmount || "0"}
            bgColor="bg-[#6FD64B]"
            iconColor="text-green-600"
          />
          <ProfitAndLossReportCard
            name="Returns"
            value={overviewsData?.returnAmount || "0"}
          />
          <ProfitAndLossReportCard
            name="Sales"
            value={overviewsData?.totalSales || "0"}
            bgColor="bg-[#6FD64B]"
            iconColor="text-green-600"
          />
          <ProfitAndLossReportCard
            name="Due"
            value={overviewsData?.totalDue || "0"}
          />
          <ProfitAndLossReportCard
            name="Profit"
            value={overviewsData?.totalProfit || "0"}
            bgColor="bg-[#6FD64B]"
            iconColor="text-green-600"
          />
        </div>
      </div>
      <div className="flex flex-wrap md:flex-nowrap gap-4 mt-4">
        <div className="w-full md:w-2/3 flex flex-col">
          <h1 className="font-medium mb-4 text-lg dark:text-gray-300">
            Sales Overview
          </h1>
          <SalesOverviewChart />
        </div>
        <div className="w-full md:w-1/3 flex flex-col">
          <h1 className="mb-4 font-medium text-lg dark:text-gray-300">
            Sale Analytics
          </h1>
          <SaleAnalytics />
        </div>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap gap-4 mt-4 dark:text-gray-300">
        <div className="w-full lg:w-[50%] 2xl:w-1/3 flex flex-col shrink-0">
          <h1 className="font-medium mb-4 text-lg">Top Selling Items</h1>
          <TopSellingItems />
        </div>
        <div className="w-full lg:w-2/3 flex flex-col">
          <h1 className="mb-4 font-medium text-lg">Purchase Analytics</h1>
          <PurchaseAnalytics />
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
