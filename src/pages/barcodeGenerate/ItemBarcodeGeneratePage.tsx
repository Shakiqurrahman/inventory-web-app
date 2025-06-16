import { useRef } from "react";
import Barcode from "react-barcode";
import { useLocation } from "react-router";
import { useReactToPrint } from "react-to-print";

// const pageStyle = `
// @page {
//     size: 38mm 25mm;
// margin: 0;
// };

// @media all {

//     .pageBreak {
//         display: none
//     }

// }

// @media print {

// body {
//     margin: 0;
//     padding: 0;
//   }

//     .pageBreak {
//         page-break-before: always;
//     }

// }

// `;

const ItemBarcodeGeneratePage = () => {
  const { state } = useLocation();
  const data = state?.item;
  console.log(state);
  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    // pageStyle,
  });

  const labels = Array.from({ length: state?.printQuantity });

  return (
    <div className="p-4">
      <button
        onClick={handlePrint}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Print Labels
      </button>

      <div
        // ref={printRef}
        className="flex flex-wrap gap-2 print:gap-0 print:p-0"
      >
        {labels.map((_, index) => (
          <div
            ref={printRef}
            key={index}
            className="w-[144px] h-[95px] flex flex-col text-[10px] font-sans print:border-none print:break-inside-avoid bg-white"
          >
            <div className="p-1">
              <div className="font-semibold text-center -mb-3 relative z-[99]">
                Fit & Found
              </div>
            </div>
            <div>
              <Barcode
                value={data?.barcode}
                width={1}
                height={30}
                fontSize={10}
                displayValue={true}
                marginTop={0}
              />
            </div>
            <div className="flex flex-wrap gap-[2px] px-1 justify-between -mt-1 relative z-[99]">
              <span>P: ৳{data?.sellPrice}</span>
              {data?.attributes?.length > 0 &&
                data?.attributes?.map(
                  (
                    attr: {
                      [key: string]: string;
                    },
                    i: number
                  ) => {
                    const [key, value] = Object.entries(attr)[0];
                    return (
                      <span key={i}>
                        {key.charAt(0).toUpperCase()}: {value}
                      </span>
                    );
                  }
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemBarcodeGeneratePage;
