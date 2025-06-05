import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiPlus, FiSearch, FiTrash } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router";
import {
    useDeleteExpensesMutation,
    useGetExpensesListQuery,
} from "../../redux/features/expenses/expenseApi";
import { type IExpense } from "../../redux/features/expenses/expenseSlice";

const AllExpensesPage = () => {
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const { data: getExpensesList, isLoading } = useGetExpensesListQuery(null);
    const [deleteExpenses, { isLoading: deleteLoading }] =
        useDeleteExpensesMutation();
    console.log(getExpensesList);

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            await deleteExpenses(id).unwrap();
            toast.success("Category deleted successfully");
            setDeletingId(null);
        } catch (error) {
            console.error("Failed to delete expenses:", error);
            toast.error("Failed to delete expenses");
            setDeletingId(null);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg">
            <h1 className="font-medium text-lg mb-4">Expenses</h1>
            <div className="flex justify-between flex-wrap sm:flex-nowrap gap-2">
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-[300px] gap-2">
                    <FiSearch className="text-lg shrink-0" />
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search Expense"
                        className="placeholder:text-sm size-full outline-none"
                    />
                </div>
                <Link
                    to={"/expenses/new-expense"}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center text-xs gap-1 cursor-pointer hover:bg-blue-600 duration-200"
                >
                    <FiPlus className="text-lg" />
                    New Expense
                </Link>
            </div>
            <div className="mt-10 overflow-x-auto text-nowrap">
                <table className="w-full border-collapse rounded-md text-gray-700">
                    <thead>
                        <tr className="bg-gray-200 text-left *:font-semibold text-sm">
                            <th className="p-3 w-[60px]">ID</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Payment Type</th>
                            <th className="p-3">Tax</th>
                            <th className="p-3">Reason</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Recipient Name</th>
                            <th className="p-3">Approved By</th>
                            <th className="p-3 w-[200px]">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr className="text-sm">
                                <td
                                    colSpan={9}
                                    className="p-4 text-center text-gray-500"
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : getExpensesList?.length > 0 ? (
                            getExpensesList.map(
                                (expense: IExpense, index: number) => (
                                    <tr
                                        className="border-b border-gray-300 hover:bg-gray-50 text-sm"
                                        key={index}
                                    >
                                        <td className="p-3">{index + 1}</td>
                                        <td className="p-3 flex items-center">
                                            <TbCurrencyTaka />
                                            {expense.amount}
                                        </td>
                                        <td className="p-3 ">
                                            <span className="capitalize">
                                                {expense.paymentMethod.toLowerCase()}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            {expense.tax || "0.00"}
                                        </td>
                                        <td className="p-3">
                                            {expense.reason || "N/A"}
                                        </td>
                                        <td className="p-3">
                                            {new Date(
                                                expense.date
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="p-3">
                                            {expense.recipientName}
                                        </td>
                                        <td className="p-3">
                                            {expense.approvedBy}
                                        </td>
                                        <td className="flex items-center gap-1 p-3">
                                            <Link
                                                to={`/expenses/edit-expense/`}
                                                state={{
                                                    ...expense,
                                                }}
                                                className="flex gap-0.5 items-center py-1.5 px-3 bg-blue-500 text-white rounded-sm text-xs cursor-pointer shrink-0"
                                            >
                                                <MdOutlineModeEdit className="" />{" "}
                                                <span>Edit</span>
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(expense.id)
                                                }
                                                className="bg-red-400 text-white p-1.5 rounded-sm cursor-pointer shrink-0"
                                            >
                                                {deleteLoading &&
                                                expense.id === deletingId ? (
                                                    <AiOutlineLoading3Quarters className="size-4 animate-spin duration-300" />
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
                                    colSpan={9}
                                    className="p-3 text-center text-gray-500"
                                >
                                    No expenses data found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllExpensesPage;
