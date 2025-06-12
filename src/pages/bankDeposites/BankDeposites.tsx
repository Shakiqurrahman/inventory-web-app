import { useEffect, useState } from "react";
import { FiPlus, FiSearch, FiTrash } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import {
    deleteBankDeposite,
    toggleCreateDepositeModal,
    toggleEditDepositeModal,
    type IBankDeposite,
} from "../../redux/features/bankDeposite/bankDepositeSlice";
import { useAppSelector } from "../../redux/hook";
import { formatDateToLongDate } from "../../utils/timeFormatHandler";
import CreateBankDepositoryModal from "./CreateBankDepositoryModal";
import EditBankDepositoryModal from "./EditBankDepositeModel";

const BankDeposites = () => {
    const isFetching = false;
    const [showclose, setShowClose] = useState(false);
    const [selectedItem, setSelectedItem] = useState<IBankDeposite | null>(
        null
    );
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [searchValue, setSearchValue] = useState("");
    const [search, setSearch] = useState("");
    const [showSearchedFor, setShowSearchedFor] = useState(
        search ? true : false
    );

    const dispatch = useDispatch();
    const { bankDeposites, openCreateModal, openEditModal } = useAppSelector(
        (state) => state.bankDeposite
    );
    // console.log(bankDeposites);

    useEffect(() => {
        if (searchValue) {
            setShowClose(true);
        } else {
            setShowClose(false);
        }
    }, [setShowClose, searchValue]);

    const handleEdit = (item: IBankDeposite, index: number) => {
        setSelectedItem(item);
        setSelectedIndex(index);
        dispatch(toggleEditDepositeModal());
    };

    const handleClearButton = async () => {
        setSearch("");
        setSearchValue("");
        setShowSearchedFor(false);
    };

    const handleSearch = () => {
        setShowSearchedFor(true);
        setSearch(searchValue);
    };

    return (
        <div className="bg-white p-4 rounded-lg">
            <div className="flex justify-between py-4">
                <h1 className="font-medium text-lg mb-4">Bank Deposit</h1>
                <h1 className="font-medium text-lg mb-4">
                    Balance: <span>20,000</span>
                </h1>
            </div>

            <div className="flex justify-between flex-wrap sm:flex-nowrap gap-2">
                <div>
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
                            <div className="flex items-center border border-gray-300 rounded-lg pl-3 w-[300px] gap-1">
                                <FiSearch className="text-lg shrink-0 text-gray-500" />
                                <input
                                    type="text"
                                    name="search"
                                    id="search"
                                    value={searchValue}
                                    onChange={(e) =>
                                        setSearchValue(e.target.value)
                                    }
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
                                    onClick={handleSearch}
                                    disabled={!searchValue}
                                    className="bg-blue-500 hover:bg-blue-600 duration-300 cursor-pointer text-white py-2 px-3 rounded-r-lg text-sm"
                                >
                                    Search
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => dispatch(toggleCreateDepositeModal())}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center text-xs gap-1 cursor-pointer hover:bg-blue-600 duration-200"
                    >
                        <FiPlus className="text-lg" />
                        New Transaction
                    </button>
                </div>
            </div>

            <div className="mt-10 overflow-x-auto text-nowrap">
                <table className="w-full border-collapse rounded-md text-gray-700">
                    <thead>
                        <tr className="bg-gray-200 text-left *:font-semibold text-sm">
                            <th className="p-3 w-[60px]">ID</th>
                            <th className="p-3">Transection Number</th>
                            <th className="p-3">Transection Type</th>
                            <th className="p-3">Bank Name</th>
                            <th className="p-3">Account Number</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Reason</th>
                            <th className="p-3">Date</th>
                            <th className="p-3 w-[200px]">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bankDeposites.length > 0 ? (
                            bankDeposites.map((item, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-300 hover:bg-gray-50 text-sm"
                                >
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">
                                        {item.transectionId}
                                    </td>
                                    <td className="p-3">{item.bankName}</td>
                                    <td className="p-3">
                                        {item.accountNumber}
                                    </td>
                                    <td className="p-3">{item.amount}</td>
                                    <td className="p-3">
                                        {item.reason ? item.reason : "N/A"}
                                    </td>
                                    <td className="p-3">
                                        {formatDateToLongDate(item.date)}
                                    </td>

                                    <td className="flex items-center gap-1 p-3">
                                        <button
                                            onClick={() =>
                                                handleEdit(item, index)
                                            }
                                            className="flex gap-0.5 items-center py-1.5 px-3 bg-blue-500 text-white rounded-sm text-xs cursor-pointer shrink-0"
                                        >
                                            <MdOutlineModeEdit className="" />{" "}
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            onClick={() =>
                                                dispatch(
                                                    deleteBankDeposite(index)
                                                )
                                            }
                                            type="button"
                                            className="bg-red-400 text-white p-1.5 rounded-sm cursor-pointer shrink-0"
                                        >
                                            <FiTrash className="text-md" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="text-sm">
                                <td
                                    colSpan={8}
                                    className="p-3 text-center text-gray-500"
                                >
                                    No Deposites found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {openCreateModal && <CreateBankDepositoryModal />}
            {openEditModal && (
                <EditBankDepositoryModal
                    selectedItem={selectedItem}
                    selectedIndex={selectedIndex}
                />
            )}
        </div>
    );
};

export default BankDeposites;
