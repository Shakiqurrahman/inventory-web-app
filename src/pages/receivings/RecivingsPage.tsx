import { Fragment, useState, type ChangeEvent } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { IoIosCloseCircle } from "react-icons/io";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router";
import InlineEditor from "./InlineEditor";
import { RecivingInformation } from "./RecivingInformation";
import RecivingOrderInformation from "./RecivingOrderInformation";

const RecivingsPage = () => {
  const [hideDetails, setHideDetails] = useState(false);
  const [searchItemValue, setSearchItemValue] = useState("");

  const [discount, setDiscount] = useState<string>("0");
  const [quantity, setQuantity] = useState<string>("0");
  const [cost, setCost] = useState<string>("0");

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
                  <th className="p-3">Cost</th>
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
                        <span className="border-b border-dotted">
                          <InlineEditor
                            label="cost"
                            value={cost}
                            onChange={(val) => setCost(val)}
                            inputType="number"
                          />
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="border-b border-dotted">
                          <InlineEditor
                            label="quantity"
                            value={quantity}
                            onChange={(val) => setQuantity(val)}
                            inputType="number"
                          />
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="border-b border-dotted">
                          <InlineEditor
                            label="Discount %"
                            value={discount}
                            onChange={(val) => setDiscount(val)}
                            inputType="number"
                            suffix="%"
                          />
                        </span>
                      </td>
                      <td className="p-3 flex gap-1">
                        <TbCurrencyTaka />
                        <span className="border-b border-dotted ">10</span>
                      </td>
                    </tr>
                    {!hideDetails && (
                      <tr className="text-sm border-b border-gray-200 hover:bg-gray-50">
                        <td></td>
                        <td className="p-3 text-gray-500">
                          <ul className="text-[13px]">
                            <li className="flex items-center justify-between gap-2">
                              <span>Serial</span>
                              <span className="border-b border-dotted">
                                Empty
                              </span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <span>Stock</span>
                              <span>12</span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <span>Selling Price</span>
                              <span className="flex items-center justify-center">
                                <TbCurrencyTaka /> 10.00
                              </span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <span>Variation</span>
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
        <RecivingInformation />
        <RecivingOrderInformation />
      </div>
    </div>
  );
};

export default RecivingsPage;
