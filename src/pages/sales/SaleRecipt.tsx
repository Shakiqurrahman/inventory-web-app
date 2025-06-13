import { useRef } from "react";
import Barcode from "react-barcode";

import { FiPrinter } from "react-icons/fi";
import { useLocation } from "react-router";

const SaleRecipt = () => {
  const { state } = useLocation();
  console.log(state);
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

  const total = items.reduce((acc, item) => acc + item.price, 0);
  const cash = 20;
  const change = cash - total;

  const border = "*".repeat(40);

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
  );
};

export default SaleRecipt;
