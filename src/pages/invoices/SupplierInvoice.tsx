import { useRef, useState, type FormEvent } from "react";
import Barcode from "react-barcode";
import toast from "react-hot-toast";
import { FiPrinter } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { TbCurrencyTaka } from "react-icons/tb";
import { useReactToPrint } from "react-to-print";
import { useLazyGetReceiveByIdQuery } from "../../redux/features/receiving/receivingApi";
import type { IReceiveHistory } from "../../redux/features/receivingHistory/receivingHIstorySlice";
import type { Payments } from "../../redux/features/sales/salesFormSlice";
import { useGetStoreConfigDataQuery } from "../../redux/features/storeConfig/storeConfigApi";
import type { IReceiveVariant } from "../../types/products";
import { getErrorMessage } from "../../utils/errorHandler";

const SupplierInvoice = () => {
  const [showNotFoundData, setShowNotFoundData] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const printRef = useRef<HTMLDivElement>(null);
  const [receiveData, setReceiveData] = useState<IReceiveHistory | null>(null);

  const { data: storeData } = useGetStoreConfigDataQuery(null);

  const [getSaleData, { isFetching: receiveFetching }] =
    useLazyGetReceiveByIdQuery();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue) {
      try {
        const res = await getSaleData(searchValue).unwrap();
        setSearchValue("");
        setReceiveData(res);
        setShowNotFoundData(false);
      } catch (error) {
        toast.error(getErrorMessage(error));
        setReceiveData(null);
        setShowNotFoundData(true);
      }
    }
  };

  const subTotal = receiveData?.recieveVariant
    ? receiveData?.recieveVariant?.reduce(
        (acc: number, curr: IReceiveVariant) => acc + curr.subTotal,
        0
      )
    : 0;

  const totalPaid = receiveData?.payments
    ? receiveData?.payments?.reduce(
        (acc: number, curr: Payments) => acc + curr?.amount,
        0
      )
    : 0;
  const dueAmount = receiveData?.totalPrice
    ? receiveData?.totalPrice - totalPaid
    : 0;

  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const isValid = !isNaN(date.getTime());

    const finalDate = isValid ? date : new Date();
    const day = String(finalDate.getDate()).padStart(2, "0");
    const month = String(finalDate.getMonth() + 1).padStart(2, "0");
    const year = finalDate.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <div className="relative">
      <div className="">
        <form
          onSubmit={handleSubmit}
          className="bg-white flex gap-2 items-center border border-gray-300 rounded-md w-[500px] mx-auto"
        >
          <input
            className="border-0 outline-0 w-full px-4"
            type="text"
            placeholder="Enter Invoice ID"
            value={searchValue}
            onChange={(e) =>
              setSearchValue((e.target as HTMLInputElement).value)
            }
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 duration-300 cursor-pointer flex gap-1 items-center text-white p-2 rounded-md"
          >
            <IoSearch />
            <span>Search</span>
          </button>
        </form>

        <div className="absolute top-0 right-0">
          <button
            onClick={handlePrint}
            className="flex gap-2 items-center text-sm border border-gray-500 p-2 rounded-md text-gray-500 cursor-pointer bg-amber-100 hover:bg-amber-200 duration-300"
          >
            <FiPrinter />
            <span>Print Recipt</span>
          </button>
        </div>
      </div>

      <div className="mt-5">
        {receiveFetching ? (
          <div className="text-center">Searching...</div>
        ) : !receiveFetching && receiveData && storeData ? (
          <div
            ref={printRef}
            className="max-w-3xl mx-auto bg-white border border-gray-300 p-8 font-sans text-sm text-gray-800"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="font-semibold text-lg">
                  {storeData?.companyName}
                </h1>
                <p>Address: {storeData?.companyAddress}</p>
                <p>Mobile No. {storeData?.mobileNo}</p>
                {storeData?.companyWebsite && (
                  <p>Website: {storeData?.companyWebsite}</p>
                )}
              </div>
              <div>
                <Barcode
                  className="w-[150px]"
                  value={receiveData?.invoiceId}
                  fontSize={40}
                />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-center text-xl font-bold tracking-widest text-blue-800 mb-6">
              RECEIVING RECEIPT
            </h2>

            {/* Billing Info */}
            <div className="flex justify-between mb-6">
              <div>
                <p className="font-semibold text-blue-800">Billed To</p>
                <p>
                  <span className="font-medium">Supplier Name:</span>{" "}
                  {receiveData?.supplier?.fullName || ""}
                </p>
                <p>
                  <span className="font-medium">Mobile No:</span>{" "}
                  {receiveData?.supplier?.phone || ""}
                </p>
              </div>
              <div>
                <p className="flex justify-between">
                  <span className="text-blue-800 font-semibold mr-2">
                    Receipt date
                  </span>{" "}
                  {formatDate(receiveData?.receivingDate)}
                </p>
              </div>
            </div>

            {/* Table */}
            <table className="w-full text-left mb-6 border-separate border-spacing-y-1">
              <thead className="bg-blue-800 text-white text-sm">
                <tr>
                  <th className="py-2 px-3">QTY</th>
                  <th className="py-2 px-3">Description</th>
                  <th className="py-2 px-3">Unit Price</th>
                  <th className="py-2 px-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                {receiveData?.recieveVariant?.map(
                  (item: IReceiveVariant, idx: number) => (
                    <tr key={idx} className="bg-gray-100">
                      <td className="py-2 px-3">{item.quantity}</td>
                      <td className="py-2 px-3">{item.variant.name}</td>
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-0.5">
                          <TbCurrencyTaka />
                          {item.price.toFixed(2)}
                        </div>
                      </td>
                      <td className="py-2 px-3">
                        <TbCurrencyTaka className="inline mr-1" />
                        {item?.subTotal?.toFixed(2)}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-1/3">
                <div className="flex justify-between mb-1">
                  <span>Subtotal</span>
                  <span className="flex items-center gap-0.5">
                    <TbCurrencyTaka /> {subTotal > 0 ? subTotal.toFixed(2) : 0}
                  </span>
                </div>
                {receiveData?.discountPercentage > 0 && (
                  <div className="flex justify-between mb-1">
                    <span>Discount (%)</span>
                    <span className="flex items-center gap-0.5">
                      {receiveData?.discountPercentage.toFixed(2)}
                    </span>
                  </div>
                )}
                {receiveData?.discountAmount > 0 && (
                  <div className="flex justify-between mb-1">
                    <span>Discount</span>
                    <span className="flex items-center gap-0.5">
                      <TbCurrencyTaka />{" "}
                      {receiveData?.discountAmount.toFixed(2)}
                    </span>
                  </div>
                )}
                {receiveData?.payments?.map((p: Payments, i: number) => (
                  <div key={i} className="flex justify-between">
                    <span className="capitalize">{p?.method}</span>
                    <span>{p?.amount?.toFixed(1)}</span>
                  </div>
                ))}
                {typeof receiveData?.dueAmount === "number" && (
                  <div className="flex justify-between">
                    <span>Due</span>
                    <span>
                      {receiveData.dueAmount > 0
                        ? receiveData.dueAmount.toFixed(1)
                        : "0.0"}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Change</span>
                  <span>{dueAmount < 0 ? dueAmount.toFixed(1) : 0}</span>
                </div>
                <div className="flex justify-between font-bold border-t border-blue-700 pt-2 mt-2 text-blue-800">
                  <span>Total (USD)</span>
                  <span className="flex items-center gap-0.5">
                    <TbCurrencyTaka />
                    {receiveData?.totalPrice?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Notes */}
            <div className="mt-8">
              <p className="text-blue-800 font-semibold">Notes</p>
              <p>Thank you for your business!</p>
            </div>
          </div>
        ) : (
          ""
        )}
        {showNotFoundData && !receiveFetching && !receiveData ? (
          <div className="text-center">No data found!</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SupplierInvoice;
