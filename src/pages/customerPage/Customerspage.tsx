import { FaPlus } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
    toggleCustomerModal,
    toggleEditCustomerModal,
} from "../../redux/features/customers/customersSlice";
import type { RootState } from "../../redux/store";
import CreateCustomerModal from "./CreateCustomerModal";
import EditCustomer from "./EditCustomer";

const Customerspage = () => {
    const dispatch = useDispatch();
    const { customers, openCreateCustomerModal, openEditCutomerModal } =
        useSelector((state: RootState) => state.customers);
    console.log(customers);

    return (
        <div className="space-y-4">
            <div className="bg-white rounded-md p-2 sm:p-4 sm:px-6">
                <h1 className="font-medium text-lg mb-4">Customers</h1>
                <div className="flex justify-between flex-wrap sm:flex-nowrap gap-2">
                    <div className="border border-gray-300 w-[300px] flex gap-2 items-center p-2 rounded-sm">
                        <IoSearch className="text-xl text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="outline-0 text-sm rounded-sm w-full"
                        />
                    </div>
                    <button
                        onClick={() => dispatch(toggleCustomerModal())}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center text-xs gap-1 cursor-pointer hover:bg-blue-600 duration-200"
                    >
                        <FaPlus className="text-lg" /> <span>New Customer</span>
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
                            {customers.length > 0 ? (
                                customers.map((customer, idx) => (
                                    <tr
                                        key={idx}
                                        className="border-b border-gray-300 hover:bg-gray-50 text-sm"
                                    >
                                        <td className="p-3">{idx + 1}</td>
                                        <td className="p-3">{customer.name}</td>
                                        <td className="p-3">
                                            {customer.phone}
                                        </td>

                                        <td className="flex items-center gap-1 p-3">
                                            <button
                                                onClick={() =>
                                                    dispatch(
                                                        toggleEditCustomerModal(
                                                            customer
                                                        )
                                                    )
                                                }
                                                className="flex gap-0.5 items-center py-1.5 px-3 bg-blue-500 text-white rounded-sm text-xs cursor-pointer shrink-0"
                                            >
                                                <MdOutlineModeEdit className="" />{" "}
                                                <span>Edit</span>
                                            </button>
                                            <button className="bg-red-400 text-white p-1.5 rounded-sm cursor-pointer shrink-0">
                                                <FiTrash className="text-md" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="p-4 text-center text-gray-500"
                                    >
                                        No customers found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {openCreateCustomerModal && <CreateCustomerModal />}
            {openEditCutomerModal && <EditCustomer />}
        </div>
    );
};

export default Customerspage;
