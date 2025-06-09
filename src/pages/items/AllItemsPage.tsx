import { useRef, useState } from "react";
import { FaRegClone } from "react-icons/fa";
import { FiPlus, FiSearch } from "react-icons/fi";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdPrint } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router";
import DropdownMenu from "../../components/DropdownMenu";
import useOutsideClick from "../../hooks/useOutsideClick";

const AllItemsPage = () => {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [openDotMenu, setOpenDotMenu] = useState(false);

  useOutsideClick(buttonRef, () => {
    setTimeout(() => setOpenDotMenu(false), 100); // let button click happen first
  });

  return (
    <div className="bg-white p-4 rounded-lg">
      <h1 className="font-medium text-lg mb-4">Items</h1>
      <div className="flex justify-between flex-wrap sm:flex-nowrap gap-2">
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-[300px] gap-2">
          <FiSearch className="text-lg shrink-0" />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search Items"
            className="placeholder:text-sm size-full outline-none"
          />
        </div>
        <Link
          to={"/items/new-item"}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center text-xs gap-1 cursor-pointer hover:bg-blue-600 duration-200"
        >
          <FiPlus className="text-lg" />
          New Item
        </Link>
      </div>
      <div className="mt-10 overflow-x-auto">
        <table className="w-full border-collapse rounded-md text-gray-700">
          <thead>
            <tr className="bg-gray-200 text-left *:font-semibold text-sm">
              <th className="p-3">Item Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Category</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Brand</th>
              <th className="p-3 w-[200px]">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-300 hover:bg-gray-50 text-sm hover:bg-gray-100">
              <td className="p-3">1</td>
              <td className="p-3 flex items-center">
                <TbCurrencyTaka />
                amount
              </td>
              <td className="p-3">paymentMethod</td>
              <td className="p-3">tax</td>
              <td className="p-3">reason</td>
              <td className="flex p-3 relative">
                <div className="flex" ref={buttonRef}>
                  <Link
                    to={`/expenses/edit-expense/`}
                    className="py-1.5 px-3 bg-[#F2F6F9] text-sm cursor-pointer shrink-0 border border-[#D7DCE5]"
                  >
                    Edit
                  </Link>
                  <div
                    className="bg-[#F2F6F9] flex items-center p-1.5 cursor-pointer shrink-0 border border-[#D7DCE5]"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent propagation just in case
                      setOpenDotMenu((prev) => !prev);
                    }}
                  >
                    <HiDotsHorizontal className="text-base" />
                  </div>
                  {openDotMenu && (
                    <DropdownMenu anchorRef={buttonRef} open={openDotMenu}>
                      <button
                        type="button"
                        className="p-2 flex items-center gap-2"
                        onClick={() => console.log("Print Barcode")}
                      >
                        <MdPrint className="text-base" />
                        Print Barcode
                      </button>
                      <button
                        type="button"
                        className="p-2 flex items-center gap-2"
                        onClick={() => console.log("Print Barcode")}
                      >
                        <FaRegClone className="text-base" />
                        Clone Item
                      </button>
                      <button
                        type="button"
                        className="p-2 flex items-center gap-2"
                        onClick={() => console.log("Print Barcode")}
                      >
                        <RiDeleteBin6Line className="text-base" />
                        Delete
                      </button>
                    </DropdownMenu>
                  )}
                </div>
              </td>
            </tr>
            <tr className="border-b border-gray-300 text-sm">
              <td colSpan={6} className="p-3 text-center text-gray-500">
                No item added yet.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllItemsPage;
