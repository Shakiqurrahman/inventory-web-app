import { useEffect } from "react";
import { BsFillInfoCircleFill, BsToggles } from "react-icons/bs";
import { TbCurrencyTaka } from "react-icons/tb";
import { useNavigate, useParams } from "react-router";
import {
  useGetSingleItemQuery,
  type IProductVariant,
} from "../../redux/features/items/itemApiSlice";

const ItemViewPage = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetSingleItemQuery(itemId);

  useEffect(() => {
    if (!isLoading && !data) {
      navigate("/not-found");
    }
  }, [data, isLoading, navigate]);

  return (
    <div className="bg-white p-4">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 rounded-md text-gray-700">
              <thead>
                <tr className="bg-gray-200 text-left *:font-semibold text-sm">
                  <th colSpan={2} className="p-3">
                    <span className="flex items-center gap-1">
                      <BsFillInfoCircleFill /> Item Information
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50 text-sm border-collapse">
                  <td className="p-3 border border-gray-200">Name</td>
                  <td className="p-3 border border-gray-200">
                    {data?.name || ""}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 text-sm border-collapse">
                  <td className="p-3 border border-gray-200">Description</td>
                  <td className="p-3 border border-gray-200">
                    {data?.description || "N/A"}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 text-sm border-collapse">
                  <td className="p-3 border border-gray-200">Brand</td>
                  <td className="p-3 border border-gray-200">
                    {data?.brand || "N/A"}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 text-sm border-collapse">
                  <td className="p-3 border border-gray-200">Category</td>
                  <td className="p-3 border border-gray-200">
                    {data?.category?.name || "N/A"}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 text-sm border-collapse">
                  <td className="p-3 border border-gray-200">Cost Price</td>
                  <td className="p-3 border border-gray-200">
                    <span className="flex items-center">
                      <TbCurrencyTaka />
                      {data?.costPrice || "0"}
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 text-sm border-collapse">
                  <td className="p-3 border border-gray-200">Sell Price</td>
                  <td className="p-3 border border-gray-200">
                    <span className="flex items-center">
                      <TbCurrencyTaka />
                      {data?.sellPrice || "0"}
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 text-sm border-collapse">
                  <td className="p-3 border border-gray-200">Discount (%)</td>
                  <td className="p-3 border border-gray-200">
                    <span className="flex items-center">
                      {data?.discountPercentage
                        ? data?.discountPercentage + "%"
                        : "0%"}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="overflow-x-auto mt-5">
            <table className="w-full border-collapse border border-gray-200 rounded-md text-gray-700">
              <thead>
                <tr className="bg-gray-200 text-left *:font-semibold text-sm">
                  <th colSpan={5} className="p-3">
                    <span className="flex items-center gap-1">
                      <BsToggles /> Item Variation
                    </span>
                  </th>
                </tr>
                <tr className="bg-gray-100 text-left *:font-semibold text-sm">
                  <th className="p-3 border border-gray-200">Name</th>
                  <th className="p-3 border border-gray-200">Attributes</th>
                  <th className="p-3 border border-gray-200">Cost Price</th>
                  <th className="p-3 border border-gray-200">Sell Price</th>
                  <th className="p-3 border border-gray-200">Stock</th>
                </tr>
              </thead>
              <tbody>
                {data?.variant?.map((v: IProductVariant, i: number) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-50 text-sm border-collapse"
                  >
                    <td className="p-3 border border-gray-200">{v.name}</td>
                    <td className="p-3 border border-gray-200">
                      {v.attributes
                        ? Object.entries(v.attributes)
                            .map(([key, value]) => `${key}:${value}`)
                            .join(", ")
                        : "N/A"}
                    </td>
                    <td className="p-3 border border-gray-200">
                      <span className="flex items-center">
                        <TbCurrencyTaka />
                        {v?.costPrice || "0"}
                      </span>
                    </td>
                    <td className="p-3 border border-gray-200">
                      <span className="flex items-center">
                        <TbCurrencyTaka />
                        {v?.sellPrice || "0"}
                      </span>
                    </td>
                    <td className="p-3 border border-gray-200">
                      {v.stock || "0"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ItemViewPage;
