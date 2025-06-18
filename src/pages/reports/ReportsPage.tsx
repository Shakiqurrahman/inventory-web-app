import ProfitAndLossReportCard from "./ProfitAndLossReportCard";

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
    </div>
  );
};

export default ReportsPage;
