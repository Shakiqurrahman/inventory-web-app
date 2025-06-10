import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import { Link } from "react-router";
import {
    useDeleteSupplierMutation,
    useGetSupplierQuery,
} from "../../redux/features/suppliers/supplierApi";
import { type ISupplier } from "../../redux/features/suppliers/supplierSlice";

const SuppliersPage = () => {
    const { data: getSupplier, isLoading: getSupplierLoading } =
        useGetSupplierQuery("");
    console.log(getSupplier);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [deleteSupplier, { isLoading }] = useDeleteSupplierMutation();

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            const res = await deleteSupplier(id);
            if (res.data?.success) {
                toast.success(res.data.message);
            }
            setDeletingId(null);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message);
            setDeletingId(null);
        }
    };

    return (
        <div className="space-y-4">
            <div className="bg-white rounded-md p-2 sm:p-4 sm:px-6">
                <h1 className="font-medium text-lg mb-4">Suppliers</h1>
                <div className="flex justify-between flex-wrap sm:flex-nowrap gap-2">
                    <div className="border border-gray-300 w-[300px] flex gap-2 items-center p-2 rounded-sm">
                        <IoSearch className="text-xl text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="outline-0 text-sm rounded-sm w-full"
                        />
                    </div>
                    <Link
                        to={"new-supplier"}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center text-xs gap-1 cursor-pointer hover:bg-blue-600 duration-200"
                    >
                        <FaPlus className="text-lg" /> <span>New Supplier</span>
                    </Link>
                </div>

                <div className="mt-10 overflow-x-auto text-nowrap">
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
                            {getSupplierLoading ? (
                                <tr>
                                    <td
                                        className="p-3 text-center text-gray-500"
                                        colSpan={6}
                                    >
                                        Loading...
                                    </td>
                                </tr>
                            ) : getSupplier?.length > 0 ? (
                                getSupplier.map(
                                    (value: ISupplier, idx: number) => (
                                        <tr
                                            key={idx}
                                            className="border-b border-gray-300 hover:bg-gray-50 text-sm"
                                        >
                                            <td className="p-3">{idx + 1}</td>
                                            <td className="p-3">
                                                {value.companyName}
                                            </td>
                                            <td className="p-3">
                                                {value.fullName}
                                            </td>
                                            <td className="p-3">
                                                {value.email}
                                            </td>
                                            <td className="p-3">
                                                {value.phone}
                                            </td>
                                            <td className="flex items-center gap-1 p-3">
                                                <Link
                                                    to={`edit-supplier`}
                                                    state={{
                                                        ...value,
                                                    }}
                                                    className="flex gap-0.5 items-center py-1.5 px-3 bg-blue-500 text-white rounded-sm text-xs cursor-pointer shrink-0"
                                                >
                                                    <MdOutlineModeEdit className="" />{" "}
                                                    <span>Edit</span>
                                                </Link>
                                                <button
                                                    className="bg-red-400 text-white p-1.5 rounded-sm cursor-pointer shrink-0"
                                                    onClick={() =>
                                                        handleDelete(value.id)
                                                    }
                                                >
                                                    {isLoading &&
                                                    value.id === deletingId ? (
                                                        <AiOutlineLoading3Quarters className="text-md animate-spin duration-300" />
                                                    ) : (
                                                        <FiTrash className="text-md" />
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
                                        No Suppliers found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SuppliersPage;
