import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiPlus, FiSearch, FiTrash } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import Pagination from "../../components/Pagination";
import {
    useDeleteEmployeeSalaryMutation,
    useGetEmployeeSalaryQuery,
} from "../../redux/features/employeeSalary/employeeSalaryApi";
import {
    toggleCreateEmployeeSalaryModal,
    toggleEditEmployeeSalaryModal,
    type IEmployeeSalary,
} from "../../redux/features/employeeSalary/employeeSalarySlice";
import { useAppSelector } from "../../redux/hook";
import { getErrorMessage } from "../../utils/errorHandler";
import { formatDateToLongDate } from "../../utils/timeFormatHandler";
import type { IMetaInfo } from "../bankDeposites/BankDeposites";
import EditSalarymodal from "./EditSalarymodal";
import NewSalarymodal from "./NewSalarymodal";

type SelectedDataType = {
    index: number;
    employee: IEmployeeSalary;
};

const EmployeeSalaryList = () => {
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(20);

    const [searchValue, setSearchValue] = useState("");
    const [search, setSearch] = useState("");
    const [showSearchedFor, setShowSearchedFor] = useState(
        search ? true : false
    );
    const [showclose, setShowClose] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const {
        data: response,
        isLoading,
        isFetching,
    } = useGetEmployeeSalaryQuery(
        {
            page,
            limit: showLimit,
            search,
        },
        {
            skip: !page,
        }
    );

    const { data: employeeSalary, meta } = response || {};

    useEffect(() => {
        if (searchValue) {
            setShowClose(true);
        } else {
            setShowClose(false);
        }
    }, [setShowClose, searchValue]);

    const handleSearchButton = async () => {
        setSearch(searchValue);
        setShowSearchedFor(true);
    };

    const handleClearButton = async () => {
        setSearch("");
        setSearchValue("");
        setShowSearchedFor(false);
    };

    const [deleteEmployeeSalary, { isLoading: isDeleting }] =
        useDeleteEmployeeSalaryMutation();

    const [seletedData, setSelectedData] = useState<SelectedDataType | null>(
        null
    );

    const dispatch = useDispatch();
    const { openCreateEmployeeSalaryModal, openEdotEmployeeSalaryModal } =
        useAppSelector((state) => state.employeeSalary);

    const handleDelete = async (id: string) => {
        try {
            setDeletingId(id); // set the currently deleting ID
            await deleteEmployeeSalary(id).unwrap();
            toast.success("Employee deleted successfully");
        } catch (err) {
            toast.error(getErrorMessage(err));
        } finally {
            setDeletingId(null); // clear after done
        }
    };

    return (
        <div className="bg-white dark:bg-stone-700 dark:text-gray-300 p-4 rounded-lg">
            <h1 className="font-medium text-lg mb-4">Employees Salary</h1>
            <div className="flex justify-between flex-wrap sm:flex-nowrap gap-2">
                {showSearchedFor ? (
                    <div className="flex items-center gap-4 mb-1.5">
                        <h2 className="text-base font-medium">
                            Search for &quot;{search}&quot;
                        </h2>
                        <button
                            type="button"
                            onClick={handleClearButton}
                            className="bg-gray-600 text-white  px-4 py-1.5 rounded-full font-medium text-sm cursor-pointer"
                        >
                            {isFetching ? "Searching..." : "Clear"}
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center border border-gray-300 dark:border-gray-500 rounded-lg pl-3 w-[300px] gap-1">
                        <FiSearch className="text-lg shrink-0 text-gray-500" />
                        <input
                            type="text"
                            name="search"
                            id="search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Search Expense"
                            className="placeholder:text-sm size-full outline-none"
                        />
                        <button
                            onClick={() => setSearchValue("")}
                            className={`bg-gray-200 dark:text-gray-500 cursor-pointer hover:bg-gray-300 duration-300  rounded-full p-1 ${
                                showclose ? "block" : "hidden"
                            }`}
                        >
                            <RxCross2 className="text-sm " />
                        </button>

                        <button
                            type="button"
                            onClick={handleSearchButton}
                            disabled={!searchValue}
                            className="bg-blue-500 hover:bg-blue-600 duration-300 cursor-pointer text-white py-2 px-3 rounded-r-lg text-sm"
                        >
                            Search
                        </button>
                    </div>
                )}

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
                <table className="w-full border-collapse rounded-md text-gray-700 dark:text-gray-300">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-stone-500 text-left *:font-semibold text-sm text-nowrap">
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
                        {isLoading ? (
                            <tr className="text-sm">
                                <td
                                    colSpan={7}
                                    className="p-3 text-center text-gray-500 dark:text-gray-300"
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : employeeSalary?.length > 0 ? (
                            employeeSalary?.map(
                                (employee: IEmployeeSalary, index: number) => (
                                    <tr
                                        className="border-b border-gray-300 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-stone-400 text-sm"
                                        key={index}
                                    >
                                        <td className="p-3">{index + 1}</td>
                                        <td className="p-3 text-nowrap">
                                            {formatDateToLongDate(
                                                employee.date
                                            )}
                                        </td>
                                        <td className="p-3 text-nowrap">
                                            {employee.amount}
                                        </td>
                                        <td className="p-3">
                                            {employee.bonusAmount
                                                ? employee.bonusAmount
                                                : "N/A"}
                                        </td>
                                        <td className="p-3">
                                            {employee.employee?.name}
                                        </td>
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
                                                onClick={() => {
                                                    if (employee.id) {
                                                        handleDelete(
                                                            employee.id
                                                        );
                                                    }
                                                }}
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
                                    colSpan={7}
                                    className="p-3 text-center text-gray-500 dark:text-gray-300"
                                >
                                    No employees found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {!isLoading && (meta as IMetaInfo)?.totalPages > 1 && (
                    <section className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200 ">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            Total Employee Salary : {(meta as IMetaInfo)?.total}
                        </p>
                        <Pagination
                            currentPage={(meta as IMetaInfo)?.page || page}
                            totalPages={(meta as IMetaInfo)?.totalPages}
                            onPageChange={setPage}
                        />
                        <div className="flex items-center gap-2">
                            <p className="text-sm">Show per page :</p>
                            <select
                                onChange={(e) =>
                                    setShowLimit(Number(e.target.value))
                                }
                                name="pageLimit"
                                id="pageLimit"
                                value={showLimit}
                                className="px-2 py-1 outline-none border border-gray-300 rounded-md dark:bg-stone-500"
                            >
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                    </section>
                )}
            </div>

            {openCreateEmployeeSalaryModal && <NewSalarymodal />}
            {openEdotEmployeeSalaryModal && seletedData && (
                <EditSalarymodal seletedData={seletedData} />
            )}
        </div>
    );
};

export default EmployeeSalaryList;
