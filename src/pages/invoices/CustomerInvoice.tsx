import { useRef, useState, type FormEvent } from "react";
import Barcode from "react-barcode";
import toast from "react-hot-toast";
import { FiPrinter } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { TbCurrencyTaka } from "react-icons/tb";
import { useReactToPrint } from "react-to-print";
import { useLazyGetSaleByIdQuery } from "../../redux/features/sales/salesApi";
import type { Payments } from "../../redux/features/sales/salesFormSlice";
import type { ISaleHistory } from "../../redux/features/salesHistory/saleHistorySlice";
import { useGetStoreConfigDataQuery } from "../../redux/features/storeConfig/storeConfigApi";
import type { ISaleVariant } from "../../types/products";
import { getErrorMessage } from "../../utils/errorHandler";
import { isValidEAN13Code } from "../../utils/isValidEAN13Code";

const CustomerInvoice = () => {
  const [showNotFoundData, setShowNotFoundData] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const printRef = useRef<HTMLDivElement>(null);
  const [saleData, setSaleData] = useState<ISaleHistory | null>(null);

  const { data: storeData } = useGetStoreConfigDataQuery(null);

  const [getSaleData, { isFetching: saleFetching }] = useLazyGetSaleByIdQuery();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidEAN13Code(searchValue, "saleInvoice")) {
      toast.error("Please enter a valid Invoice Id");
      setSearchValue("");
      setSaleData(null);
      return false;
    } else {
      try {
        const res = await getSaleData(searchValue).unwrap();
        setSearchValue("");
        setSaleData(res);
        setShowNotFoundData(false);
      } catch (error) {
        toast.error(getErrorMessage(error));
        setSaleData(null);
        setShowNotFoundData(true);
      }
    }
  };

  const subTotal = saleData?.saleVariant?.reduce(
    (acc: number, curr: ISaleVariant) => acc + curr.subTotal,
    0
  );

  const totalPaid = saleData?.payments
    ? saleData?.payments?.reduce(
        (acc: number, curr: Payments) => acc + curr?.amount,
        0
      )
    : 0;
  const dueAmount = saleData?.totalPrice ? saleData?.totalPrice - totalPaid : 0;

  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const isValid = !isNaN(date.getTime());

    const finalDate = isValid ? date : new Date();
    const day = String(finalDate.getDate()).padStart(2, "0");
    const month = String(finalDate.getMonth() + 1).padStart(2, "0");
    const year = finalDate.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const border = "*".repeat(40);
  return (
    <div className="relative">
      <div className="">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-stone-600 dark:border-gray-500 dark:text-gray-200 flex gap-2 items-center border border-gray-300 rounded-md w-[500px] mx-auto"
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

      <div className="mt-5" ref={printRef}>
        {saleFetching ? (
          <div className="text-center">Searching...</div>
        ) : !saleFetching && saleData && !saleData?.isCorporateSale ? (
          <div
            className="mx-auto w-[300px] bg-white p-4 text-sm font-mono shadow-md"
            style={{ whiteSpace: "pre-wrap" }}
          >
            <div className="text-center">
              <h1 className="text-lg font-bold">{storeData?.companyName}</h1>
              <p>Address: {storeData?.companyAddress}</p>
              <p>Telp. {storeData?.mobileNo}</p>
              {storeData?.companyWebsite && (
                <p>Website: {storeData?.companyWebsite}</p>
              )}
            </div>

            <p className="mt-2 text-center">{border}</p>
            <p className="text-center font-semibold">CASH RECEIPT</p>
            <p className="text-center">{border}</p>

            <div className="mt-2">
              <div className="flex justify-between font-bold">
                <span>Description</span>
                <span>Price</span>
              </div>
              {saleData?.saleVariant?.map((item: ISaleVariant, idx: number) => (
                <div key={idx} className="flex justify-between">
                  <span>{item.variant.name}</span>
                  <span>{item?.subTotal?.toFixed(1) || 0}</span>
                </div>
              ))}
            </div>

            <p className="text-center mt-2">{border}</p>

            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>
                {saleData?.isFree ? "Free" : saleData?.totalPrice?.toFixed(1)}
              </span>
            </div>
            {!saleData?.isFree && saleData?.discountPercentage > 0 && (
              <div className="flex justify-between">
                <span>Discount</span>
                <span>{saleData?.discountPercentage?.toFixed(1)}%</span>
              </div>
            )}
            {!saleData?.isFree && saleData?.discountAmount > 0 && (
              <div className="flex justify-between">
                <span>Discount</span>
                <span>{saleData?.discountAmount?.toFixed(1)}</span>
              </div>
            )}
            {!saleData?.isFree &&
              saleData?.payments?.map((p: Payments, i: number) => (
                <div key={i} className="flex justify-between">
                  <span className="capitalize">{p?.method}</span>
                  <span>{p?.amount?.toFixed(1)}</span>
                </div>
              ))}
            {!saleData?.isFree && typeof saleData?.dueAmount === "number" && (
              <div className="flex justify-between">
                <span>Due</span>
                <span>
                  {saleData.dueAmount > 0
                    ? saleData.dueAmount.toFixed(1)
                    : "0.0"}
                </span>
              </div>
            )}
            {!saleData?.isFree && (
              <div className="flex justify-between">
                <span>Change</span>
                <span>{dueAmount < 0 ? dueAmount.toFixed(1) : 0}</span>
              </div>
            )}

            <p className="text-center mt-2">{border}</p>

            <p className="text-center mt-2 font-bold">THANK YOU!</p>

            <div className="w-full">
              <Barcode
                value={saleData?.invoiceId}
                className="w-full"
                displayValue={true}
                fontSize={20}
                width={2}
                height={50}
              />
            </div>
          </div>
        ) : !saleFetching && saleData && saleData?.isCorporateSale ? (
          <div className="max-w-3xl mx-auto bg-white border border-gray-300 p-8 font-sans text-sm text-gray-800">
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
                  value={saleData?.invoiceId}
                  fontSize={40}
                />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-center text-xl font-bold tracking-widest text-blue-800 mb-6">
              SALES RECEIPT
            </h2>

            {/* Billing Info */}
            <div className="flex justify-between mb-6">
              <div>
                <p className="font-semibold text-blue-800">Billed To</p>
                <p>
                  <span className="font-medium">Customer Name:</span>{" "}
                  {saleData?.customer?.name || ""}
                </p>
                <p>
                  <span className="font-medium">Mobile No:</span>{" "}
                  {saleData?.customer?.phone || ""}
                </p>
              </div>
              <div>
                <p className="flex justify-between">
                  <span className="text-blue-800 font-semibold mr-2">
                    Receipt date
                  </span>{" "}
                  {formatDate(saleData?.createdAt)}
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
                  <th className="py-2 px-3">Unit Discount</th>
                  <th className="py-2 px-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                {saleData?.saleVariant?.map(
                  (item: ISaleVariant, idx: number) => (
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
                        <div className="flex items-center gap-0.5">
                          {item.discountPercentage > 0
                            ? item.discountPercentage.toFixed(2)
                            : 0}
                          %
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
                    <TbCurrencyTaka />{" "}
                    {typeof subTotal === "number" && subTotal > 0
                      ? subTotal.toFixed(2)
                      : 0}
                  </span>
                </div>
                {saleData?.discountPercentage > 0 && (
                  <div className="flex justify-between mb-1">
                    <span>Discount (%)</span>
                    <span className="flex items-center gap-0.5">
                      {saleData?.discountPercentage.toFixed(2)}
                    </span>
                  </div>
                )}
                {saleData?.discountAmount > 0 && (
                  <div className="flex justify-between mb-1">
                    <span>Discount</span>
                    <span className="flex items-center gap-0.5">
                      <TbCurrencyTaka /> {saleData?.discountAmount.toFixed(2)}
                    </span>
                  </div>
                )}
                {saleData?.payments?.map((p: Payments, i: number) => (
                  <div key={i} className="flex justify-between">
                    <span className="capitalize">{p?.method}</span>
                    <span>{p?.amount?.toFixed(1)}</span>
                  </div>
                ))}
                {typeof saleData?.dueAmount === "number" && (
                  <div className="flex justify-between">
                    <span>Due</span>
                    <span>
                      {saleData.dueAmount > 0
                        ? saleData.dueAmount.toFixed(1)
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
                    {saleData?.totalPrice?.toFixed(2)}
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
        ) : showNotFoundData && !saleData ? (
          <div className="text-center">No data found!</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CustomerInvoice;
