import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiPlus, FiSearch } from "react-icons/fi";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdPrint } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router";
import DropdownMenuList from "../../components/DropdownMenulist";
import Pagination from "../../components/Pagination";
import {
    useDeleteItemMutation,
    useGetItemsQuery,
    type IProductSummary,
} from "../../redux/features/items/itemApiSlice";
import { getErrorMessage } from "../../utils/errorHandler";
import type { IMetaInfo } from "../expenses/AllExpensesPage";

const AllItemsPage = () => {
    const [deleteItem, { isLoading: isDeleting }] = useDeleteItemMutation();

    const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(20);
    const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

    // const [searchValue, setSearchValue] = useState("");
    // const [search, setSearch] = useState("");
    const {
        data: response,
        isLoading,
        // isFetching,
    } = useGetItemsQuery(
        {
            page,
            limit: showLimit,
            // search,
        },
        {
            skip: !page,
        }
    );

    const { data: itemsData, meta } = response || {};

    const handleDeleteItem = async (itemId: string) => {
        if (itemId) {
            try {
                await deleteItem(itemId).unwrap();
                toast.success("Item Delete Successfully.");
            } catch (error) {
                toast.error(getErrorMessage(error));
            }
        }
    };

    return (
        <>
            <div className="bg-white p-4 rounded-lg">
                <h1 className="font-medium text-lg mb-4">Items</h1>
                <div className="flex justify-between flex-wrap sm:flex-nowrap gap-2">
                    <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-[300px] gap-2">
                        <FiSearch className="text-lg shrink-0" />
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search Items"
                            className="placeholder:text-sm size-full outline-none"
                        />
                    </div>
                    <Link
                        to={"/items/new-item"}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center text-xs gap-1 cursor-pointer hover:bg-blue-600 duration-200"
                    >
                        <FiPlus className="text-lg" />
                        New Item
                    </Link>
                </div>
                <div className="mt-10 overflow-x-auto">
                    <table className="w-full border-collapse rounded-md text-gray-700">
                        <thead>
                            <tr className="bg-gray-200 text-left *:font-semibold text-sm">
                                <th className="p-3">Item Name</th>
                                <th className="p-3">Category</th>
                                <th className="p-3">Cost Price</th>
                                <th className="p-3">Sell Price</th>
                                <th className="p-3">Stock</th>
                                <th className="p-3">Brand</th>
                                <th className="p-3 w-[200px]">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr className="border-b border-gray-300 text-sm">
                                    <td
                                        colSpan={7}
                                        className="p-3 text-center text-gray-500"
                                    >
                                        Loading...
                                    </td>
                                </tr>
                            ) : !isLoading && itemsData?.length > 0 ? (
                                itemsData?.map(
                                    (item: IProductSummary, index: number) => (
                                        <tr
                                            key={index}
                                            className="border-b border-gray-300 hover:bg-gray-50 text-sm"
                                        >
                                            <td className="p-3">
                                                <Link
                                                    to={item.id}
                                                    className="cursor-pointer underline text-blue-500"
                                                >
                                                    {item.name}
                                                </Link>
                                            </td>
                                            <td className="p-3">
                                                {item.category.name || "N/A"}
                                            </td>
                                            <td className="p-3">
                                                <span className="flex items-center">
                                                    <TbCurrencyTaka />
                                                    {item.costPrice}
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                <span className="flex items-center">
                                                    <TbCurrencyTaka />
                                                    {item.sellPrice}
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                {item.totalStock || 0}
                                            </td>
                                            <td className="p-3">
                                                {item.brand || "N/A"}
                                            </td>
                                            <td className="flex p-3 relative">
                                                <div
                                                    className="flex"
                                                    ref={(el) => {
                                                        buttonRefs.current[
                                                            index
                                                        ] = el;
                                                    }}
                                                >
                                                    <Link
                                                        to={`/expenses/edit-expense/${item.id}`}
                                                        className="py-1.5 px-3 bg-[#F2F6F9] text-sm cursor-pointer shrink-0 border border-[#D7DCE5]"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <div
                                                        className="bg-[#F2F6F9] flex items-center p-1.5 cursor-pointer shrink-0 border border-[#D7DCE5]"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setOpenMenuIndex(
                                                                index
                                                            ); // ✅ Correctly open the dropdown for this index
                                                        }}
                                                    >
                                                        <HiDotsHorizontal className="text-base" />
                                                    </div>
                                                    {openMenuIndex !== null && (
                                                        <DropdownMenuList
                                                            onclose={() =>
                                                                setOpenMenuIndex(
                                                                    null
                                                                )
                                                            } // ✅ Close properly
                                                            anchorEl={
                                                                buttonRefs
                                                                    .current[
                                                                    index
                                                                ]
                                                            }
                                                            open={
                                                                openMenuIndex ===
                                                                index
                                                            } // ✅ This works now
                                                        >
                                                            <Link
                                                                to={`/print-item-barcode/${item.id}`}
                                                                type="button"
                                                                className="p-2 flex items-center gap-2"
                                                                onClick={() =>
                                                                    console.log(
                                                                        "Print Barcode"
                                                                    )
                                                                }
                                                            >
                                                                <MdPrint className="text-base" />
                                                                Print Barcode
                                                            </Link>
                                                            <button
                                                                type="button"
                                                                disabled={
                                                                    isDeleting
                                                                }
                                                                className="p-2 flex items-center gap-2"
                                                                onClick={() =>
                                                                    handleDeleteItem(
                                                                        item.id
                                                                    )
                                                                }
                                                            >
                                                                <RiDeleteBin6Line className="text-base" />
                                                                Delete
                                                            </button>
                                                        </DropdownMenuList>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )
                            ) : (
                                <tr className="border-b border-gray-300 text-sm">
                                    <td
                                        colSpan={7}
                                        className="p-3 text-center text-gray-500"
                                    >
                                        No item added yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {!isLoading && (meta as IMetaInfo)?.totalPages > 1 && (
                    <section className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200">
                        <p className="text-sm font-medium text-gray-600">
                            Total Items : {(meta as IMetaInfo)?.total}
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
        </>
    );
};

export default AllItemsPage;
