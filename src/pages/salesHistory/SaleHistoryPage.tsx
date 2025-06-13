import React, { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router";
import DropdownMenuList from "../../components/DropdownMenulist";
import Pagination from "../../components/Pagination";
import { useGetSalesHistoryQuery } from "../../redux/features/salesHistory/saleHistoryApi";
import type { ISaleHistory } from "../../redux/features/salesHistory/saleHistorySlice";
import SaleHistoryDetails from "./SaleHistoryDetails";

export interface IMetaInfo {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

const SaleHistoryPage = () => {
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(20);

    const [showclose, setShowClose] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [search, setSearch] = useState("");
    const [dateFilter, setDateFilter] = useState("all_time");

    const {
        data: response,
        isLoading,
        isFetching,
    } = useGetSalesHistoryQuery(
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

    const { data: SalesHistory, meta } = response || {};

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

    const [showSearchedFor, setShowSearchedFor] = useState(
        search ? true : false
    );
    const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [saleHistoryDetails, setSaleHistoryDetails] =
        useState<ISaleHistory | null>(null);
    // const data = [
    //     {
    //         id: 1,
    //         totalPrice: "$100.00",
    //         paymentMethod: "Credit Card",
    //         customerName: "John Doe",
    //         itemName: "Item A",
    //         itemBrand: "Brand X",
    //         itemCategory: "Category Y",
    //         status: true,
    //         barcode: "4216",
    //         dueAmount: "0",
    //         paidAmount: "0",
    //     },
    //     // Add more sample data as needed
    //     {
    //         id: 2,
    //         totalPrice: "$200.00",
    //         paymentMethod: "PayPal",
    //         customerName: "Jane Smith",
    //         itemName: "Item B",
    //         itemBrand: "Brand Y",
    //         itemCategory: "Category Z",
    //         status: true,
    //         barcode: "4217",
    //         dueAmount: "0",
    //         paidAmount: "0",
    //     },
    //     {
    //         id: 3,
    //         totalPrice: "$150.00",
    //         paymentMethod: "Cash",
    //         customerName: "Alice Johnson",
    //         itemName: "Item C",
    //         itemBrand: "Brand Z",
    //         itemCategory: "Category X",
    //         status: false,
    //         barcode: "4218",
    //         dueAmount: "0",
    //         paidAmount: "0",
    //     },
    //     {
    //         id: 4,
    //         totalPrice: "$250.00",
    //         paymentMethod: "Debit Card",
    //         customerName: "Bob Brown",
    //         itemName: "Item D",
    //         itemBrand: "Brand A",
    //         itemCategory: "Category B",
    //         status: false,
    //         barcode: "42169",
    //         dueAmount: "0",
    //         paidAmount: "0",
    //     },
    //     {
    //         id: 5,
    //         totalPrice: "$300.00",
    //         paymentMethod: "Bank Transfer",
    //         customerName: "Charlie Green",
    //         itemName: "Item E",
    //         itemBrand: "Brand B",
    //         itemCategory: "Category C",
    //         status: true,
    //         barcode: "4220",
    //         dueAmount: "0",
    //         paidAmount: "0",
    //     },
    // ];

    const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleRefund = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setOpenMenuIndex(null);
    };

    return (
        <div>
            <div className="bg-white rounded-md p-2 sm:p-4 sm:px-6">
                <h1 className="font-medium text-lg mb-4">Sale History</h1>

                {/* <div className="flex flex-wrap lg:flex-nowrap gap-2">
                    <div className="border border-gray-300 w-[300px] flex gap-2 items-center p-2 rounded-sm">
                        <IoSearch className="text-xl text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="outline-0 text-sm rounded-sm w-full"
                        />
                    </div>
                    <select
                        className="border border-gray-300 text-sm p-2 rounded-sm outline-0 bg-gray-100"
                        defaultValue="all_time"
                        onChange={(e) => {
                            const value = e.target.value;
                            console.log("Filter by:", value);
                            // handle filter logic here
                        }}
                    >
                        <option value="today">Today</option>
                        <option value="7_days">7 Days</option>
                        <option value="this_month">This Month</option>
                        <option value="last_month">Last Month</option>
                        <option value="6_month">6 Month</option>
                        <option value="this_year">This Year</option>
                        <option value="last_year">Last Year</option>
                        <option value="all_time">All Time</option>
                    </select>
                </div> */}

                <div className="flex gap-4 flex-wrap lg:flex-nowrap items-center">
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
                        <div className="flex items-center border border-gray-300 rounded-lg pl-3 w-[300px] gap-1">
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
                                className={`bg-gray-200 cursor-pointer hover:bg-gray-300 duration-300  rounded-full p-1 ${
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
                        className="border border-gray-300 text-sm p-2 rounded-sm outline-0 bg-gray-100"
                        defaultValue="all_time"
                        onChange={(e) => {
                            const value = e.target.value;
                            setDateFilter(value);
                            console.log("Filter by:", value);
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
                    <table className="w-full border-collapse rounded-md text-gray-700">
                        <thead>
                            <tr className="bg-gray-200 text-left *:font-semibold text-sm">
                                <th className="p-3">ID</th>
                                <th className="p-3">BarCode</th>
                                <th className="p-3">Payment Method</th>
                                <th className="p-3">Customer Name</th>
                                <th className="p-3">Item Name</th>
                                <th className="p-3">Due Amount</th>
                                <th className="p-3">Paid Amount</th>
                                <th className="py-3">Total Price</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {isLoading || isFetching ? (
                                <tr className="text-sm">
                                    <td
                                        colSpan={9}
                                        className="p-4 text-center text-gray-500"
                                    >
                                        Loading...
                                    </td>
                                </tr>
                            ) : SalesHistory.length > 0 ? (
                                SalesHistory.map(
                                    (sale: ISaleHistory, index: number) => (
                                        <tr
                                            onClick={() => {
                                                setSaleHistoryDetails(sale);
                                                setShowModal(true);
                                            }}
                                            key={index}
                                            className="hover:bg-gray-100"
                                        >
                                            <td className="p-3">{index + 1}</td>
                                            <td className="p-3">
                                                {sale.barcode}
                                            </td>
                                            <td className="p-3">
                                                {sale.paymentMethod}
                                            </td>
                                            <td className="p-3">
                                                {sale.customerName}
                                            </td>
                                            <td className="p-3">
                                                {sale.itemName}
                                            </td>
                                            <td className="p-3">
                                                {sale.dueAmount}
                                            </td>
                                            <td className="p-3">
                                                {sale.paidAmount}
                                            </td>
                                            <td className="p-3">
                                                {sale.totalPrice}
                                            </td>
                                            <td className="p-3">
                                                <div
                                                    className={`${
                                                        sale.saleStatus ===
                                                        "PAID"
                                                            ? "bg-green-100 text-green-500"
                                                            : "bg-red-100 text-red-500"
                                                    } capitalize text-center text-xs p-1.5 w-[50px] rounded-md`}
                                                >
                                                    {sale.saleStatus}
                                                </div>
                                            </td>

                                            <td className="p-3 text-gray-500">
                                                <div className="flex items-center border border-gray-300 rounded-sm w-fit">
                                                    <Link
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                        }}
                                                        className="bg-gray-100 p-1 px-2 border-r border-gray-300 hover:bg-gray-200"
                                                        to={"edit"}
                                                    >
                                                        Edit
                                                    </Link>

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
                                                            className="p-2"
                                                            type="button"
                                                            onClick={
                                                                handleRefund
                                                            }
                                                        >
                                                            Refund
                                                        </button>
                                                        <div className="p-2">
                                                            Print Invoice
                                                        </div>
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
                                        className="text-center py-3 text-gray-500"
                                    >
                                        No sales history found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {!isLoading && (meta as IMetaInfo)?.totalPages > 1 && (
                        <section className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200">
                            <p className="text-sm font-medium text-gray-600">
                                Total Expenses : {(meta as IMetaInfo)?.total}
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
                                    className="px-2 py-1 outline-none border border-gray-300 rounded-md"
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
            {showModal && saleHistoryDetails && (
                <SaleHistoryDetails
                    saleHistoryDetails={saleHistoryDetails}
                    setShowModal={setShowModal} // pass setter function
                    title={"Supplier Information"}
                />
            )}
        </div>
    );
};

export default SaleHistoryPage;
