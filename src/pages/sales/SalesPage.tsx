import { Fragment, useEffect, useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { IoIosCloseCircle } from "react-icons/io";
import { TbCurrencyTaka } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import {
  useGetVariantByIdOrBarCodeQuery,
  useGetVariantSuggestionsQuery,
} from "../../redux/features/sales/salesApi";
import { addSelectedItems } from "../../redux/features/sales/salesFormSlice";
import type { RootState } from "../../redux/store";
import type { IProductSuggestions } from "../../types/products";
import OrderInformation from "./OrderInformation";
import SalesInformation from "./SalesInformation";

const SalesPage = () => {
  const dispatch = useDispatch();

  const {
    salesForm: { selectedItems },
  } = useSelector((state: RootState) => state.salesForm);

  const [hideDetails, setHideDetails] = useState(false);
  const [searchItemValue, setSearchItemValue] = useState("");
  const [variantId, setVarantId] = useState("");

  const {
    data: suggestions,
    isLoading: isSuggestionsLoading,
    isFetching: isSuggestionsFetching,
  } = useGetVariantSuggestionsQuery(
    {
      search: searchItemValue,
    },
    { skip: searchItemValue.length < 3 }
  );

  const { data: item } = useGetVariantByIdOrBarCodeQuery(variantId, {
    skip: !variantId,
  });

  useEffect(() => {
    if (item) {
      // setSelectedItems((prev) => [...prev, item]);
      dispatch(addSelectedItems(item));
      setSearchItemValue("");
      setVarantId("");
    }
  }, [item, dispatch]);

  const handleChangeSearchItem = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchItemValue(e.target.value);
  };

  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!/^\d{13}$/.test(searchItemValue)) {
      toast.error("Please enter a valid barcode");
      return false;
    } else {
      setVarantId(searchItemValue);
      setSearchItemValue("");
    }
  };

  const handleSuggestionClick = (id: string) => {
    setVarantId(id);
    setSearchItemValue("");
  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap items-start gap-4">
      <div className="w-full">
        <div className="bg-white p-5 flex relative">
          <Link
            to={"/items/new-item"}
            className="shrink-0 p-3 bg-primary hover:bg-secondary text-white"
          >
            <FiEdit className="text-xl" />
          </Link>
          <form onSubmit={handleSubmitSearch} className="w-full">
            <input
              type="text"
              value={searchItemValue}
              onChange={handleChangeSearchItem}
              placeholder="Enter item name or scan barcode"
              className="w-full p-3 outline-none text-sm border border-gray-200 block"
              autoFocus
            />
          </form>
          <div className="bg-white absolute top-full  left-0 w-full z-10 ">
            {searchItemValue.length >= 3 &&
              !isSuggestionsLoading &&
              !isSuggestionsFetching &&
              suggestions?.length > 0 && (
                <ul className="border border-gray-200 max-h-[300px] overflow-y-auto">
                  {suggestions.map((item: IProductSuggestions) => (
                    <li
                      key={item.id}
                      onClick={() => handleSuggestionClick(item.id)}
                      className="p-3 hover:bg-gray-50 cursor-pointer text-sm grid grid-cols-2 place-items-center gap-2"
                    >
                      <div className="space-y-2">
                        <p>
                          {item.name} - {item.sellPrice}
                        </p>
                        <p className="text-sm text-gray-500">
                          Bar Code : {item.barcode}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p>Stock : {item.stock}</p>
                        <p>Sell Price : {item.sellPrice}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
          </div>
        </div>
        <div className="bg-white pt-2 pb-10 mt-4 paper-cut relative">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-md text-gray-700">
              <thead>
                <tr className="bg-[#F9FBFC] border-t border-b border-gray-200 *:font-semibold text-sm">
                  <th className="p-3 w-[100px]">
                    <button
                      type="button"
                      className="text-blue-500 cursor-pointer"
                      onClick={() => setHideDetails((prev) => !prev)}
                    >
                      {!hideDetails ? <FaMinus /> : <FaPlus />}
                    </button>
                  </th>
                  <th className="p-3">Item Name</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Discount</th>
                  <th className="p-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedItems?.map((item) => (
                  <Fragment key={item.id}>
                    <tr
                      className={`${
                        !hideDetails ? "" : "border-b border-gray-200"
                      } hover:bg-gray-50 text-sm text-center`}
                    >
                      <td className="p-3">
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-600 cursor-pointer"
                        >
                          <IoIosCloseCircle className="text-xl" />
                        </button>
                      </td>
                      <td className="p-3 text-left">{item.name}</td>
                      <td className="p-3 flex items-center justify-center">
                        <TbCurrencyTaka />
                        10
                      </td>
                      <td className="p-3">1</td>
                      <td className="p-3">0%</td>
                      <td className="p-3">10</td>
                    </tr>
                    {!hideDetails && (
                      <tr className="text-sm border-b border-gray-200 hover:bg-gray-50">
                        <td></td>
                        <td className="p-3 text-gray-500">
                          <ul className="text-[13px]">
                            <li className="flex items-center justify-between gap-2">
                              <span>Category</span>
                              <span>{item.product.category?.name}</span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <span>Brand</span>
                              <span>{item.product.brand}</span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <span>Stock</span>
                              <span>1</span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <span>Variant</span>
                              <span>
                                {Object.entries(item.attributes)
                                  .map(([key, value]) => `${key} - ${value}`)
                                  .join(", ")}
                              </span>
                            </li>
                          </ul>
                        </td>
                        <td colSpan={5}></td>
                      </tr>
                    )}
                  </Fragment>
                ))}
                <tr className="text-lg sm:text-2xl border-b border-gray-200 hover:bg-gray-50">
                  <td colSpan={6} className="p-3 text-center text-[#EAC841]">
                    There are no items in the cart{" "}
                    <span className="text-[#6FD686]">[Sales]</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[500px] shrink-0">
        <SalesInformation />
        <OrderInformation />
      </div>
    </div>
  );
};

export default SalesPage;
