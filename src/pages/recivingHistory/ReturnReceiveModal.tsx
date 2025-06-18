import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { TbCurrencyTaka } from "react-icons/tb";
import { useDispatch } from "react-redux";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useReturnReceivesMutation } from "../../redux/features/receivingHistory/receivingHIstoryApi";
import {
  addRemovedItems,
  addSelectedReceives,
  changeReason,
  changeRefundAmount,
  toggleReceiveReturnModal,
  type IReceiveHistory,
} from "../../redux/features/receivingHistory/receivingHIstorySlice";
import { useAppSelector } from "../../redux/hook";
import { getErrorMessage } from "../../utils/errorHandler";

interface ReturnSaleModalProps {
  selectedReceive: IReceiveHistory;
}

const ReturnReceiveModal: React.FC<ReturnSaleModalProps> = ({
  selectedReceive,
}) => {
  const dispatch = useDispatch();

  const { selectedReceives, reason, refundAmount, removedItems } =
    useAppSelector((state) => state.receiveHistory);

  const [saveReturnItems, { isLoading }] = useReturnReceivesMutation();

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedReceive?.recieveVariant?.length > 0) {
      dispatch(addSelectedReceives(selectedReceive?.recieveVariant));
    }
  }, [selectedReceive, dispatch]);

  const handleRemoveItem = (id: string) => {
    const find = selectedReceives.find((i) => i?.id === id);
    const findRemovedItem = removedItems.find((i) => i?.id === id);
    if (find && !findRemovedItem) {
      const updateSelectedItems = selectedReceives.filter(
        (i) => i?.id !== find?.id
      );
      const updateRefundItems = [...removedItems, find];
      dispatch(addSelectedReceives(updateSelectedItems));
      dispatch(addRemovedItems(updateRefundItems));
    }
    if (find && findRemovedItem) {
      const updateSelectedItems = selectedReceives.filter(
        (i) => i?.id !== find?.id
      );
      const updateRefundItems = removedItems.map((i) => {
        if (i?.id === findRemovedItem?.id) {
          return {
            ...i,
            quantity: find?.quantity + findRemovedItem?.quantity,
          };
        } else {
          return i;
        }
      });
      dispatch(addSelectedReceives(updateSelectedItems));
      dispatch(addRemovedItems(updateRefundItems));
    }
  };

  const handleDecreaseItem = (id: string) => {
    const find = selectedReceives.find((i) => i?.id === id);
    const findRemovedItem = removedItems.find((i) => i?.id === id);
    if (find) {
      const updateSelectedItems = selectedReceives.map((i) => {
        if (i?.id === find?.id) {
          return {
            ...i,
            quantity: i?.quantity - 1,
          };
        } else {
          return i;
        }
      });
      dispatch(addSelectedReceives(updateSelectedItems));
    }
    if (findRemovedItem) {
      const updateRemovedItems = removedItems.map((i) => {
        if (i?.id === findRemovedItem?.id) {
          return {
            ...i,
            quantity: i?.quantity + 1,
          };
        } else {
          return i;
        }
      });
      dispatch(addRemovedItems(updateRemovedItems));
    } else {
      const updateRemovedItems = [...removedItems, { ...find, quantity: 1 }];
      dispatch(addRemovedItems(updateRemovedItems));
    }
  };

  const handleIncreaseItem = (id: string) => {
    const find = selectedReceives.find((i) => i?.id === id);
    const findRemovedItem = removedItems.find((i) => i?.id === id);

    if (find) {
      const updateSelectedItems = selectedReceives.map((i) => {
        if (i?.id === find?.id) {
          return {
            ...i,
            quantity: i?.quantity + 1,
          };
        } else {
          return i;
        }
      });
      dispatch(addSelectedReceives(updateSelectedItems));
    }
    if (findRemovedItem && findRemovedItem?.quantity > 1) {
      const updateRemovedItems = removedItems.map((i) => {
        if (i?.id === findRemovedItem?.id) {
          return {
            ...i,
            quantity: i?.quantity - 1,
          };
        } else {
          return i;
        }
      });
      dispatch(addRemovedItems(updateRemovedItems));
    } else if (findRemovedItem && findRemovedItem?.quantity === 1) {
      const updateRemovedItems = removedItems.filter(
        (i) => i?.id !== findRemovedItem?.id
      );
      dispatch(addRemovedItems(updateRemovedItems));
    } else {
      const updateRemovedItems = [...removedItems, find];
      dispatch(addRemovedItems(updateRemovedItems));
    }
  };

  const handleSubmit = async () => {
    if (refundAmount) {
      if (!selectedReceive?.id) return toast.error("Something went wrong!");
      const returnItems = removedItems.map((i) => ({
        variantId: i?.variantId,
        quantity: i?.quantity,
        price: i?.price,
      }));
      const returnData = {
        returnItems: returnItems,
        reason: reason ? reason : undefined,
        refundAmount: refundAmount ? parseFloat(refundAmount) : 0,
      };
      try {
        await saveReturnItems({
          id: selectedReceive?.id,
          returnData,
        }).unwrap();
        toast.success("Returning items successfull.");
        dispatch(toggleReceiveReturnModal());
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    } else {
      toast.error("Please add return amount!");
    }
  };

  useOutsideClick(formRef, () => {
    dispatch(toggleReceiveReturnModal());
  });

  const getMainStock = (id: string) => {
    const find = selectedReceive?.recieveVariant?.find((i) => i?.id === id);
    return find ? find?.quantity : 0;
  };

  return (
    <div className="overflow-y-auto fixed top-0 left-0 w-full h-screen bg-black/20 flex justify-center items-start z-[999] p-4">
      <div
        ref={formRef}
        className="bg-white rounded-lg p-6 w-full max-w-[650px] mt-20 relative"
      >
        <h3 className="mb-5 text-lg font-medium">Return items</h3>
        <button
          type="button"
          className="absolute top-0 right-0 p-4"
          onClick={() => dispatch(toggleReceiveReturnModal())}
        >
          <RxCross2 />
        </button>

        {selectedReceives?.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-md text-gray-700">
              <thead>
                <tr className="bg-gray-100 border-t border-b border-gray-200 border *:font-semibold text-sm">
                  <th className="p-3">~</th>
                  <th className="p-3">Item Name</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Price</th>
                </tr>
              </thead>
              <tbody>
                {selectedReceives.map((value, index) => (
                  <tr
                    key={index}
                    className="text-center border-t border-b border-gray-200 border"
                  >
                    <td className="p-3">
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(value?.id)}
                      >
                        <RxCross2 className="text-lg text-red-500 bg:text-red-600  rounded-full size-4 mx-auto" />
                      </button>
                    </td>
                    <td className="p-3">{value?.variant.name}</td>
                    <td className="p-3 flex items-center gap-3 justify-center">
                      <button
                        type="button"
                        disabled={value?.quantity <= 1}
                        onClick={() => handleDecreaseItem(value?.id)}
                        className="p-1 px-2 text-sm border border-gray-600 text-black disabled:text-gray-200 disabled:border-gray-200 cursor-pointer"
                      >
                        -
                      </button>
                      {value.quantity}
                      <button
                        type="button"
                        disabled={value?.quantity >= getMainStock(value?.id)}
                        onClick={() => handleIncreaseItem(value?.id)}
                        className="p-1 px-2 text-sm border border-gray-600 text-black disabled:text-gray-200 disabled:border-gray-200 cursor-pointer"
                      >
                        +
                      </button>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-center">
                        <TbCurrencyTaka />
                        {value.price}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {removedItems.length > 0 ? (
          <div className="overflow-x-auto mt-5">
            <h1 className="text-center mb-2 text-sm">
              <span className="text-red-500">***</span> Returning Items{" "}
              <span className="text-red-500">***</span>
            </h1>
            <table className="w-full border-collapse rounded-md text-gray-700">
              <thead>
                <tr className="bg-gray-100 border-t border-b border-gray-200 border *:font-semibold text-sm">
                  <th className="p-3">Item Name</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {removedItems.map((value, index) => (
                  <tr
                    key={index}
                    className="text-center border-t border-b border-gray-200 border"
                  >
                    <td className="p-3">{value?.variant.name}</td>
                    <td className="p-3 flex items-center gap-3 justify-center">
                      {value?.quantity}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-center">
                        <TbCurrencyTaka />
                        {value?.price * value?.quantity}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center mt-5 text-sm">
            No item selected to return
          </div>
        )}
        {removedItems.length > 0 && (
          <div className="mt-5 w-full">
            <div className="text-sm flex gap-1 items-center">
              <label className="shrink-0 w-[120px] text-right" htmlFor="">
                Return Amount:
              </label>
              <input
                type="number"
                value={refundAmount}
                onChange={(e) => dispatch(changeRefundAmount(e.target.value))}
                className="outline-none rounded-md border border-gray-300 p-2 w-full"
              />
            </div>
            <div className="text-sm flex gap-1 items-center mt-4">
              <label className="shrink-0 w-[120px] text-right" htmlFor="">
                Reason:
              </label>
              <textarea
                value={reason}
                onChange={(e) => dispatch(changeReason(e.target.value))}
                className="outline-none rounded-md border border-gray-300 p-2 w-full resize-none"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                disabled={isLoading}
                onClick={handleSubmit}
                className="mt-4 text-sm bg-blue-500 hover:bg-blue-600 duration-300 p-2 px-4 rounded-md text-white disabled:bg-blue-500/50"
              >
                Return
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReturnReceiveModal;
