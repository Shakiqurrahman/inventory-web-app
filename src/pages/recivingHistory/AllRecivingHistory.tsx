import { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { IoIosReturnLeft } from "react-icons/io";
import { LuPrinter } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import DropdownMenuList from "../../components/DropdownMenulist";
import Pagination from "../../components/Pagination";
import { useGetReceivingHistoryQuery } from "../../redux/features/receivingHistory/receivingHIstoryApi";
import {
    toggleReceiveReturnModal,
    type IReceiveHistory,
} from "../../redux/features/receivingHistory/receivingHIstorySlice";
import { useAppSelector } from "../../redux/hook";
import { formatDateToLongDate } from "../../utils/timeFormatHandler";
import RecivingHistoydetails from "./RecivingHistoydetails";
import ReturnReceiveModal from "./ReturnReceiveModal";

export interface IMetaInfo {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

const AllRecivingHistory = () => {
    const { openReceiveReturnModal } = useAppSelector(
        (state) => state.receiveHistory
    );
    const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
    const [selectedReceive, setSelectedReceive] = useState("");

    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(20);
    const dispatch = useDispatch();

    const [showclose, setShowClose] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [search, setSearch] = useState("");
    const [dateFilter, setDateFilter] = useState("all_time");

    const [showModal, setShowModal] = useState(false);
    const [saleRecivingDetails, setSaleRecivingDetails] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const {
        data: response,
        isLoading,
        isFetching,
    } = useGetReceivingHistoryQuery(
        {
            page,
            limit: showLimit,
            search,
            dateRange: dateFilter,
        },
        {
            skip: !page,
        }
    );

    const { data: receivingHistory, meta } = response || {};

    useEffect(() => {
        if (searchValue) {
            setShowClose(true);
        } else {
            setShowClose(false);
        }
    }, [setShowClose, searchValue]);

    const handleSearchButton = async () => {
        setPage(1);
        setSearch(searchValue);
        setShowSearchedFor(true);
    };

    const handleClearButton = async () => {
        setSearch("");
        setSearchValue("");
        setShowSearchedFor(false);
    };

    const [showSearchedFor, setShowSearchedFor] = useState(
        search ? true : false
    );

    const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);

    return (
        <div>
            <div className="bg-white dark:bg-stone-700 rounded-md p-2 sm:p-4 sm:px-6">
                <h1 className="font-medium text-lg mb-4 dark:text-gray-200">
                    Receiving History
                </h1>

                <div className="flex gap-4 flex-wrap lg:flex-nowrap items-center dark:text-gray-300">
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
                        <div className="flex items-center border border-gray-300 dark:border-gray-500 dark:text-gray-300 rounded-lg pl-3 w-[300px] gap-1">
                            <FiSearch className="text-lg shrink-0 text-gray-500 dark:text-gray-300" />
                            <input
                                type="text"
                                name="search"
                                id="search"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Search Receiving"
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
                    <select
                        className="border border-gray-300 dark:border-gray-500 dark:bg-stone-500 text-sm p-2 rounded-sm outline-0 bg-gray-100"
                        defaultValue="all_time"
                        onChange={(e) => {
                            const value = e.target.value;
                            setDateFilter(value);
                            // handle filter logic here
                        }}
                    >
                        <option value="today">Today</option>
                        <option value="7_days">7 Days</option>
                        <option value="this_month">This Month</option>
                        <option value="last_month">Last Month</option>
                        <option value="6_months">6 Months</option>
                        <option value="this_year">This Year</option>
                        <option value="last_year">Last Year</option>
                        <option value="all_time">All Time</option>
                    </select>
                </div>

                <div className="mt-10 overflow-x-auto text-nowrap">
                    <table className="w-full border-collapse rounded-md text-gray-700 dark:text-gray-300">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-stone-500  *:font-semibold text-sm">
                                <th className="p-3">ID</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Invoice ID</th>
                                <th className="p-3">Supplier Name</th>
                                <th className="p-3">Due Amount</th>
                                <th className="p-3">Paid Amount</th>
                                <th className="py-3">Total Price</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {isLoading ? (
                                <tr>
                                    <td
                                        colSpan={10}
                                        className="p-4 text-center text-gray-500 dark:text-gray-300"
                                    >
                                        Loading...
                                    </td>
                                </tr>
                            ) : receivingHistory?.length ? (
                                receivingHistory?.map(
                                    (
                                        receiving: IReceiveHistory,
                                        index: number
                                    ) => (
                                        <tr
                                            onClick={() => {
                                                setSaleRecivingDetails(
                                                    receiving?.id
                                                );
                                                setShowModal(true);
                                            }}
                                            key={index}
                                            className="hover:bg-gray-100 dark:hover:bg-stone-400 *:text-center"
                                        >
                                            <td className="p-3">{index + 1}</td>
                                            <td className="p-3">
                                                {formatDateToLongDate(
                                                    receiving.createdAt
                                                )}
                                            </td>
                                            <td className="p-3">
                                                {receiving.invoiceId}
                                            </td>

                                            <td className="p-3">
                                                {receiving?.supplier?.fullName}
                                            </td>

                                            <td className="p-3">
                                                {receiving.dueAmount > 0
                                                    ? receiving.dueAmount
                                                    : 0}
                                            </td>
                                            <td className="p-3">
                                                {receiving.paidAmount}
                                            </td>
                                            <td className="p-3">
                                                {receiving.totalPrice}
                                            </td>
                                            <td className="p-3 flex justify-center">
                                                <div
                                                    className={`${
                                                        receiving.paymentStatus ===
                                                        "PAID"
                                                            ? "bg-green-100 text-green-500"
                                                            : "bg-red-100 text-red-500"
                                                    } uppercase text-center text-xs p-1.5 rounded-md`}
                                                >
                                                    {receiving.paymentStatus}
                                                </div>
                                            </td>

                                            <td className="p-3 text-gray-500">
                                                <div className="flex items-center border border-gray-300 rounded-sm w-fit">
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setIsEditing(true);
                                                            setSaleRecivingDetails(
                                                                receiving?.id
                                                            );
                                                            setShowModal(true);
                                                        }}
                                                        className="bg-gray-100 dark:bg-stone-500 dark:text-gray-200 p-1 px-2 border-r border-gray-300 hover:bg-gray-200"
                                                    >
                                                        Edit
                                                    </button>

                                                    <div
                                                        ref={(el) => {
                                                            buttonRefs.current[
                                                                index
                                                            ] = el;
                                                        }}
                                                    >
                                                        <button
                                                            className="p-1.5 rounded-sm cursor-pointer shrink-0"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setOpenMenuIndex(
                                                                    (prev) =>
                                                                        prev ===
                                                                        index
                                                                            ? null
                                                                            : index
                                                                );
                                                            }}
                                                            type="button"
                                                        >
                                                            <BsThreeDots />
                                                        </button>
                                                    </div>

                                                    <DropdownMenuList
                                                        onclose={() =>
                                                            setOpenMenuIndex(
                                                                null
                                                            )
                                                        }
                                                        anchorEl={
                                                            buttonRefs.current[
                                                                index
                                                            ]
                                                        }
                                                        open={
                                                            openMenuIndex ===
                                                            index
                                                        }
                                                    >
                                                        <button
                                                            className="p-2 flex items-center gap-2"
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedReceive(
                                                                    receiving?.id
                                                                ); // set selected sale
                                                                dispatch(
                                                                    toggleReceiveReturnModal()
                                                                ); // open modal
                                                            }}
                                                        >
                                                            <IoIosReturnLeft />
                                                            <span>Return</span>
                                                        </button>
                                                        <Link
                                                            to={
                                                                "/receiving/receiving-recipt"
                                                            }
                                                            state={{
                                                                id: receiving?.id,
                                                            }}
                                                            className="p-2 flex items-center gap-2"
                                                        >
                                                            <LuPrinter />
                                                            <span>
                                                                Print Invoice
                                                            </span>
                                                        </Link>
                                                    </DropdownMenuList>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )
                            ) : (
                                <tr>
                                    <td
                                        colSpan={9}
                                        className="text-center py-3 text-gray-500 dark:text-gray-300"
                                    >
                                        No receivings history found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {!isLoading && (meta as IMetaInfo)?.totalPages > 0 && (
                        <section className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                Total Expenses : {(meta as IMetaInfo)?.total}
                            </p>
                            <Pagination
                                currentPage={(meta as IMetaInfo)?.page || page}
                                totalPages={(meta as IMetaInfo)?.totalPages}
                                onPageChange={setPage}
                            />
                            <div className="flex items-center gap-2">
                                <p className="text-sm dark:text-gray-300">
                                    Show per page :
                                </p>
                                <select
                                    onChange={(e) =>
                                        setShowLimit(Number(e.target.value))
                                    }
                                    name="pageLimit"
                                    id="pageLimit"
                                    value={showLimit}
                                    className="px-2 py-1 outline-none border border-gray-300 dark:border-gray-500 dark:text-gray-300 dark:bg-stone-500 rounded-md"
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
            </div>
            {/* Future implementation will go here */}
            {showModal && saleRecivingDetails && (
                <RecivingHistoydetails
                    receiveId={saleRecivingDetails}
                    setShowModal={() => {
                        setShowModal(false);
                        setIsEditing(false);
                    }} // pass setter function
                    title={"Reciving Information"}
                    edit={isEditing}
                />
            )}
            {openReceiveReturnModal && selectedReceive && (
                <ReturnReceiveModal receiveId={selectedReceive} />
            )}
        </div>
    );
};

export default AllRecivingHistory;
