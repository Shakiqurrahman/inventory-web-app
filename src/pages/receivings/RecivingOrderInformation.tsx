import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { TbCurrencyTaka } from "react-icons/tb";

const RecivingOrderInformation = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedPaymentType, setSelectedPaymentType] = useState("Cash");

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };
  return (
    <div className="bg-white mt-5 pb-10 paper-cut relative">
      <div className="p-3">
        <h1 className="text-gray-500">Order Information:</h1>
        <div className="flex items-center justify-between gap-2 text-xs sm:text-sm mt-4">
          <span className="text-gray-600">Discount all Items by Percent:</span>
          <button
            type="button"
            className="text-red-800 font-light italic cursor-pointer"
          >
            {/* <InlineEditor
              label="Set Discount"
              value={discount2}
              onChange={(val) => setDiscount2(val)}
              inputType="number"
              suffix="%"
            /> */}
          </button>
        </div>
        <div className="flex items-center justify-between gap-2 text-xs sm:text-sm mt-2">
          <span className="text-gray-600">Discount Entire Receiving:</span>
          <button
            type="button"
            className="font-light italic border-b border-dashed flex items-center gap-1 cursor-pointer"
          >
            {/* <InlineEditor
              label="Set Discount"
              value={entireDiscount}
              onChange={(val) => setEntireDiscount(val)}
              inputType="number"
            /> */}
            <TbCurrencyTaka />
          </button>
        </div>
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
          0.00
        </button>
      </div>
      <div className="border-t border-b border-gray-300 border-dashed flex">
        <div className="w-1/2 text-center p-3 border-r border-gray-300 border-dashed">
          <h1 className="text-base sm:text-lg font-medium mb-2 text-gray-600">
            Total
          </h1>
          <span className="flex items-center text-green-500 justify-center text-lg sm:text-xl font-medium">
            <TbCurrencyTaka />
            0.00
          </span>
        </div>
        <div className="w-1/2 text-center p-3">
          <h1 className="text-base sm:text-lg font-medium mb-2 text-gray-600">
            Amount Due
          </h1>
          <span className="flex items-center text-secondary justify-center text-lg sm:text-xl font-medium">
            <TbCurrencyTaka />
            0.00
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 justify-between p-3 text-sm border-b border-gray-300 border-dashed">
        <button
          type="button"
          className="text-red-500 hover:text-red-600 cursor-pointer"
        >
          <IoIosCloseCircle className="text-lg" />
        </button>
        <span className="text-gray-600">Cash</span>
        <span className="flex items-center justify-center ml-auto text-gray-600">
          <TbCurrencyTaka />
          0.00
        </span>
      </div>
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
            className="border border-gray-200 p-2.5 outline-none text-sm w-full placeholder:text-xs"
          />
          <button
            type="button"
            className="text-white bg-primary px-4 py-2.5 hover:bg-secondary border border-primary hover:border-secondary cursor-pointer text-xs sm:text-sm shrink-0"
          >
            Finish
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
          />
        )}
      </div>
    </div>
  );
};

export default RecivingOrderInformation;
