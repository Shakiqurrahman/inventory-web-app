import { useState, type KeyboardEvent } from "react";
import toast from "react-hot-toast";
import { IoIosCloseCircle } from "react-icons/io";
import { TbCurrencyTaka } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useCreateReceiveMutation } from "../../redux/features/receiving/receivingApi";
import {
  addPayments,
  changeDueAmount,
  changeReceivingDate,
  removePayments,
  resetForm,
  updateDiscountAmount,
  updateDiscountPercentage,
  updateTotalAmount,
} from "../../redux/features/receiving/receivingFormSlice";
import { useAppSelector } from "../../redux/hook";
import { getErrorMessage } from "../../utils/errorHandler";
import InlineEditor from "./InlineEditor";

const RecivingOrderInformation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createReceive, { isLoading }] = useCreateReceiveMutation();

  const {
    receivingForm: {
      payments,
      totalAmount,
      recieveVariant,
      dueAmount,
      receivingDate,
      discountAmount,
      discountPercentage,
      supplierId,
    },
  } = useAppSelector((state) => state.receivingForm);

  const [isChecked, setIsChecked] = useState(false);
  const [selectedPaymentType, setSelectedPaymentType] = useState("Cash");
  const [paymentAmountValue, setPaymentAmountValue] = useState(
    (totalAmount && totalAmount.toString()) || ""
  );

  const subTotal = recieveVariant?.reduce(
    (acc, curr) => acc + curr?.totalPrice,
    0
  );

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleAddPayments = () => {
    if (selectedPaymentType && paymentAmountValue) {
      const paymentsData = {
        method: selectedPaymentType,
        amount: parseFloat(paymentAmountValue),
      };
      const payment = parseFloat(paymentAmountValue);
      if (!isNaN(payment) && payment > 0) {
        const updatedPayments = [...payments, paymentsData];
        const totalPaid = updatedPayments.reduce(
          (acc, val) => acc + val.amount,
          0
        );
        const leftAmountToPay =
          totalAmount - totalPaid > 0
            ? (totalAmount - totalPaid).toString()
            : "";
        dispatch(addPayments(updatedPayments));
        dispatch(changeDueAmount(totalAmount - totalPaid));
        setPaymentAmountValue(leftAmountToPay);
      }
    } else {
      toast.error("Please enter amount...");
    }
  };
  const handleAddPaymentsByEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddPayments();
    }
  };

  const handleRemovePayments = (id: number) => {
    if (id === 0 || id) {
      const updatedPayments = payments.filter((_, i) => i !== id);
      const totalPaid = updatedPayments.reduce((sum, p) => sum + p.amount, 0);
      const leftAmountToPay =
        totalAmount - totalPaid > 0 ? (totalAmount - totalPaid).toString() : "";
      dispatch(removePayments(updatedPayments));
      setPaymentAmountValue(leftAmountToPay);
    } else {
      toast.error("Failed to remove a payment.");
    }
  };

  const handleChangeDiscountPercentage = (val: string) => {
    if (discountAmount <= 0) {
      if (val && parseInt(val) >= 0 && parseInt(val) <= 100) {
        const totalPrice = recieveVariant.reduce(
          (acc, curr) => acc + curr.totalPrice,
          0
        );
        const discount = (discountPercentage / 100) * totalPrice;
        const totalAmountAfterDiscount = totalAmount - discount;
        dispatch(updateDiscountPercentage(val));
        dispatch(updateTotalAmount(totalAmountAfterDiscount));
      } else {
        toast.error("Minimum 1 and Maximum 100% discount");
      }
    } else {
      toast.error(
        "You can not discount this item above the max discount of the items in the cart"
      );
    }
  };

  const handleChangeDiscountAmount = (val: string) => {
    if (discountPercentage <= 0 && parseInt(val) >= 0) {
      const totalPrice = recieveVariant.reduce(
        (acc, curr) => acc + curr.totalPrice,
        0
      );
      const totalPaid = payments.reduce((acc, curr) => acc + curr.amount, 0);
      dispatch(updateTotalAmount(totalPrice - parseFloat(val)));
      dispatch(changeDueAmount(totalPrice - parseFloat(val) - totalPaid));
      dispatch(updateDiscountAmount(val));
    } else {
      toast.error(
        "You can not discount this item above the max discount of the items in the cart"
      );
    }
  };

  const handleSubmit = async () => {
    if (supplierId) {
      const variants = recieveVariant.map((v) => ({
        variantId: v?.id,
        quantity: v?.quantity,
        price: v?.costPrice,
      }));
      const totalPaid = payments.reduce((acc, curr) => acc + curr.amount, 0);
      const formData = {
        supplierId: supplierId,
        payments: payments.map((p) => ({
          ...p,
          method: p.method.toUpperCase(),
        })),
        recieveVariant: variants,
        totalPrice: totalAmount,
        paidAmount: totalPaid,
        dueAmount: dueAmount,
        discountAmount: discountAmount,
        discountPercentage: discountPercentage,
        receivingDate: receivingDate ? new Date(receivingDate) : undefined,
      };
      try {
        const res = await createReceive(formData).unwrap();
        dispatch(resetForm());
        navigate("/receiving/receiving-recipt", {
          state: { id: res?.id },
        });
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    } else {
      toast.error("Select a Supplier!");
    }
  };

  return (
    <div className="bg-white mt-5 pb-10 paper-cut relative">
      <div className="p-3">
        <h1 className="text-gray-500">Order Information:</h1>
        {recieveVariant?.length > 0 && (
          <>
            <div className="flex items-center justify-between gap-2 text-xs sm:text-sm mt-4">
              <span className="text-gray-600">
                Discount all Items by Percent:
              </span>
              <InlineEditor
                label="Discount"
                value={discountPercentage}
                onChange={handleChangeDiscountPercentage}
                inputType="number"
                suffix="%"
                defaultValue="Set Discount"
                contentClasses="text-red-800 font-light italic border-b border-dashed border-red-800 cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between gap-2 text-xs sm:text-sm mt-2">
              <span className="text-gray-600">Discount Entire Receiving:</span>
              <InlineEditor
                label="Discount"
                value={discountAmount}
                onChange={handleChangeDiscountAmount}
                inputType="number"
                prefix={<TbCurrencyTaka />}
                defaultValue="Set Discount"
                contentClasses="text-red-800 font-light italic border-b border-dashed border-red-800 cursor-pointer"
              />
            </div>
          </>
        )}
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
          {subTotal.toFixed(2)}
        </button>
      </div>
      <div className="border-t border-b border-gray-300 border-dashed flex">
        <div className="w-1/2 text-center p-3 border-r border-gray-300 border-dashed">
          <h1 className="text-base sm:text-lg font-medium mb-2 text-gray-600">
            Total
          </h1>
          <span className="flex items-center text-green-500 justify-center text-lg sm:text-xl font-medium">
            <TbCurrencyTaka />
            {totalAmount.toFixed(2)}
          </span>
        </div>
        <div className="w-1/2 text-center p-3">
          <h1 className="text-base sm:text-lg font-medium mb-2 text-gray-600">
            Amount Due
          </h1>
          <span className="flex items-center text-secondary justify-center text-lg sm:text-xl font-medium">
            <TbCurrencyTaka />
            {dueAmount.toFixed(2)}
          </span>
        </div>
      </div>
      {recieveVariant?.length > 0 &&
        payments?.map((p, i) => (
          <div
            key={i}
            className="flex items-center gap-3 justify-between p-3 text-sm border-b border-gray-300 border-dashed"
          >
            <button
              type="button"
              onClick={() => handleRemovePayments(i)}
              className="text-red-500 hover:text-red-600 cursor-pointer"
            >
              <IoIosCloseCircle className="text-lg" />
            </button>
            <span className="text-gray-600">{p.method}</span>
            <span className="flex items-center justify-center ml-auto text-gray-600">
              <TbCurrencyTaka />
              {p.amount.toFixed(2)}
            </span>
          </div>
        ))}
      {recieveVariant?.length > 0 && (
        <>
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
                onKeyDown={handleAddPaymentsByEnterKey}
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
            <div className="text-right mt-5">
              <button
                type="button"
                disabled={recieveVariant.length === 0 || isLoading}
                onClick={handleSubmit}
                className="bg-blue-500 px-4 py-2.5 cursor-pointer text-white text-sm hover:bg-blue-600 disabled:bg-blue-500/50"
              >
                Complete Receive
              </button>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center gap-2 select-none mt-3">
              <input
                type="checkbox"
                name="showComment"
                id="showComment"
                className="scale-130"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor="showComment"
                className="text-gray-500 text-xs w-full cursor-pointer"
              >
                Change receiving date
              </label>
            </div>
            {isChecked && (
              <input
                className="border border-gray-300 mt-4 p-2 rounded-md text-sm text-gray-500"
                type="date"
                value={receivingDate}
                onChange={(e) => dispatch(changeReceivingDate(e.target.value))}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RecivingOrderInformation;
