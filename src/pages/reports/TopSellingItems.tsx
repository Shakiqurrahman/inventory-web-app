import {
  useGetTopSellingReportsQuery,
  type ITopSellingItem,
} from "../../redux/features/reports/reportsApi";

const TopSellingItems = () => {
  const { data, isLoading } = useGetTopSellingReportsQuery(10);
  console.log(data);
  return (
    <div className="p-4 bg-white dark:bg-stone-700 h-full">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-md text-gray-700 dark:text-gray-300">
          <thead>
            <tr className="border-b border-gray-400 *:font-medium text-sm *:text-left">
              <th className="p-2">Item</th>
              <th className="p-2">Barcode</th>
              <th className="p-2">Sold</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={3} className="p-2">
                  Loading...
                </td>
              </tr>
            ) : data && data?.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-2">
                  No Data Found.
                </td>
              </tr>
            ) : (
              data &&
              data?.map((item: ITopSellingItem, index: number) => (
                <tr key={index} className="border-b border-gray-200 *:text-sm">
                  <td className="p-2">{item?.variantName}</td>
                  <td className="p-2">{item?.barcode}</td>
                  <td className="p-2">{item?.totalSoldQuantity}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopSellingItems;
