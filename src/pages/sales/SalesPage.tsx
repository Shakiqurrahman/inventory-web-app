import { Fragment, useState, type ChangeEvent } from "react";
import { BsFillTelephonePlusFill } from "react-icons/bs";
import { FaMinus, FaPlus, FaUserPlus } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { IoIosCloseCircle } from "react-icons/io";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router";

const SalesPage = () => {
  const [hideDetails, setHideDetails] = useState(false);
  const [searchItemValue, setSearchItemValue] = useState("");
  const [selectedPaymentType, setSelectedPaymentType] = useState("Cash");

  const handleChangeSearchItem = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchItemValue(e.target.value);
  };
  return (
    <div className="flex flex-wrap lg:flex-nowrap items-start gap-4">
      <div className="w-full">
        <div className="bg-white p-5 flex">
          <Link
            to={"/items/new-item"}
            className="shrink-0 p-3 bg-primary hover:bg-secondary text-white"
          >
            <FiEdit className="text-xl" />
          </Link>
          <input
            type="text"
            value={searchItemValue}
            onChange={handleChangeSearchItem}
            placeholder="Enter item name or scan barcode"
            className="w-full p-3 outline-none text-sm border border-gray-200 block"
          />
        </div>
        <div className="bg-white pt-2 pb-10 mt-4 paper-cut relative">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-md text-gray-700">
              <thead>
                <tr className="bg-[#F9FBFC] border-t border-b border-gray-200 *:font-semibold text-sm">
                  <th className="p-3 w-[100px]">
                    <button
                      type="button"
                      className="text-blue-500 cursor-pointer"
                      onClick={() => setHideDetails((prev) => !prev)}
                    >
                      {!hideDetails ? <FaMinus /> : <FaPlus />}
                    </button>
                  </th>
                  <th className="p-3">Item Name</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Discount</th>
                  <th className="p-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2].map((_, i) => (
                  <Fragment key={i}>
                    <tr
                      className={`${
                        !hideDetails ? "" : "border-b border-gray-200"
                      } hover:bg-gray-50 text-sm text-center`}
                    >
                      <td className="p-3">
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-600 cursor-pointer"
                        >
                          <IoIosCloseCircle className="text-xl" />
                        </button>
                      </td>
                      <td className="p-3 text-left">index + 1</td>
                      <td className="p-3 flex items-center justify-center">
                        <TbCurrencyTaka />
                        10
                      </td>
                      <td className="p-3">1</td>
                      <td className="p-3">0%</td>
                      <td className="p-3">10</td>
                    </tr>
                    {!hideDetails && (
                      <tr className="text-sm border-b border-gray-200 hover:bg-gray-50">
                        <td></td>
                        <td className="p-3 text-gray-500">
                          <ul className="text-[13px]">
                            <li className="flex items-center justify-between gap-2">
                              <span>Category</span>
                              <span>Shoe</span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <span>Brand</span>
                              <span>Fit & Found</span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <span>Stock</span>
                              <span>1</span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <span>Variant</span>
                              <span>Size:XL</span>
                            </li>
                          </ul>
                        </td>
                        <td colSpan={5}></td>
                      </tr>
                    )}
                  </Fragment>
                ))}
                <tr className="text-lg sm:text-2xl border-b border-gray-200 hover:bg-gray-50">
                  <td colSpan={6} className="p-3 text-center text-[#EAC841]">
                    There are no items in the cart{" "}
                    <span className="text-[#6FD686]">[Sales]</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[500px] shrink-0">
        <div className="bg-white">
          <h1 className="bg-primary text-white font-medium px-5 py-3">
            Sales Information
          </h1>
          <div className="p-5">
            <label htmlFor="employee" className="block mb-3">
              Select Employee <span className="text-red-500">*</span>
            </label>
            <select
              name="employee"
              id="employee"
              className="border border-gray-200 outline-none p-2 w-full block bg-gray-100"
            >
              <option value="Shakil">Shakil</option>
              <option value="Shakiqur">Shakiqur</option>
              <option value="Mahdi">Mahdi</option>
            </select>
            <div className="p-3 border border-gray-200 mt-5">
              <label htmlFor="employee" className="block mb-3">
                Customer Details
              </label>
              <div className="flex mb-2">
                <div className="shrink-0 bg-primary w-[40px] py-2 text-white flex items-center justify-center">
                  <FaUserPlus className="text-sm" />
                </div>
                <input
                  type="text"
                  name="customerName"
                  className="p-2 border border-gray-200 text-sm outline-none block w-full"
                  placeholder="Type customer name"
                />
              </div>
              <div className="flex mb-2">
                <div className="shrink-0 bg-primary w-[40px] py-2 text-white flex items-center justify-center">
                  <BsFillTelephonePlusFill className="text-sm" />
                </div>
                <input
                  type="number"
                  name="customerNumber"
                  className="p-2 border border-gray-200 text-sm outline-none block w-full"
                  placeholder="Type customer number"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white mt-5 pb-10 paper-cut relative">
          <div className="p-3">
            <h1 className="text-gray-500">Order Information:</h1>
            <div className="flex items-center justify-between gap-2 text-xs sm:text-sm mt-4">
              <span className="text-gray-600">
                Discount all Items by Percent:
              </span>
              <button
                type="button"
                className="text-red-800 font-light italic border-b border-dashed border-red-800 cursor-pointer"
              >
                Set Discount
              </button>
            </div>
            <div className="flex items-center justify-between gap-2 text-xs sm:text-sm mt-2">
              <span className="text-gray-600">Discount Entire Sale:</span>
              <button
                type="button"
                className="text-red-800 font-light italic border-b border-dashed border-red-800 cursor-pointer"
              >
                Set Discount
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
                Add Payment
              </button>
            </div>
          </div>
          <div className="p-3">
            <textarea
              name="comments"
              className="border border-gray-200 p-2.5 placeholder:text-xs text-sm outline-none resize-none block w-full"
              placeholder="Comments"
            ></textarea>
            <div className="flex items-center gap-2 select-none mt-3">
              <input
                type="checkbox"
                name="showComment"
                id="showComment"
                className="scale-130"
              />
              <label
                htmlFor="showComment"
                className="text-gray-500 text-xs w-full cursor-pointer"
              >
                Show comments on receipt
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
