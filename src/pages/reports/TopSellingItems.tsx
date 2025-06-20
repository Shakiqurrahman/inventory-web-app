const TopSellingItems = () => {
  return (
    <div className="p-4 bg-white h-full">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-md text-gray-700">
          <thead>
            <tr className="border-b border-gray-400 *:font-medium text-sm *:text-left">
              <th className="p-2">Item</th>
              <th className="p-2">Barcode</th>
              <th className="p-2">Sold</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <tr key={index} className="border-b border-gray-200 *:text-sm">
                <td className="p-2">
                  White Double XL T-Shirt Full Hand White Double XL T-Shirt Full
                  Hand
                </td>
                <td className="p-2">1234567890123</td>
                <td className="p-2">10</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopSellingItems;
