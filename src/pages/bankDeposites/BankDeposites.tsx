import { useEffect, useState } from "react";
import { FiPlus, FiSearch, FiTrash } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { toggleCreateDepositeModal } from "../../redux/features/bankDeposite/bankDepositeSlice";
import { useAppSelector } from "../../redux/hook";
import CreateBankDepositoryModal from "./CreateBankDepositoryModal";

const BankDeposites = () => {
    const [searchValue, setSearchValue] = useState("");
    const [showclose, setShowClose] = useState(false);

    const dispatch = useDispatch();
    const { openCreateModal } = useAppSelector((state) => state.bankDeposite);

    useEffect(() => {
        if (searchValue) {
            setShowClose(true);
        } else {
            setShowClose(false);
        }
    }, [setShowClose, searchValue]);
    return (
        <div className="bg-white p-4 rounded-lg">
            <h1 className="font-medium text-lg mb-4">Bank Deposite</h1>
            <div className="flex justify-between flex-wrap sm:flex-nowrap gap-2">
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

                    <button className="bg-blue-500 hover:bg-blue-600 duration-300 cursor-pointer text-white py-2 px-3 rounded-lg text-sm">
                        Search
                    </button>
                </div>
                <button
                    onClick={() => dispatch(toggleCreateDepositeModal())}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center text-xs gap-1 cursor-pointer hover:bg-blue-600 duration-200"
                >
                    <FiPlus className="text-lg" />
                    New Deposite
                </button>
            </div>

            <div className="mt-10 overflow-x-auto text-nowrap">
                <table className="w-full border-collapse rounded-md text-gray-700">
                    <thead>
                        <tr className="bg-gray-200 text-left *:font-semibold text-sm">
                            <th className="p-3 w-[60px]">ID</th>
                            <th className="p-3">Transection Number</th>
                            <th className="p-3">Bank Name</th>
                            <th className="p-3">Account Number</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Reason</th>
                            <th className="p-3">Date</th>
                            <th className="p-3 w-[200px]">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-300 hover:bg-gray-50 text-sm">
                            <td className="p-3">1</td>
                            <td className="p-3">ALGHJBLIJDLKJGLKJ</td>
                            <td className="p-3">South East Bank ltd</td>
                            <td className="p-3">5130480069522861</td>
                            <td className="p-3">10000</td>
                            <td className="p-3">Personal use</td>
                            <td className="p-3">20/6/25</td>
                            <td className="flex items-center gap-1 p-3">
                                <button className="flex gap-0.5 items-center py-1.5 px-3 bg-blue-500 text-white rounded-sm text-xs cursor-pointer shrink-0">
                                    <MdOutlineModeEdit className="" />{" "}
                                    <span>Edit</span>
                                </button>
                                <button
                                    type="button"
                                    className="bg-red-400 text-white p-1.5 rounded-sm cursor-pointer shrink-0"
                                >
                                    <FiTrash className="text-md" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {openCreateModal && <CreateBankDepositoryModal />}
        </div>
    );
};

export default BankDeposites;
