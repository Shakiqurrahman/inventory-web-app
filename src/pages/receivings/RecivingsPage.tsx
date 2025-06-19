import { Fragment, useEffect, useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { ImSpinner8 } from "react-icons/im";
import { IoIosCloseCircle } from "react-icons/io";
import { TbCurrencyTaka } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import {
  addSelectedItems,
  changeDueAmount,
  removePayments,
  removeSelectedItem,
  updateDiscountAmount,
  updateDiscountPercentage,
  updateSelectedItem,
  updateTotalAmount,
} from "../../redux/features/receiving/receivingFormSlice";
import {
  useGetVariantByIdOrBarCodeQuery,
  useGetVariantSuggestionsQuery,
} from "../../redux/features/sales/salesApi";
import { useAppSelector } from "../../redux/hook";
import type { IProductSuggestions } from "../../types/products";
import { isValidEAN13Code } from "../../utils/isValidEAN13Code";
import InlineEditor from "./InlineEditor";
import { RecivingInformation } from "./RecivingInformation";
import RecivingOrderInformation from "./RecivingOrderInformation";

const RecivingsPage = () => {
  const dispatch = useDispatch();

  const {
    receivingForm: {
      recieveVariant,
      payments,
      discountAmount,
      discountPercentage,
    },
  } = useAppSelector((state) => state.receivingForm);

  const [searchItemValue, setSearchItemValue] = useState("");
  const [variantId, setVarantId] = useState("");
  const [hideDetails, setHideDetails] = useState(false);

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

  const {
    data: item,
    isFetching,
    isLoading,
    isError,
  } = useGetVariantByIdOrBarCodeQuery(variantId, {
    skip: !variantId,
  });

  useEffect(() => {
    if (variantId && isError) {
      toast.error("Item not found.");
      setVarantId("");
    } else if (item && !isFetching && variantId) {
      const existingItem = recieveVariant.find((v) => v?.id === item?.id);
      if (existingItem) {
        const updateItems = recieveVariant.map((v) => {
          if (v?.id === existingItem?.id) {
            const newQuantity = v.quantity + 1;
            return {
              ...v,
              quantity: newQuantity,
              totalPrice: newQuantity * v?.costPrice,
            };
          } else {
            return v;
          }
        });
        dispatch(updateSelectedItem(updateItems));
      } else {
        const extendItem = {
          ...item,
          quantity: 0,
          totalPrice: 0,
        };
        dispatch(addSelectedItems(extendItem));
      }
      setSearchItemValue("");
      setVarantId("");
    }
  }, [item, variantId, isFetching, dispatch, recieveVariant, isError]);

  //   useEffect(() => {
  //     if (discountAmount > 0) {
  //       const totalPrice = recieveVariant.reduce(
  //         (acc, curr) => acc + curr.totalPrice,
  //         0
  //       );

  //       const totalPaid = payments.reduce((acc, curr) => acc + curr.amount, 0);
  //       dispatch(updateTotalAmount(totalPrice - discountAmount));
  //       dispatch(changeDueAmount(totalPrice - totalPaid - discountAmount));
  //     } else {
  //       const totalAmount = recieveVariant.reduce(
  //         (acc, curr) => acc + curr.totalPrice,
  //         0
  //       );
  //       dispatch(updateTotalAmount(totalAmount));

  //       const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  //       dispatch(changeDueAmount(totalAmount > 0 ? totalAmount - totalPaid : 0));
  //       if (recieveVariant.length <= 0 && payments.length > 0) {
  //         dispatch(removePayments([]));
  //       } else if (recieveVariant.length <= 0) {
  //         dispatch(updateDiscountAmount(0));
  //         dispatch(updateDiscountPercentage(0));
  //       }
  //     }
  //   }, [recieveVariant, payments, dispatch, discountAmount]);

  useEffect(() => {
    if (discountAmount > 0) {
      const totalPrice = recieveVariant.reduce(
        (acc, curr) => acc + curr.totalPrice,
        0
      );

      const totalPaid = payments.reduce((acc, curr) => acc + curr.amount, 0);
      dispatch(updateTotalAmount(totalPrice - discountAmount));
      dispatch(changeDueAmount(totalPrice - totalPaid - discountAmount));
    } else if (discountPercentage > 0) {
      const totalPrice = recieveVariant.reduce(
        (acc, curr) => acc + curr.totalPrice,
        0
      );

      const totalPaid = payments.reduce((acc, curr) => acc + curr.amount, 0);

      const discount = (discountPercentage / 100) * totalPrice;
      const totalAmountAfterDiscount = totalPrice - discount;

      dispatch(updateTotalAmount(totalAmountAfterDiscount));
      dispatch(changeDueAmount(totalAmountAfterDiscount - totalPaid));
    } else {
      const totalAmount = recieveVariant.reduce(
        (acc, curr) => acc + curr.totalPrice,
        0
      );
      dispatch(updateTotalAmount(totalAmount));

      const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
      dispatch(changeDueAmount(totalAmount > 0 ? totalAmount - totalPaid : 0));
      if (recieveVariant.length <= 0 && payments.length > 0) {
        dispatch(removePayments([]));
      } else if (recieveVariant.length <= 0) {
        dispatch(updateDiscountAmount(0));
        dispatch(updateDiscountPercentage(0));
      }
    }
  }, [recieveVariant, dispatch, discountAmount, discountPercentage, payments]);

  const handleChangeSearchItem = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchItemValue(e.target.value);
  };

  const handleSuggestionClick = (id: string, stock: number) => {
    if (stock > 0) {
      setVarantId(id);
      setSearchItemValue("");
    } else {
      toast.error("This item has no available stock!");
    }
  };

  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidEAN13Code(searchItemValue)) {
      toast.error("Please enter a valid barcode");
      setSearchItemValue("");
      return false;
    } else {
      setVarantId(searchItemValue);
      setSearchItemValue("");
    }
  };

  const handleChangeQuantity = (id: string, value: string) => {
    if (id) {
      const findItem = recieveVariant.find((item) => item.id === id);
      if (
        findItem &&
        parseInt(value) <= findItem?.stock &&
        parseInt(value) > 0
      ) {
        const modifyItem = {
          ...findItem,
          quantity: parseInt(value),
          totalPrice: parseInt(value) * findItem.costPrice,
        };
        const updateItems = recieveVariant.map((item) => {
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

  const handleRemoveSelectedItem = (id: string) => {
    if (id) {
      const updateItems = recieveVariant.filter((item) => item.id !== id);
      dispatch(removeSelectedItem(updateItems));
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
                        <p>Cost Price : {item.costPrice}</p>
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
                  <th className="p-3">Cost Price</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Total</th>
                </tr>
              </thead>
              <tbody className={`relative `}>
                {recieveVariant?.length > 0 ? (
                  recieveVariant?.map((item, i) => (
                    <Fragment key={i}>
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
                        <td className="p-3 text-left">{item?.name}</td>
                        <td className="p-3 flex items-center justify-center">
                          <TbCurrencyTaka /> {item?.costPrice}
                        </td>
                        <td className="p-3">
                          <span>
                            <InlineEditor
                              label="quantity"
                              value={item?.quantity}
                              onChange={(val) =>
                                handleChangeQuantity(item.id, val)
                              }
                              inputType="number"
                            />
                          </span>
                        </td>
                        <td className="p-3 flex items-center justify-center">
                          <TbCurrencyTaka />
                          <span>{item?.totalPrice}</span>
                        </td>
                      </tr>
                      {!hideDetails && (
                        <tr className="text-sm border-b border-gray-200 hover:bg-gray-50">
                          <td></td>
                          <td className="p-3 text-gray-500">
                            <ul className="text-[13px]">
                              <li className="flex items-center justify-between gap-2">
                                <span>Stock</span>
                                <span>{item?.stock}</span>
                              </li>
                              <li className="flex items-center justify-between gap-2">
                                <span>Selling Price</span>
                                <span className="flex items-center justify-center">
                                  <TbCurrencyTaka /> {item?.sellPrice}
                                </span>
                              </li>
                              {item?.attributes && (
                                <li className="flex items-start justify-between gap-2">
                                  <span>Variation</span>
                                  <div className="flex flex-col">
                                    {Object.entries(item?.attributes).map(
                                      ([key, value], i) => (
                                        <span key={i}>
                                          {key}: {value}
                                        </span>
                                      )
                                    )}
                                  </div>
                                </li>
                              )}
                            </ul>
                          </td>
                          <td colSpan={5}></td>
                        </tr>
                      )}
                    </Fragment>
                  ))
                ) : (
                  <tr className="text-lg sm:text-2xl border-b border-gray-200 hover:bg-gray-50">
                    <td colSpan={6} className="p-3 text-center text-[#EAC841]">
                      There are no items in the cart{" "}
                      <span className="text-[#6FD686]">[Receiving]</span>
                    </td>
                  </tr>
                )}

                {(isLoading || isFetching) && (
                  <tr className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white/40">
                    <td>
                      <ImSpinner8 className="animate-spin duration-300 size-7 text-primary" />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[500px] shrink-0">
        <RecivingInformation />
        <RecivingOrderInformation />
      </div>
    </div>
  );
};

export default RecivingsPage;
