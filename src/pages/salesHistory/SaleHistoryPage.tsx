import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router";

const SaleHistoryPage = () => {
    const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
    const data = [
        {
            id: 1,
            totalPrice: "$100.00",
            paymentMethod: "Credit Card",
            customerName: "John Doe",
            itemName: "Item A",
            itemBrand: "Brand X",
            itemCategory: "Category Y",
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
        },
        {
            id: 3,
            totalPrice: "$150.00",
            paymentMethod: "Cash",
            customerName: "Alice Johnson",
            itemName: "Item C",
            itemBrand: "Brand Z",
            itemCategory: "Category X",
        },
        {
            id: 4,
            totalPrice: "$250.00",
            paymentMethod: "Debit Card",
            customerName: "Bob Brown",
            itemName: "Item D",
            itemBrand: "Brand A",
            itemCategory: "Category B",
        },
        {
            id: 5,
            totalPrice: "$300.00",
            paymentMethod: "Bank Transfer",
            customerName: "Charlie Green",
            itemName: "Item E",
            itemBrand: "Brand B",
            itemCategory: "Category C",
        },
    ];
    return (
        <div>
            <div className="bg-white rounded-md p-2 sm:p-4 sm:px-6">
                <h1 className="font-medium text-lg mb-4">Sale History</h1>

                <div className="border border-gray-300 w-[300px] flex gap-2 items-center p-2 rounded-sm">
                    <IoSearch className="text-xl text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="outline-0 text-sm rounded-sm w-full"
                    />
                </div>

                <div className="mt-10 overflow-x-auto">
                    <table className="w-full border-collapse rounded-md text-gray-700">
                        <thead>
                            <tr className="bg-gray-200 text-left *:font-semibold text-sm">
                                <th className="p-3">ID</th>
                                <th className="py-3">Total Price</th>
                                <th className="p-3">Payment Method</th>
                                <th className="p-3">Customer Name</th>
                                <th className="p-3">Item Name</th>
                                <th className="p-3">Item Brand</th>
                                <th className="p-3">Item Category</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {data ? (
                                data.map((sale, index) => (
                                    <tr key={index}>
                                        <td className="p-3">{index + 1}</td>
                                        <td>{sale.totalPrice}</td>
                                        <td className="p-3">
                                            {sale.paymentMethod}
                                        </td>
                                        <td className="p-3">
                                            {sale.customerName}
                                        </td>
                                        <td className="p-3">{sale.itemName}</td>
                                        <td className="p-3">
                                            {sale.itemBrand}
                                        </td>
                                        <td className="p-3">
                                            {sale.itemCategory}
                                        </td>
                                        <td className="p-3 text-gray-500">
                                            <div className="flex items-center  border border-gray-300 rounded-sm w-fit">
                                                <Link
                                                    className="bg-gray-100 p-1 px-2 border-r border-gray-300 hover:bg-gray-200"
                                                    to={"/edit"}
                                                >
                                                    Edit
                                                </Link>
                                                <div className="relative">
                                                    <button
                                                        className="p-1.5 rounded-sm cursor-pointer shrink-0"
                                                        onClick={() =>
                                                            setOpenMenuIndex(
                                                                (prev) =>
                                                                    prev ===
                                                                    index
                                                                        ? null
                                                                        : index
                                                            )
                                                        }
                                                        type="button"
                                                    >
                                                        <BsThreeDots />
                                                    </button>

                                                    {openMenuIndex ===
                                                        index && (
                                                        <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded shadow z-10">
                                                            <button
                                                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                                                onClick={() =>
                                                                    setOpenMenuIndex(
                                                                        null
                                                                    )
                                                                }
                                                            >
                                                                Print Invoice
                                                            </button>
                                                            <button
                                                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                                                onClick={() =>
                                                                    setOpenMenuIndex(
                                                                        null
                                                                    )
                                                                }
                                                            >
                                                                Return
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
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
            {/* Future implementation will go here */}
        </div>
    );
};

export default SaleHistoryPage;
