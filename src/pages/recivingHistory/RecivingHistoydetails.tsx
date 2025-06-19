import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import toast from "react-hot-toast";
import { IoIosCloseCircle } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useGetReceiveHistoryByIdQuery } from "../../redux/features/receivingHistory/receivingHIstoryApi";
import type { IReceiveHistory } from "../../redux/features/receivingHistory/receivingHIstorySlice";
import type { Payments } from "../../redux/features/sales/salesFormSlice";

interface SupplierDetailsModalProps {
  receiveId: string;
  setShowModal: () => void;
  title: string;
  edit?: boolean;
}

const RecivingHistoydetails: React.FC<SupplierDetailsModalProps> = ({
  receiveId,
  setShowModal,
  title,
  edit,
}) => {
  const { data, isLoading, isFetching } = useGetReceiveHistoryByIdQuery(
    receiveId,
    {
      skip: !receiveId,
    }
  );

  const formRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(edit || false);
  const [receivingHistoryDetails, setReceivingHistoryDetails] =
    useState<IReceiveHistory | null>(null);
  const [selectedPaymentType, setSelectedPaymentType] = useState("CASH");
  const [paymentAmountValue, setPaymentAmountValue] = useState("");
  const [payments, setPayments] = useState<Payments[]>([]);

  useEffect(() => {
    if (!isLoading && !isFetching && data) {
      setReceivingHistoryDetails(data);
      setPayments(data?.payments);
    }
  }, [data, isLoading, isFetching]);

  useOutsideClick(formRef, () => {
    setShowModal();
  });

  const handleAddPayments = () => {
    if (selectedPaymentType && paymentAmountValue) {
      const paymentsData = {
        method: selectedPaymentType,
        amount: parseFloat(paymentAmountValue),
      };
      const payment = parseFloat(paymentAmountValue);
      if (!isNaN(payment) && payment > 0) {
        setPayments((prev) => [...prev, paymentsData]);
        setPaymentAmountValue("");
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

  const handleRemovePayments = (index: number) => {
    if (typeof index === "number") {
      setPayments((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Payments", payments);
    // Optional: send updated data to backend
  };

  const formatText = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  return (
    <div className="overflow-y-auto fixed top-0 left-0 w-full h-screen bg-black/20 flex justify-center items-start z-[999] p-4">
      <div
        className="bg-white rounded-lg p-6 w-full max-w-[650px] mt-20 relative"
        ref={formRef}
      >
        <button
          onClick={() => setShowModal()}
          type="button"
          className="text-gray-500 hover:text-gray-700 text-lg absolute top-0 right-0 p-4"
        >
          <IoClose />
        </button>
        <div className="flex items-center justify-between my-5">
          <h2 className="text-lg font-medium">{title}</h2>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="text-white py-1 px-4 rounded-md text-sm bg-blue-500 hover:bg-blue-600 duration-300 cursor-pointer"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-white py-1 px-4 rounded-md text-sm bg-red-500 hover:bg-red-600 duration-300 cursor-pointer"
                >
                  cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="text-white py-1 px-4 rounded-md text-sm bg-blue-500 hover:bg-blue-600 duration-300 cursor-pointer"
              >
                Edit
              </button>
            )}
          </div>
        </div>
        <hr className="mb-5" />

        {isFetching || isLoading ? (
          <div>Loading...</div>
        ) : (
          !isFetching &&
          !isLoading &&
          receivingHistoryDetails && (
            <div className="w-full overflow-x-auto">
              <table className="w-full border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-[#F9FBFC] border-t border-b border-gray-200 *:font-semibold text-sm">
                    <th className="p-3">Item Name</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Quantity</th>
                    <th className="p-3">Discount</th>
                    <th className="p-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {receivingHistoryDetails?.recieveVariant?.map(
                    (item, index) => (
                      <tr
                        key={index}
                        className={`hover:bg-gray-50 border-b border-gray-200 text-sm text-center`}
                      >
                        <td className="p-3">{item.variant?.name}</td>
                        <td className="p-3 flex items-center justify-center">
                          ৳ {item.price}
                        </td>
                        <td className="p-3">
                          <span className="">{item.quantity}</span>
                        </td>
                        <td className="p-3">{item.discountPercentage}%</td>
                        <td className="p-3">৳ {item.subTotal?.toFixed(2)}</td>
                      </tr>
                    )
                  )}
                  {/* {receivingHistoryDetails?.returnItems?.length > 0 && (
                      <>
                        <tr className="bg-[#F9FBFC] border-t border-b border-gray-200 *:font-semibold text-sm">
                          <th colSpan={5} className="p-3">
                            ***Return Items***
                          </th>
                        </tr>
                        <tr className="bg-[#F9FBFC] border-t border-b border-gray-200 *:font-semibold text-sm">
                          <th className="p-3" colSpan={2}>
                            Item Name
                          </th>
                          <th className="p-3">Quantity</th>
                          <th className="p-3" colSpan={2}>
                            Price
                          </th>
                        </tr>
                        {saleHistoryDetails?.returnItems?.map((item, index) => (
                          <tr
                            key={index}
                            className={`hover:bg-gray-50 border-b border-gray-200 text-sm text-center`}
                          >
                            <td className="p-3" colSpan={2}>
                              {item.variant?.name}
                            </td>
                            <td className="p-3">
                              <span className="">{item.quantity}</span>
                            </td>
                            <td className="p-3" colSpan={2}>
                              <span className="flex items-center justify-center">
                                ৳ {item.price}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </>
                    )} */}
                </tbody>
                <tfoot>
                  <tr className="hover:bg-gray-50 border-b border-gray-200 text-sm text-center font-medium">
                    <td className="p-3 border-r border-gray-200">
                      <p>Total Price:</p>
                    </td>
                    <td colSpan={3} className="p-3"></td>
                    <td className="p-3">
                      <span>৳ {receivingHistoryDetails?.totalPrice}</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 border-b border-gray-200 text-sm text-center font-medium">
                    <td className="p-3 border-r border-gray-200">
                      <p>Total Paid:</p>
                    </td>
                    <td colSpan={3} className="p-3"></td>
                    <td className="p-3">
                      <span>
                        ৳{" "}
                        {receivingHistoryDetails?.payments?.reduce(
                          (acc, curr) => acc + curr?.amount,
                          0
                        ) || 0}
                      </span>
                    </td>
                  </tr>
                  {!isEditing && (
                    <>
                      {(receivingHistoryDetails?.discountAmount > 0 ||
                        receivingHistoryDetails?.discountPercentage > 0) && (
                        <tr className="hover:bg-gray-50 border-b border-gray-200 text-sm text-center font-medium">
                          <td className="p-3 border-r border-gray-200">
                            <p>Discount:</p>
                          </td>
                          <td colSpan={3} className="p-3"></td>
                          <td className="p-3">
                            <span>
                              {receivingHistoryDetails?.discountAmount > 0
                                ? "৳ " + receivingHistoryDetails?.discountAmount
                                : receivingHistoryDetails?.discountPercentage >
                                  0
                                ? receivingHistoryDetails?.discountPercentage +
                                  "%"
                                : 0}
                            </span>
                          </td>
                        </tr>
                      )}
                      {/* {receivingHistoryDetails?.returnAmount > 0 && (
                          <tr className="hover:bg-gray-50 border-b border-gray-200 text-sm text-center font-medium">
                            <td className="p-3 border-r border-gray-200">
                              <p>Return Amount:</p>
                            </td>
                            <td colSpan={3} className="p-3"></td>
                            <td className="p-3">
                              <span>
                                ৳ {receivingHistoryDetails?.returnAmount}
                              </span>
                            </td>
                          </tr>
                        )} */}
                      <tr className="hover:bg-gray-50 border-b border-gray-200 text-sm text-center font-medium">
                        <td className="p-3 border-r border-gray-200">
                          <p>Due:</p>
                        </td>
                        <td colSpan={3} className="p-3"></td>
                        <td className="p-3">
                          <span>
                            ৳{" "}
                            {receivingHistoryDetails?.dueAmount > 0
                              ? receivingHistoryDetails?.dueAmount
                              : 0}
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 border-b border-gray-200 text-sm text-center font-medium">
                        <td className="p-3 border-r border-gray-200">
                          <p>Change:</p>
                        </td>
                        <td colSpan={3} className="p-3"></td>
                        <td className="p-3">
                          <span>
                            ৳{" "}
                            {receivingHistoryDetails?.dueAmount > 0
                              ? 0
                              : receivingHistoryDetails?.dueAmount}
                          </span>
                        </td>
                      </tr>
                    </>
                  )}
                </tfoot>
              </table>
              {isEditing && (
                <div className="flex mt-5">
                  <div className="w-1/2 p-3 border-r border-dashed border-gray-300">
                    <h1 className="text-sm font-medium text-gray-600">
                      Add payment
                    </h1>
                    <div className="flex gap-1 flex-wrap mt-2">
                      <button
                        type="button"
                        onClick={() => setSelectedPaymentType("CASH")}
                        className={`border text-xs px-4 py-2 cursor-pointer  font-medium ${
                          selectedPaymentType === "CASH"
                            ? "bg-primary text-white border-primary"
                            : "bg-gray-50 border-gray-400 text-gray-600"
                        }`}
                      >
                        Cash
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedPaymentType("CARD")}
                        className={`border text-xs px-4 py-2 cursor-pointer  font-medium ${
                          selectedPaymentType === "CARD"
                            ? "bg-primary text-white border-primary"
                            : "bg-gray-50 border-gray-400 text-gray-600"
                        }`}
                      >
                        Card
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedPaymentType("CHECK")}
                        className={`border text-xs px-4 py-2 cursor-pointer  font-medium ${
                          selectedPaymentType === "CHECK"
                            ? "bg-primary text-white border-primary"
                            : "bg-gray-50 border-gray-400 text-gray-600"
                        }`}
                      >
                        Check
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedPaymentType("BKASH")}
                        className={`border text-xs px-4 py-2 cursor-pointer  font-medium ${
                          selectedPaymentType === "BKASH"
                            ? "bg-primary text-white border-primary"
                            : "bg-gray-50 border-gray-400 text-gray-600"
                        }`}
                      >
                        bKash
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedPaymentType("OTHER")}
                        className={`border text-xs px-4 py-2 cursor-pointer  font-medium ${
                          selectedPaymentType === "OTHER"
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
                        placeholder={`Enter ${formatText(
                          selectedPaymentType
                        )} Amount`}
                        value={paymentAmountValue}
                        onChange={(e) => setPaymentAmountValue(e.target.value)}
                        onKeyDown={handleAddPaymentsByEnterKey}
                        className="border border-gray-200 p-2.5 outline-none text-sm w-full placeholder:text-xs placeholder:capitalize"
                      />
                      <button
                        type="button"
                        onClick={handleAddPayments}
                        className="text-white bg-primary px-4 py-2.5 hover:bg-secondary border border-primary hover:border-secondary cursor-pointer text-xs sm:text-sm shrink-0"
                      >
                        Pay
                      </button>
                    </div>
                  </div>
                  <div className="w-1/2 p-3">
                    {payments.map(({ amount, method }, index) => (
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
                        <span className="text-gray-600 !capitalize">
                          {formatText(method)}
                        </span>
                        <span className="flex items-center justify-center ml-auto text-gray-600">
                          ৳ {amount.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default RecivingHistoydetails;
