import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiPlus, FiSearch } from "react-icons/fi";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdPrint } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
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

    const [searchValue, setSearchValue] = useState("");
    const [search, setSearch] = useState("");

    const [showLimit, setShowLimit] = useState(20);
    const [showclose, setShowClose] = useState(false);
    const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
    const [showSearchedFor, setShowSearchedFor] = useState(
        search ? true : false
    );

    // const [searchValue, setSearchValue] = useState("");
    // const [search, setSearch] = useState("");
    const {
        data: response,
        isLoading,
        isFetching,
    } = useGetItemsQuery(
        {
            page,
            limit: showLimit,
            search,
        },
        {
            skip: !page,
        }
    );

    const { data: itemsData, meta } = response || {};

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
            <div className="bg-white dark:bg-stone-700 p-4 rounded-lg">
                <h1 className="font-medium text-lg mb-4 dark:text-gray-300">
                    Items
                </h1>
                <div className="flex justify-between flex-wrap sm:flex-nowrap gap-2">
                    {showSearchedFor ? (
                        <div className="flex items-center gap-4 mb-1.5">
                            <h2 className="text-base font-medium dark:text-gray-300">
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
                                placeholder="Search Item"
                                className="placeholder:text-sm size-full outline-none dark:text-gray-300 bg-none"
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
                    <Link
                        to={"/items/new-item"}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center text-xs gap-1 cursor-pointer hover:bg-blue-600 duration-200"
                    >
                        <FiPlus className="text-lg" />
                        New Item
                    </Link>
                </div>
                <div className="mt-10 overflow-x-auto">
                    <table className="w-full border-collapse rounded-md text-gray-700 dark:text-gray-300">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-stone-600 dark:text-gray-300 text-left *:font-semibold text-sm">
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
                                        className="p-3 text-center text-gray-500 dark:text-gray-300"
                                    >
                                        Loading...
                                    </td>
                                </tr>
                            ) : !isLoading && itemsData?.length > 0 ? (
                                itemsData?.map(
                                    (item: IProductSummary, index: number) => (
                                        <tr
                                            key={index}
                                            className="border-b border-gray-300 dark:border-stone-600 dark:hover:bg-stone-500 hover:bg-gray-50 text-sm"
                                        >
                                            <td className="p-3">
                                                <Link
                                                    to={item.id}
                                                    className="cursor-pointer underline text-blue-500"
                                                >
                                                    {item?.name}
                                                </Link>
                                            </td>
                                            <td className="p-3">
                                                {item.category?.name || "N/A"}
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
                                                        to={`/items/edit-item/${item.id}`}
                                                        className="py-1.5 px-3 dark:bg-stone-700 bg-[#F2F6F9] text-sm cursor-pointer shrink-0 border border-[#D7DCE5] dark:border-[#74777e]"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <div
                                                        className="bg-[#F2F6F9] dark:bg-stone-700 flex items-center p-1.5 cursor-pointer shrink-0 border border-[#D7DCE5] dark:border-[#74777e]"
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
                                                                to={`/generate-item-barcode/${item.id}`}
                                                                type="button"
                                                                className="p-2 flex items-center gap-2"
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
                                        className="p-3 text-center text-gray-500 dark:text-gray-300"
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
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            Total Items : {(meta as IMetaInfo)?.total}
                        </p>
                        <Pagination
                            currentPage={(meta as IMetaInfo)?.page || page}
                            totalPages={(meta as IMetaInfo)?.totalPages}
                            onPageChange={setPage}
                        />
                        <div className="flex items-center gap-2 dark:text-gray-300">
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
                                <option value="1">10</option>
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
