import { BsDownload } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { FiPrinter, FiTrash } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const SuppliersPage = () => {
    return (
        <div className="space-y-4">
            <div className="bg-white flex justify-between items-center p-2 sm:p-4 sm:px-6 rounded-md">
                <h1 className="font-semibold text-lg sm:text-xl">Suppliers</h1>
                <div>
                    <ul className="flex items-center gap-1.5 sm:gap-3">
                        <li>
                            <button className="bg-[#FDF1C8] hover:bg-amber-200 duration-300 p-2 rounded-md cursor-pointer">
                                <FiPrinter />
                            </button>
                        </li>
                        <li>
                            <button className="bg-blue-100 hover:bg-blue-200 duration-300 p-2 rounded-md cursor-pointer">
                                <BsDownload />
                            </button>
                        </li>
                        <li className="">
                            <Link
                                to={"new-supplier"}
                                className="flex gap-0.5 items-center bg-blue-500 hover:bg-blue-600 duration-300 text-white p-2 text-xs rounded-md cursor-pointer"
                            >
                                <FaPlus className="text-sm" />{" "}
                                <span>New Supplier</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="bg-white rounded-md p-2 sm:p-4 sm:px-6">
                <div className="flex gap-2 items-center">
                    <div className="border border-gray-300 w-[300px] flex gap-2 items-center p-2 rounded-sm">
                        <IoSearch className="text-xl text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="outline-0 text-sm rounded-sm w-full"
                        />
                    </div>
                    <div className="flex items-center gap-1 p-2 px-4 border border-gray-300 text-sm rounded-sm cursor-pointer">
                        <CiFilter />
                        <span>Filters</span>
                    </div>
                </div>

                <div className="mt-10">
                    <table className="w-full border-collapse rounded-md text-gray-700">
                        <thead>
                            <tr className="bg-gray-200 text-left *:font-semibold text-sm">
                                <th className="p-3">ID</th>
                                <th className="p-3">Company Name</th>
                                <th className="p-3">Full Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Phone Number</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-300 hover:bg-gray-50 text-sm">
                                <td className="p-3">1</td>
                                <td className="p-3">Flytech It</td>
                                <td className="p-3">Mokbul Hussain</td>
                                <td className="p-3">Flytech@gmai.com</td>
                                <td className="p-3">01700940689</td>
                                <td className="flex items-center gap-1 p-3">
                                    <button className="flex gap-0.5 items-center py-1.5 px-3 bg-blue-500 text-white rounded-sm text-xs cursor-pointer shrink-0">
                                        <MdOutlineModeEdit className="" />{" "}
                                        <span>Edit</span>
                                    </button>
                                    <button className="bg-red-400 text-white p-1.5 rounded-sm cursor-pointer shrink-0">
                                        <FiTrash className="text-md" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SuppliersPage;
