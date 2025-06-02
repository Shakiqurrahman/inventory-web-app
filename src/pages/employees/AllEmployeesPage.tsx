import { useState } from "react";
import { FiPlus, FiSearch, FiTrash } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { deleteEmployee } from "../../redux/features/employees/employeeSlice";
import type { RootState } from "../../redux/store";

const AllEmployeesPage = () => {
    const dispatch = useDispatch();
    const { employees } = useSelector((state: RootState) => state.employees);

    const [searchQuery, setSearchQuery] = useState("");

    const filteredEmployees = employees.filter((employee) => {
        const query = searchQuery.toLowerCase();
        return (
            (employee.name?.toLowerCase().includes(query) ?? false) ||
            (employee.email?.toLowerCase().includes(query) ?? false) ||
            (employee.phone?.toLowerCase().includes(query) ?? false) ||
            (employee.role?.toLowerCase().includes(query) ?? false)
        );
    });

    return (
        <div className="bg-white p-4 rounded-lg">
            <h1 className="font-medium text-lg mb-4">Employees</h1>
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
                <Link
                    to={"/employees/new-employee"}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center text-xs gap-1 cursor-pointer hover:bg-blue-600 duration-200"
                >
                    <FiPlus className="text-lg" />
                    New Employee
                </Link>
            </div>
            <div className="mt-10 overflow-x-auto">
                <table className="w-full border-collapse rounded-md text-gray-700">
                    <thead>
                        <tr className="bg-gray-200 text-left *:font-semibold text-sm">
                            <th className="p-3 w-[60px]">ID</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Phone Number</th>
                            <th className="p-3 w-[200px]">Role</th>
                            <th className="p-3 w-[200px]">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.length > 0 ? (
                            filteredEmployees.map((employee, index) => (
                                <tr
                                    className="border-b border-gray-300 hover:bg-gray-50 text-sm"
                                    key={index}
                                >
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">{employee.name}</td>
                                    <td className="p-3">{employee.email}</td>
                                    <td className="p-3">{employee.phone}</td>
                                    <td className="p-3">
                                        {employee.role || "N/A"}
                                    </td>
                                    <td className="flex items-center gap-1 p-3">
                                        <Link
                                            to={`edit-employee/${employee.phone}`}
                                            state={{ id: index, ...employee }}
                                            className="flex gap-0.5 items-center py-1.5 px-3 bg-blue-500 text-white rounded-sm text-xs cursor-pointer shrink-0"
                                        >
                                            <MdOutlineModeEdit className="" />{" "}
                                            <span>Edit</span>
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                dispatch(deleteEmployee(index))
                                            }
                                            className="bg-red-400 text-white p-1.5 rounded-sm cursor-pointer shrink-0"
                                        >
                                            <FiTrash className="text-md" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="border-b border-gray-300 text-sm">
                                <td
                                    colSpan={6}
                                    className="p-3 text-center text-gray-500"
                                >
                                    No employees found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllEmployeesPage;
