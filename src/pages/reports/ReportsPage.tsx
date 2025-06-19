import ProfitAndLossReportCard from "./ProfitAndLossReportCard";
import PurchaseAnalytics from "./PurchaseAnalytics";
import SaleAnalytics from "./SaleAnalytics";
import SalesOverviewChart from "./SalesOverviewChart";

const ReportsPage = () => {
  return (
    <div>
      <h1 className="p-4 font-medium bg-white">All Reports Summary</h1>
      <div className="bg-white mt-4">
        <h1 className="p-3 border-b border-gray-200 bg-[#F9F9F9] text-sm">
          Reports - Profit & Loss
        </h1>
        <div className="p-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <ProfitAndLossReportCard
            name="Receiving"
            value={"0"}
            bgColor="bg-[#6FD64B]"
            iconColor="text-green-600"
          />
          <ProfitAndLossReportCard name="Expenses" value={"0"} />
          <ProfitAndLossReportCard
            name="Sales"
            value={"0"}
            bgColor="bg-[#6FD64B]"
            iconColor="text-green-600"
          />
          <ProfitAndLossReportCard name="Returns" value={"0"} />
          <ProfitAndLossReportCard
            name="Profit"
            value={"0"}
            bgColor="bg-[#6FD64B]"
            iconColor="text-green-600"
          />
        </div>
      </div>
      <div className="flex flex-wrap md:flex-nowrap gap-4 mt-4">
        <div className="w-full md:w-2/3 flex flex-col">
          <h1 className="font-medium mb-4 text-lg">Sales Overview</h1>
          <SalesOverviewChart />
        </div>
        <div className="w-full md:w-1/3 flex flex-col">
          <h1 className="mb-4 font-medium text-lg">Sale Analytics</h1>
          <SaleAnalytics />
        </div>
      </div>
      <div className="flex flex-wrap md:flex-nowrap gap-4 mt-4">
        <div className="w-full md:w-1/3 flex flex-col">
          <h1 className="font-medium mb-4 text-lg">Sales</h1>
          <SalesOverviewChart />
        </div>
        <div className="w-full md:w-2/3 flex flex-col">
          <h1 className="mb-4 font-medium text-lg">Purchase Analytics</h1>
          <PurchaseAnalytics />
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
