import { useState } from "react";
import toast from "react-hot-toast";
import { FiPlus, FiSearch, FiTrash } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
    deleteEmployeeSalary,
    toggleCreateEmployeeSalaryModal,
    toggleEditEmployeeSalaryModal,
    type IEmployeeSalary,
} from "../../redux/features/employeeSalary/employeeSalarySlice";
import { useAppSelector } from "../../redux/hook";
import { formatDateToLongDate } from "../../utils/timeFormatHandler";
import EditSalarymodal from "./EditSalarymodal";
import NewSalarymodal from "./NewSalarymodal";

type SelectedDataType = {
    index: number;
    employee: IEmployeeSalary;
};

const EmployeeSalaryList = () => {
    // const [deletingId, setDeletingId] = useState<string | null>(null);
    const [seletedData, setSelectedData] = useState<SelectedDataType | null>(
        null
    );

    const dispatch = useDispatch();
    const {
        openCreateEmployeeSalaryModal,
        openEdotEmployeeSalaryModal,
        employeeSalary,
    } = useAppSelector((state) => state.employeeSalary);

    const [searchQuery, setSearchQuery] = useState("");

    const handleDelete = (id: number) => {
        try {
            dispatch(deleteEmployeeSalary(id));
            toast.success("Employee deleted successfully");
        } catch (err) {
            console.error("Failed to delete employee", err);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg">
            <h1 className="font-medium text-lg mb-4">Employees Salary</h1>
            <div className="flex justify-between flex-wrap sm:flex-nowrap gap-2">
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-[300px] gap-2">
                    <FiSearch className="text-lg shrink-0" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        name="search"
                        id="search"
                        placeholder="Search Employee"
                        className="placeholder:text-sm size-full outline-none"
                    />
                </div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center text-xs gap-1 cursor-pointer hover:bg-blue-600 duration-200"
                    type="button"
                    onClick={() => dispatch(toggleCreateEmployeeSalaryModal())}
                >
                    <FiPlus className="text-lg" />
                    Give Salary
                </button>
            </div>
            <div className="mt-10 overflow-x-auto">
                <table className="w-full border-collapse rounded-md text-gray-700">
                    <thead>
                        <tr className="bg-gray-200 text-left *:font-semibold text-sm text-nowrap">
                            <th className="p-3 w-[60px]">ID</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Bonus amount</th>
                            <th className="p-3">Employee</th>
                            <th className="p-3 w-[200px]">Reason</th>
                            <th className="p-3 w-[200px]">Approve By</th>
                            <th className="p-3 w-[200px]">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {isLoading ? (
                            <tr className="text-sm">
                                <td
                                    colSpan={7}
                                    className="p-3 text-center text-gray-500"
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : */}
                        {employeeSalary?.length > 0 ? (
                            employeeSalary?.map((employee, index: number) => (
                                <tr
                                    className="border-b border-gray-300 hover:bg-gray-50 text-sm"
                                    key={index}
                                >
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3 text-nowrap">
                                        {formatDateToLongDate(employee.date)}
                                    </td>
                                    <td className="p-3 text-nowrap">
                                        {employee.amount}
                                    </td>
                                    <td className="p-3">
                                        {employee.bonusAmount}
                                    </td>
                                    <td className="p-3">{employee.employee}</td>
                                    <td className="p-3">
                                        {employee.reason
                                            ? employee.reason
                                            : "N/A"}
                                    </td>
                                    <td className="p-3 capitalize">
                                        {employee.approvedBy}
                                    </td>
                                    <td className="flex items-center gap-1 p-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedData({
                                                    index,
                                                    employee,
                                                });
                                                dispatch(
                                                    toggleEditEmployeeSalaryModal()
                                                );
                                            }}
                                            className="flex gap-0.5 items-center py-1.5 px-3 bg-blue-500 text-white rounded-sm text-xs cursor-pointer shrink-0"
                                        >
                                            <MdOutlineModeEdit className="" />{" "}
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(index)}
                                            className="bg-red-400 text-white p-1.5 rounded-sm cursor-pointer shrink-0"
                                        >
                                            {/* {isDeleting &&
                                            employee.id === deletingId ? (
                                                <AiOutlineLoading3Quarters className="animate-spin duration-300" />
                                            ) : ( */}
                                            <FiTrash className="text-base" />
                                            {/* )} */}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="border-b border-gray-300 text-sm">
                                <td
                                    colSpan={7}
                                    className="p-3 text-center text-gray-500"
                                >
                                    No employees found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {openCreateEmployeeSalaryModal && <NewSalarymodal />}
            {openEdotEmployeeSalaryModal && seletedData && (
                <EditSalarymodal seletedData={seletedData} />
            )}
        </div>
    );
};

export default EmployeeSalaryList;
