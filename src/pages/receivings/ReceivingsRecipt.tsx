import { useRef } from "react";
import Barcode from "react-barcode";
import { FiPrinter } from "react-icons/fi";
import { TbCurrencyTaka } from "react-icons/tb";
import { useLocation } from "react-router";

const ReceivingsRecipt = () => {
  const { state } = useLocation();
  console.log(state);
  const printRef = useRef<HTMLDivElement>(null);
  const items = [
    { qty: 3, description: "Blue Cotton T-Shirt", unitPrice: 20 },
    { qty: 2, description: "Women's Leather Handbag", unitPrice: 80 },
    { qty: 5, description: "Pair of Running Shoes", unitPrice: 50 },
    { qty: 4, description: "Ceramic Coffee Mug", unitPrice: 10 },
  ];

  const subtotal = items.reduce(
    (sum, item) => sum + item.qty * item.unitPrice,
    0
  );
  const taxRate = 0.05;
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  const handlePrint = () => {
    const printContent = printRef.current;
    const originalContent = document.body.innerHTML;

    if (printContent) {
      const receiptHTML = printContent.innerHTML;

      document.body.innerHTML = receiptHTML;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload(); // To restore event listeners and app state
    }
  };

  return (
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
            <h1 className="font-semibold text-lg">Fit & Found</h1>
            <p>
              1234 Company St,
              <br />
              Company Town, ST 12345
            </p>
          </div>
          <div>
            <Barcode
              className="w-[150px]"
              value="Reciving data"
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
            <p className="font-medium">Customer Name</p>
            <p>
              1234 Customer St,
              <br />
              Customer Town, ST 12345
            </p>
          </div>
          <div>
            <p className="flex justify-between">
              <span className="text-blue-800 font-semibold mr-2">
                Receipt #
              </span>{" "}
              0000457
            </p>
            <p className="flex justify-between">
              <span className="text-blue-800 font-semibold mr-2">
                Receipt date
              </span>{" "}
              11-04-2023
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
            {items.map((item, idx) => (
              <tr key={idx} className="bg-gray-100">
                <td className="py-2 px-3">{item.qty}</td>
                <td className="py-2 px-3">{item.description}</td>
                <td className="py-2 px-3 flex items-center gap-0.5">
                  <TbCurrencyTaka />
                  {item.unitPrice.toFixed(2)}
                </td>
                <td className="py-2 px-3">
                  <TbCurrencyTaka className="inline mr-1" />
                  {(item.qty * item.unitPrice).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-1/3">
            <div className="flex justify-between mb-1">
              <span>Subtotal</span>
              <span className="flex items-center gap-0.5">
                <TbCurrencyTaka /> {subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Sales Tax (5%)</span>
              <span className="flex items-center gap-0.5">
                <TbCurrencyTaka />
                {taxAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between font-bold border-t border-blue-700 pt-2 mt-2 text-blue-800">
              <span>Total (USD)</span>
              <span className="flex items-center gap-0.5">
                <TbCurrencyTaka />
                {total.toFixed(2)}
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
