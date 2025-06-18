import { useRef, useState } from "react";
import Barcode from "react-barcode";
import { FiPrinter } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { TbCurrencyTaka } from "react-icons/tb";

const CustomerInvoice = () => {
  const [searchValue, setSearchValue] = useState("");
  const printRef = useRef<HTMLDivElement>(null);

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

  const items = [
    { description: "Lorem", price: 1.1 },
    { description: "Ipsum", price: 2.2 },
    { description: "Dolor sit amet", price: 3.3 },
    { description: "Consectetur", price: 4.4 },
    { description: "Adipiscing elit", price: 5.5 },
  ];

  const items2 = [
    { qty: 3, description: "Blue Cotton T-Shirt", unitPrice: 20 },
    { qty: 2, description: "Women's Leather Handbag", unitPrice: 80 },
    { qty: 5, description: "Pair of Running Shoes", unitPrice: 50 },
    { qty: 4, description: "Ceramic Coffee Mug", unitPrice: 10 },
  ];

  const subtotal = items2.reduce(
    (sum, item) => sum + item.qty * item.unitPrice,
    0
  );

  const taxRate = 0.05;
  const taxAmount = subtotal * taxRate;
  const total2 = subtotal + taxAmount;

  const total = items.reduce((acc, item) => acc + item.price, 0);
  const cash = 20;
  const change = cash - total;

  const border = "*".repeat(40);
  return (
    <div className="relative">
      <div className="">
        <div className="bg-white flex gap-2 items-center border border-gray-300 rounded-md w-[500px] mx-auto">
          <input
            className="border-0 outline-0 w-full px-4"
            type="text"
            placeholder="Enter Invoice ID"
            value={searchValue}
            onChange={(e) =>
              setSearchValue((e.target as HTMLInputElement).value)
            }
          />
          <div className="bg-blue-500 hover:bg-blue-600 duration-300 cursor-pointer flex gap-1 items-center text-white p-2 rounded-md">
            <IoSearch />
            <span>Search</span>
          </div>
        </div>

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
        <div
          ref={printRef}
          className="mx-auto w-[300px] bg-white p-4 text-sm font-mono shadow-md"
          style={{ whiteSpace: "pre-wrap" }}
        >
          <div className="text-center">
            <h1 className="text-lg font-bold">Fit & Found</h1>
            <p>Address: Lorem Ipsum, 23-10</p>
            <p>Telp. 11223344</p>
          </div>

          <p className="mt-2 text-center">{border}</p>
          <p className="text-center font-semibold">CASH RECEIPT</p>
          <p className="text-center">{border}</p>

          <div className="mt-2">
            <div className="flex justify-between font-bold">
              <span>Description</span>
              <span>Price</span>
            </div>
            {items.map((item, idx) => (
              <div key={idx} className="flex justify-between">
                <span>{item.description}</span>
                <span>{item.price.toFixed(1)}</span>
              </div>
            ))}
          </div>

          <p className="text-center mt-2">{border}</p>

          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{total.toFixed(1)}</span>
          </div>
          <div className="flex justify-between">
            <span>Cash</span>
            <span>{cash.toFixed(1)}</span>
          </div>
          <div className="flex justify-between">
            <span>Change</span>
            <span>{change.toFixed(1)}</span>
          </div>

          <p className="text-center mt-2">{border}</p>

          <div className="mt-1">
            <p>Bank card ........234</p>
            <p>Approval Code ....#123456</p>
          </div>

          <p className="text-center mt-2 font-bold">THANK YOU!</p>

          <div className="w-full">
            <Barcode
              value="865484648564"
              className="w-full"
              displayValue={true}
              fontSize={20}
              width={2}
              height={50}
            />
          </div>
        </div>
      </div>

      <div className="mt-5">
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
              {items2.map((item, idx) => (
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
                  {total2.toFixed(2)}
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
    </div>
  );
};

export default CustomerInvoice;
