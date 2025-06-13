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
import {
  addSelectedItems,
  changeDueAmount,
  removePayments,
  removeSelectedItem,
  updateDiscountAmount,
  updateDiscountPercentage,
  updateSelectedItem,
  updateTotalAmount,
} from "../../redux/features/sales/salesFormSlice";
import type { RootState } from "../../redux/store";
import type { IProductSuggestions } from "../../types/products";
import InlineEditor from "../receivings/InlineEditor";
import OrderInformation from "./OrderInformation";
import SalesInformation from "./SalesInformation";

const SalesPage = () => {
  const dispatch = useDispatch();

  const {
    salesForm: { selectedItems, payments, discountAmount },
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

  const { data: item, isFetching } = useGetVariantByIdOrBarCodeQuery(
    variantId,
    {
      skip: !variantId,
    }
  );

  useEffect(() => {
    if (item && !isFetching && variantId) {
      const extendItem = {
        ...item,
        quantity: 1,
        discount: parseFloat(item?.discountPercentage).toFixed(2) || 0,
        totalPrice:
          parseFloat(item?.discountPercentage) > 0
            ? item.sellPrice * (1 - item?.discountPercentage / 100)
            : item.sellPrice,
      };
      dispatch(addSelectedItems(extendItem));
      setSearchItemValue("");
      setVarantId("");
    }
  }, [item, dispatch, variantId, isFetching]);

  useEffect(() => {
    if (discountAmount > 0) {
      const totalPrice = selectedItems.reduce(
        (acc, curr) => acc + curr.totalPrice,
        0
      );

      const totalPaid = payments.reduce((acc, curr) => acc + curr.amount, 0);
      dispatch(updateTotalAmount(totalPrice - discountAmount));
      dispatch(changeDueAmount(totalPrice - totalPaid - discountAmount));
    } else {
      const totalAmount = selectedItems.reduce(
        (acc, curr) => acc + curr.totalPrice,
        0
      );
      dispatch(updateTotalAmount(totalAmount));

      const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
      dispatch(changeDueAmount(totalAmount > 0 ? totalAmount - totalPaid : 0));
      if (selectedItems.length <= 0 && payments.length > 0) {
        dispatch(removePayments([]));
      } else if (selectedItems.length <= 0) {
        dispatch(updateDiscountAmount(0));
        dispatch(updateDiscountPercentage(0));
      }
    }
  }, [selectedItems, payments, dispatch]);

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

  const handleSuggestionClick = (id: string, stock: number) => {
    if (stock > 0) {
      setVarantId(id);
      setSearchItemValue("");
    } else {
      toast.error("This item has no available stock!");
    }
  };

  const handleRemoveSelectedItem = (id: string) => {
    if (id) {
      const updateItems = selectedItems.filter((item) => item.id !== id);
      dispatch(removeSelectedItem(updateItems));
    }
  };

  const handleChangeQuantity = (id: string, value: string) => {
    if (id) {
      const findItem = selectedItems.find((item) => item.id === id);
      if (
        findItem &&
        parseInt(value) <= findItem.stock &&
        parseInt(value) > 0
      ) {
        const modifyItem = {
          ...findItem,
          quantity: parseInt(value),
          totalPrice:
            findItem.discount > 0
              ? parseInt(value) *
                findItem.sellPrice *
                (1 - findItem.discount / 100)
              : findItem.sellPrice * parseInt(value) || 0,
        };
        const updateItems = selectedItems.map((item) => {
          if (item.id === id) {
            return modifyItem;
          } else {
            return item;
          }
        });
        dispatch(updateSelectedItem(updateItems));
      } else if (parseInt(value) <= 0) {
        toast.error("Minimum quantity 1");
      } else {
        toast.error(`Available stock ${findItem?.stock}`);
      }
    }
  };

  const handleChangeDiscount = (id: string, value: string) => {
    if (id) {
      const findItem = selectedItems.find((item) => item.id === id);
      if (findItem && parseInt(value) >= 0 && parseInt(value) <= 100) {
        const modifyItem = {
          ...findItem,
          discount: parseFloat(value),
          totalPrice:
            parseFloat(value) > 0
              ? findItem.quantity *
                findItem.sellPrice *
                (1 - parseFloat(value) / 100)
              : findItem.sellPrice * findItem.quantity || 0,
        };
        const updateItems = selectedItems.map((item) => {
          if (item.id === id) {
            return modifyItem;
          } else {
            return item;
          }
        });
        dispatch(updateSelectedItem(updateItems));
        dispatch(updateDiscountPercentage(0));
        dispatch(updateDiscountAmount(0));
      } else {
        toast.error("Minimum 1 and Maximum 100% discount");
      }
    }
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
                      onClick={() => handleSuggestionClick(item.id, item.stock)}
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
                {selectedItems?.map((item, idx) => (
                  <Fragment key={idx}>
                    <tr
                      className={`${
                        !hideDetails ? "" : "border-b border-gray-200"
                      } hover:bg-gray-50 text-sm text-center`}
                    >
                      <td className="p-3">
                        <button
                          type="button"
                          onClick={() => handleRemoveSelectedItem(item.id)}
                          className="text-red-500 hover:text-red-600 cursor-pointer"
                        >
                          <IoIosCloseCircle className="text-xl" />
                        </button>
                      </td>
                      <td className="p-3 text-left">{item.name}</td>
                      <td className="p-3 flex items-center justify-center">
                        <TbCurrencyTaka />
                        {item.sellPrice}
                      </td>
                      <td className="p-3">
                        <span className="">
                          <InlineEditor
                            label="Quantity"
                            value={item.quantity}
                            onChange={(val) =>
                              handleChangeQuantity(item.id, val)
                            }
                            inputType="number"
                          />
                        </span>
                      </td>
                      <td className="p-3">
                        <InlineEditor
                          label="Discount"
                          value={item.discount}
                          onChange={(val) => handleChangeDiscount(item.id, val)}
                          inputType="number"
                          suffix="%"
                        />
                      </td>
                      <td className="p-3">{item.totalPrice.toFixed(2)}</td>
                    </tr>
                    {!hideDetails && (
                      <tr className="text-sm border-b border-gray-200 hover:bg-gray-50">
                        <td></td>
                        <td className="p-3 text-gray-500">
                          <ul className="text-[13px]">
                            <li className="flex items-center justify-between gap-2">
                              <span>Category</span>
                              <span>
                                {item.product.category?.name || "N/A"}
                              </span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <span>Brand</span>
                              <span>{item.product.brand || "N/A"}</span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <span>Available Stock</span>
                              <span>{item.stock}</span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <span>Variant</span>
                              <span>
                                {item.attributes
                                  ? Object.entries(item.attributes)
                                      .map(
                                        ([key, value]) => `${key} - ${value}`
                                      )
                                      .join(", ")
                                  : "N/A"}
                              </span>
                            </li>
                          </ul>
                        </td>
                        <td colSpan={5}></td>
                      </tr>
                    )}
                  </Fragment>
                ))}
                {selectedItems.length <= 0 && (
                  <tr className="text-lg sm:text-2xl border-b border-gray-200 hover:bg-gray-50">
                    <td colSpan={6} className="p-3 text-center text-[#EAC841]">
                      There are no items in the cart{" "}
                      <span className="text-[#6FD686]">[Sales]</span>
                    </td>
                  </tr>
                )}
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
