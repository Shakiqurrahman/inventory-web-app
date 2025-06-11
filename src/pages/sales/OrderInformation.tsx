import { useState } from "react";
import toast from "react-hot-toast";
import { IoIosCloseCircle } from "react-icons/io";
import { TbCurrencyTaka } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  addPayments,
  removePayments,
} from "../../redux/features/sales/salesFormSlice";
import type { RootState } from "../../redux/store";

const OrderInformation = () => {
  const dispatch = useDispatch();
  const {
    salesForm: { payments },
  } = useSelector((state: RootState) => state.salesForm);

  const [selectedPaymentType, setSelectedPaymentType] = useState("Cash");
  const [paymentAmountValue, setPaymentAmountValue] = useState("");

  const handleAddPayments = () => {
    if (selectedPaymentType && paymentAmountValue) {
      const paymentsData = {
        method: selectedPaymentType,
        amount: parseFloat(paymentAmountValue),
      };
      dispatch(addPayments(paymentsData));
      setPaymentAmountValue("");
    } else {
      toast.error("Please enter amount...");
    }
  };

  const handleRemovePayments = (id: number) => {
    if (id === 0 || id) {
      dispatch(removePayments(id));
    } else {
      toast.error("Failed to remove a payment.");
    }
  };

  return (
    <div className="bg-white mt-5 pb-10 paper-cut relative">
      <div className="p-3">
        <h1 className="text-gray-500">Order Information:</h1>
        <div className="flex items-center justify-between gap-2 text-xs sm:text-sm mt-4">
          <span className="text-gray-600">Discount all Items by Percent:</span>
          <button
            type="button"
            className="text-red-800 font-light italic border-b border-dashed border-red-800 cursor-pointer"
          >
            Set Discount
          </button>
        </div>
        <div className="flex items-center justify-between gap-2 text-xs sm:text-sm mt-2">
          <span className="text-gray-600">Discount Entire Sale:</span>
          <button
            type="button"
            className="text-red-800 font-light italic border-b border-dashed border-red-800 cursor-pointer"
          >
            Set Discount
          </button>
        </div>
      </div>
      <div className="p-3 bg-[#F1FFEC] flex items-center justify-between gap-2">
        <h1 className="text-gray-600 text-sm sm:text-base font-medium">
          Sub Total:
        </h1>
        <button
          type="button"
          className="text-blue-500 border-b border-blue-500 border-dashed flex items-center text-sm cursor-pointer"
        >
          <TbCurrencyTaka />
          0.00
        </button>
      </div>
      <div className="border-t border-b border-gray-300 border-dashed flex">
        <div className="w-1/2 text-center p-3 border-r border-gray-300 border-dashed">
          <h1 className="text-base sm:text-lg font-medium mb-2 text-gray-600">
            Total
          </h1>
          <span className="flex items-center text-green-500 justify-center text-lg sm:text-xl font-medium">
            <TbCurrencyTaka />
            0.00
          </span>
        </div>
        <div className="w-1/2 text-center p-3">
          <h1 className="text-base sm:text-lg font-medium mb-2 text-gray-600">
            Amount Due
          </h1>
          <span className="flex items-center text-secondary justify-center text-lg sm:text-xl font-medium">
            <TbCurrencyTaka />
            0.00
          </span>
        </div>
      </div>
      {payments.length > 0 &&
        payments.map(({ amount, method }, index) => (
          <div
            key={index}
            className="flex items-center gap-3 justify-between p-3 text-sm border-b border-gray-300 border-dashed"
          >
            <button
              type="button"
              onClick={() => handleRemovePayments(index)}
              className="text-red-500 hover:text-red-600 cursor-pointer"
            >
              <IoIosCloseCircle className="text-lg" />
            </button>
            <span className="text-gray-600">{method}</span>
            <span className="flex items-center justify-center ml-auto text-gray-600">
              <TbCurrencyTaka />
              {amount.toFixed(2)}
            </span>
          </div>
        ))}
      <div className="p-3 border-b border-dashed border-gray-300">
        <h1 className="text-sm font-medium text-gray-600">Add payment</h1>
        <div className="flex gap-1 flex-wrap mt-2">
          <button
            type="button"
            onClick={() => setSelectedPaymentType("Cash")}
            className={`border text-xs px-4 py-2 cursor-pointer  font-medium ${
              selectedPaymentType === "Cash"
                ? "bg-primary text-white border-primary"
                : "bg-gray-50 border-gray-400 text-gray-600"
            }`}
          >
            Cash
          </button>
          <button
            type="button"
            onClick={() => setSelectedPaymentType("Card")}
            className={`border text-xs px-4 py-2 cursor-pointer  font-medium ${
              selectedPaymentType === "Card"
                ? "bg-primary text-white border-primary"
                : "bg-gray-50 border-gray-400 text-gray-600"
            }`}
          >
            Card
          </button>
          <button
            type="button"
            onClick={() => setSelectedPaymentType("Check")}
            className={`border text-xs px-4 py-2 cursor-pointer  font-medium ${
              selectedPaymentType === "Check"
                ? "bg-primary text-white border-primary"
                : "bg-gray-50 border-gray-400 text-gray-600"
            }`}
          >
            Check
          </button>
          <button
            type="button"
            onClick={() => setSelectedPaymentType("bKash")}
            className={`border text-xs px-4 py-2 cursor-pointer  font-medium ${
              selectedPaymentType === "bKash"
                ? "bg-primary text-white border-primary"
                : "bg-gray-50 border-gray-400 text-gray-600"
            }`}
          >
            bKash
          </button>
          <button
            type="button"
            onClick={() => setSelectedPaymentType("Other")}
            className={`border text-xs px-4 py-2 cursor-pointer  font-medium ${
              selectedPaymentType === "Other"
                ? "bg-primary text-white border-primary"
                : "bg-gray-50 border-gray-400 text-gray-600"
            }`}
          >
            Other
          </button>
        </div>
        <div className="flex mt-3">
          <input
            type="number"
            placeholder={`Enter ${selectedPaymentType} Amount`}
            value={paymentAmountValue}
            onChange={(e) => setPaymentAmountValue(e.target.value)}
            className="border border-gray-200 p-2.5 outline-none text-sm w-full placeholder:text-xs"
          />
          <button
            type="button"
            onClick={handleAddPayments}
            className="text-white bg-primary px-4 py-2.5 hover:bg-secondary border border-primary hover:border-secondary cursor-pointer text-xs sm:text-sm shrink-0"
          >
            Add Payment
          </button>
        </div>
      </div>
      <div className="text-right mt-5 p-3">
        <button
          type="button"
          className="bg-blue-500 px-4 py-2.5 cursor-pointer text-white text-sm hover:bg-blue-600"
        >
          Complete Sale
        </button>
      </div>
    </div>
  );
};

export default OrderInformation;
