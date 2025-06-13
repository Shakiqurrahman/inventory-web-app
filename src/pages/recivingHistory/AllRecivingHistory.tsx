import React, { useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router";
import DropdownMenuList from "../../components/DropdownMenulist";
import type { ISaleHistory } from "../../redux/features/salesHistory/saleHistorySlice";
import RecivingHistoydetails from "./RecivingHistoydetails";

const AllRecivingHistory = () => {
    const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [saleRecivingDetails, setSaleRecivingDetails] =
        useState<ISaleHistory | null>(null);
    const data = [
        {
            id: 1,
            totalPrice: "$100.00",
            paymentMethod: "Credit Card",
            customerName: "John Doe",
            itemName: "Item A",
            itemBrand: "Brand X",
            itemCategory: "Category Y",
            status: true,
            barcode: "4216",
            dueAmount: "0",
            paidAmount: "0",
        },
        // Add more sample data as needed
        {
            id: 2,
            totalPrice: "$200.00",
            paymentMethod: "PayPal",
            customerName: "Jane Smith",
            itemName: "Item B",
            itemBrand: "Brand Y",
            itemCategory: "Category Z",
            status: true,
            barcode: "4217",
            dueAmount: "0",
            paidAmount: "0",
        },
        {
            id: 3,
            totalPrice: "$150.00",
            paymentMethod: "Cash",
            customerName: "Alice Johnson",
            itemName: "Item C",
            itemBrand: "Brand Z",
            itemCategory: "Category X",
            status: false,
            barcode: "4218",
            dueAmount: "0",
            paidAmount: "0",
        },
        {
            id: 4,
            totalPrice: "$250.00",
            paymentMethod: "Debit Card",
            customerName: "Bob Brown",
            itemName: "Item D",
            itemBrand: "Brand A",
            itemCategory: "Category B",
            status: false,
            barcode: "42169",
            dueAmount: "0",
            paidAmount: "0",
        },
        {
            id: 5,
            totalPrice: "$300.00",
            paymentMethod: "Bank Transfer",
            customerName: "Charlie Green",
            itemName: "Item E",
            itemBrand: "Brand B",
            itemCategory: "Category C",
            status: true,
            barcode: "4220",
            dueAmount: "0",
            paidAmount: "0",
        },
    ];

    const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleRefund = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setOpenMenuIndex(null);
    };

    return (
        <div>
            <div className="bg-white rounded-md p-2 sm:p-4 sm:px-6">
                <h1 className="font-medium text-lg mb-4">Sale History</h1>

                <div className="flex flex-wrap lg:flex-nowrap gap-2">
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
                            {data.length > 0 ? (
                                data.map((sale, index) => (
                                    <tr
                                        onClick={() => {
                                            setSaleRecivingDetails({
                                                ...sale,
                                                saleStatus: "DUE",
                                            });
                                            setShowModal(true);
                                        }}
                                        key={index}
                                        className="hover:bg-gray-100"
                                    >
                                        <td className="p-3">{index + 1}</td>
                                        <td className="p-3">{sale.barcode}</td>
                                        <td className="p-3">
                                            {sale.paymentMethod}
                                        </td>
                                        <td className="p-3">
                                            {sale.customerName}
                                        </td>
                                        <td className="p-3">{sale.itemName}</td>
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
                                                    sale.status
                                                        ? "bg-green-100 text-green-500"
                                                        : "bg-red-100 text-red-500"
                                                } capitalize text-center text-xs p-1.5 w-[50px] rounded-md`}
                                            >
                                                {sale.status ? "paid" : "due"}
                                            </div>
                                        </td>

                                        <td className="p-3 text-gray-500">
                                            <div className="flex items-center border border-gray-300 rounded-sm w-fit">
                                                <Link
                                                    className="bg-gray-100 p-1 px-2 border-r border-gray-300 hover:bg-gray-200"
                                                    to={"/edit"}
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
                                                        setOpenMenuIndex(null)
                                                    }
                                                    anchorEl={
                                                        buttonRefs.current[
                                                            index
                                                        ]
                                                    }
                                                    open={
                                                        openMenuIndex === index
                                                    }
                                                >
                                                    <button
                                                        className="p-2"
                                                        type="button"
                                                        onClick={handleRefund}
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
                                ))
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
                </div>
            </div>
            {/* Future implementation will go here */}
            {showModal && saleRecivingDetails && (
                <RecivingHistoydetails
                    saleHistoryDetails={saleRecivingDetails}
                    setShowModal={setShowModal} // pass setter function
                    title={"Reciving Information"}
                />
            )}
        </div>
    );
};

export default AllRecivingHistory;
