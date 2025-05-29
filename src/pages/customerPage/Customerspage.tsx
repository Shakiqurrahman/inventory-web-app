import { FaPlus } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";

const Customerspage = () => {
    return (
        <div className="space-y-4">
            <div className="bg-white rounded-md p-2 sm:p-4 sm:px-6">
                <h1 className="font-medium text-lg mb-4">Customers</h1>
                <div className="flex gap-2 items-center justify-between">
                    <div className="border border-gray-300 w-[300px] flex gap-2 items-center p-2 rounded-sm">
                        <IoSearch className="text-xl text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="outline-0 text-sm rounded-sm w-full"
                        />
                    </div>
                    <button className="flex gap-0.5 items-center bg-blue-500 hover:bg-blue-600 duration-300 text-white p-2 text-xs rounded-md cursor-pointer">
                        <FaPlus className="text-sm" /> <span>New Supplier</span>
                    </button>
                </div>

                <div className="mt-10 overflow-x-auto">
                    <table className="w-full border-collapse rounded-md text-gray-700">
                        <thead>
                            <tr className="bg-gray-200 text-left *:font-semibold text-sm">
                                <th className="p-3">ID</th>
                                <th className="p-3">Customer Name</th>
                                <th className="p-3">Phone</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-300 hover:bg-gray-50 text-sm">
                                <td className="p-3">1</td>
                                <td className="p-3">Shakikur Rahman</td>
                                <td className="p-3">0170011223344</td>

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

export default Customerspage;
