import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiPlus, FiSearch, FiTrash } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";
import { Link } from "react-router";
import {
    useDeleteEmployeeMutation,
    useGetEmployeeListQuery,
} from "../../redux/features/employees/employeeApi";
import { type IEmployee } from "../../redux/features/employees/employeeSlice";

const AllEmployeesPage = () => {
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const { data: getEmployeeList, isLoading } = useGetEmployeeListQuery(null);
    const [deleteEmployee, { isLoading: isDeleting }] =
        useDeleteEmployeeMutation();

    const [searchQuery, setSearchQuery] = useState("");

    const filteredEmployees = getEmployeeList?.filter((employee: IEmployee) => {
        const query = searchQuery.toLowerCase();
        return (
            (employee.name?.toLowerCase().includes(query) ?? false) ||
            (employee.email?.toLowerCase().includes(query) ?? false) ||
            (employee.phone?.toLowerCase().includes(query) ?? false) ||
            (employee.role?.toLowerCase().includes(query) ?? false)
        );
    });

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            await deleteEmployee(id).unwrap();
            toast.success("Employee deleted successfully");
            setDeletingId(null);
        } catch (err) {
            console.error("Failed to delete employee", err);
        }
    };

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
                        <tr className="bg-gray-200 text-left *:font-semibold text-sm text-nowrap">
                            <th className="p-3 w-[60px]">ID</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Phone Number</th>
                            <th className="p-3 w-[200px]">Role</th>
                            <th className="p-3 w-[200px]">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr className="text-sm">
                                <td
                                    colSpan={6}
                                    className="p-3 text-center text-gray-500"
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : filteredEmployees?.length > 0 ? (
                            filteredEmployees?.map(
                                (employee: IEmployee, index: number) => (
                                    <tr
                                        className="border-b border-gray-300 hover:bg-gray-50 text-sm"
                                        key={index}
                                    >
                                        <td className="p-3">{index + 1}</td>
                                        <td className="p-3">{employee.name}</td>
                                        <td className="p-3">
                                            {employee.email}
                                        </td>
                                        <td className="p-3">
                                            {employee.phone}
                                        </td>
                                        <td className="p-3 capitalize">
                                            {employee.role.toLowerCase() ||
                                                "N/A"}
                                        </td>
                                        <td className="flex items-center gap-1 p-3">
                                            <Link
                                                to={`edit-employee`}
                                                state={{
                                                    ...employee,
                                                }}
                                                className="flex gap-0.5 items-center py-1.5 px-3 bg-blue-500 text-white rounded-sm text-xs cursor-pointer shrink-0"
                                            >
                                                <MdOutlineModeEdit className="" />{" "}
                                                <span>Edit</span>
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(employee.id)
                                                }
                                                className="bg-red-400 text-white p-1.5 rounded-sm cursor-pointer shrink-0"
                                            >
                                                {isDeleting &&
                                                employee.id === deletingId ? (
                                                    <AiOutlineLoading3Quarters className="animate-spin duration-300" />
                                                ) : (
                                                    <FiTrash className="text-base" />
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                )
                            )
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
