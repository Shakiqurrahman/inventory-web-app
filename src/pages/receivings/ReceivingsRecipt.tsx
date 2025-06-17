import { useRef } from "react";
import Barcode from "react-barcode";
import { FiPrinter } from "react-icons/fi";
import { TbCurrencyTaka } from "react-icons/tb";
import { useLocation } from "react-router";
import { useReactToPrint } from "react-to-print";
import { useGetReceiveByIdQuery } from "../../redux/features/receiving/receivingApi";
import type { Payments } from "../../redux/features/sales/salesFormSlice";
import { useGetStoreConfigDataQuery } from "../../redux/features/storeConfig/storeConfigApi";
import type { IReceiveVariant } from "../../types/products";

const ReceivingsRecipt = () => {
  const { state } = useLocation();
  const { data: storeData, isLoading: loadingStore } =
    useGetStoreConfigDataQuery(null);
  const { data: receiveData, isLoading: receiveLoading } =
    useGetReceiveByIdQuery(state?.id, {
      skip: !state?.id,
    });
  console.log(receiveData);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  const subTotal = receiveData?.recieveVariant?.reduce(
    (acc: number, curr: IReceiveVariant) => acc + curr.subTotal,
    0
  );

  const totalPaid = receiveData?.payments?.reduce(
    (acc: number, curr: Payments) => acc + curr?.amount,
    0
  );
  const dueAmount = receiveData?.totalPrice - totalPaid;

  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const isValid = !isNaN(date.getTime());

    const finalDate = isValid ? date : new Date();
    const day = String(finalDate.getDate()).padStart(2, "0");
    const month = String(finalDate.getMonth() + 1).padStart(2, "0");
    const year = finalDate.getFullYear();

    return `${day}-${month}-${year}`;
  };

  if (!loadingStore && !receiveLoading && (!receiveData || !storeData))
    return <div className="p-4 bg-white">Not data found.</div>;

  return loadingStore || receiveLoading ? (
    <div className="p-4 bg-white">Loading...</div>
  ) : (
    <div>
      <div className="w-full flex justify-end">
        <button
          onClick={handlePrint}
          className="flex gap-2 items-center text-sm border border-gray-500 p-2 rounded-md text-gray-500 cursor-pointer bg-amber-100 hover:bg-amber-200 duration-300"
        >
          <FiPrinter />
          <span>Print Recipt</span>
        </button>
      </div>

      <div
        ref={printRef}
        className="max-w-3xl mx-auto bg-white border border-gray-300 p-8 font-sans text-sm text-gray-800"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-semibold text-lg">{storeData?.companyName}</h1>
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
                  <TbCurrencyTaka /> {receiveData?.discountAmount.toFixed(2)}
                </span>
              </div>
            )}
            {receiveData?.payments?.map((p: Payments, i: number) => (
              <div key={i} className="flex justify-between">
                <span className="capitalize">{p?.method}</span>
                <span>{p?.amount?.toFixed(1)}</span>
              </div>
            ))}
            {receiveData?.dueAmount && (
              <div className="flex justify-between">
                <span>Due</span>
                <span>
                  {receiveData?.dueAmount > 0
                    ? receiveData?.dueAmount.toFixed(1)
                    : 0}
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
    </div>
  );
};

export default ReceivingsRecipt;
