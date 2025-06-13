import { useRef } from "react";
import Barcode from "react-barcode";
import { FiPrinter } from "react-icons/fi";
import { TbCurrencyTaka } from "react-icons/tb";

const ItemBarcodeGeneratePage = () => {
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

  return (
    <div className="bg-white p-4">
      <div className="flex flex-wrap sm:flex-nowrap gap-2 items-center sm:justify-between">
        <h1 className="text-lg font-medium w-full sm:w-auto">Print Barcodes</h1>
        <button
          onClick={handlePrint}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-5 py-2.5 cursor-pointer sm:ml-auto flex items-center gap-2"
        >
          <FiPrinter /> Print Barcode
        </button>
        {/* <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-5 py-2.5 cursor-pointer flex items-center gap-2">
          Download PDF
        </button> */}
      </div>
      <div className="mt-10">
        <div className="w-[406px]" ref={printRef}>
          <div className="w-full mb-5 py-10">
            <h1 className="border-b p-2">Product description:</h1>
            <div className="grid grid-cols-2 *:odd:border-r *:border-b">
              <div className="flex items-center gap-2 p-2 text-sm">
                <span>Price:</span>
                <span className="flex items-center">
                  200 <TbCurrencyTaka className="text-base" />
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 text-sm">
                <span>Color:</span>
                <span className="flex items-center">Red</span>
              </div>
            </div>
            <div className="flex justify-center mt-3">
              <Barcode
                width={2}
                format="CODE128A"
                height={60}
                textMargin={2}
                value="0000000000"
              />
            </div>
          </div>
          <div className="w-full mb-5 py-10">
            <h1 className="border-b p-2">Product description:</h1>
            <div className="grid grid-cols-2 *:odd:border-r *:border-b">
              <div className="flex items-center gap-2 p-2 text-sm">
                <span>Price:</span>
                <span className="flex items-center">
                  200 <TbCurrencyTaka className="text-base" />
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 text-sm">
                <span>Color:</span>
                <span className="flex items-center">Red</span>
              </div>
            </div>
            <div className="flex justify-center mt-3">
              <Barcode
                width={2}
                format="CODE128A"
                height={60}
                textMargin={2}
                value="0000330000"
              />
            </div>
          </div>
          <div className="w-full mb-5 py-10">
            <h1 className="border-b p-2">Product description:</h1>
            <div className="grid grid-cols-2 *:odd:border-r *:border-b">
              <div className="flex items-center gap-2 p-2 text-sm">
                <span>Price:</span>
                <span className="flex items-center">
                  200 <TbCurrencyTaka className="text-base" />
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 text-sm">
                <span>Color:</span>
                <span className="flex items-center">Red</span>
              </div>
            </div>
            <div className="flex justify-center mt-3">
              <Barcode
                width={2}
                format="CODE128A"
                height={60}
                textMargin={2}
                value="000002220000"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemBarcodeGeneratePage;
