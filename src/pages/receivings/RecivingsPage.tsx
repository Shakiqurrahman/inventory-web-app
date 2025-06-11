import { Fragment, useState, type ChangeEvent } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { IoIosCloseCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router";
import InlineEditor from "./InlineEditor";

const RecivingsPage = () => {
    const [hideDetails, setHideDetails] = useState(false);
    const [searchItemValue, setSearchItemValue] = useState("");
    const [selectedPaymentType, setSelectedPaymentType] = useState("Cash");

    const [isChecked, setIsChecked] = useState(false);

    const [discount, setDiscount] = useState<string>("0");
    const [discount2, setDiscount2] = useState<string>("Set Discount");
    const [entireDiscount, setEntireDiscount] =
        useState<string>("Set Discount");
    const [quantity, setQuantity] = useState<string>("0");
    const [cost, setCost] = useState<string>("0");

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setIsChecked(event.target.checked);
    };

    const handleChangeSearchItem = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchItemValue(e.target.value);
    };
    return (
        <div className="flex flex-wrap lg:flex-nowrap items-start gap-4">
            <div className="w-full">
                <div className="bg-white p-5 flex">
                    <Link
                        to={"/items/new-item"}
                        className="shrink-0 p-3 bg-primary hover:bg-secondary text-white"
                    >
                        <FiEdit className="text-xl" />
                    </Link>
                    <input
                        type="text"
                        value={searchItemValue}
                        onChange={handleChangeSearchItem}
                        placeholder="Enter item name or scan barcode"
                        className="w-full p-3 outline-none text-sm border border-gray-200 block"
                    />
                </div>
                <div className="bg-white pt-2 pb-10 mt-4 paper-cut relative">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse rounded-md text-gray-700">
                            <thead>
                                <tr className="bg-[#F9FBFC] border-t border-b border-gray-200 *:font-semibold text-sm">
                                    <th className="p-3 w-[100px]">
                                        <button
                                            type="button"
                                            className="text-blue-500 cursor-pointer"
                                            onClick={() =>
                                                setHideDetails((prev) => !prev)
                                            }
                                        >
                                            {!hideDetails ? (
                                                <FaMinus />
                                            ) : (
                                                <FaPlus />
                                            )}
                                        </button>
                                    </th>
                                    <th className="p-3">Item Name</th>
                                    <th className="p-3">Cost</th>
                                    <th className="p-3">Quantity</th>
                                    <th className="p-3">Discount</th>
                                    <th className="p-3">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2].map((_, i) => (
                                    <Fragment key={i}>
                                        <tr
                                            className={`${
                                                !hideDetails
                                                    ? ""
                                                    : "border-b border-gray-200"
                                            } hover:bg-gray-50 text-sm text-center`}
                                        >
                                            <td className="p-3">
                                                <button
                                                    type="button"
                                                    className="text-red-500 hover:text-red-600 cursor-pointer"
                                                >
                                                    <IoIosCloseCircle className="text-xl" />
                                                </button>
                                            </td>
                                            <td className="p-3 text-left">
                                                index + 1
                                            </td>
                                            <td className="p-3 flex items-center justify-center">
                                                <TbCurrencyTaka />
                                                <span className="border-b border-dotted">
                                                    <InlineEditor
                                                        label="cost"
                                                        value={cost}
                                                        onChange={(val) =>
                                                            setCost(val)
                                                        }
                                                        inputType="number"
                                                    />
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                <span className="border-b border-dotted">
                                                    <InlineEditor
                                                        label="quantity"
                                                        value={quantity}
                                                        onChange={(val) =>
                                                            setQuantity(val)
                                                        }
                                                        inputType="number"
                                                    />
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                <span className="border-b border-dotted">
                                                    <InlineEditor
                                                        label="Discount %"
                                                        value={discount}
                                                        onChange={(val) =>
                                                            setDiscount(val)
                                                        }
                                                        inputType="number"
                                                        suffix="%"
                                                    />
                                                </span>
                                            </td>
                                            <td className="p-3 flex gap-1">
                                                <TbCurrencyTaka />
                                                <span className="border-b border-dotted ">
                                                    10
                                                </span>
                                            </td>
                                        </tr>
                                        {!hideDetails && (
                                            <tr className="text-sm border-b border-gray-200 hover:bg-gray-50">
                                                <td></td>
                                                <td className="p-3 text-gray-500">
                                                    <ul className="text-[13px]">
                                                        <li className="flex items-center justify-between gap-2">
                                                            <span>Serial</span>
                                                            <span className="border-b border-dotted">
                                                                Empty
                                                            </span>
                                                        </li>
                                                        <li className="flex items-center justify-between gap-2">
                                                            <span>Stock</span>
                                                            <span>12</span>
                                                        </li>
                                                        <li className="flex items-center justify-between gap-2">
                                                            <span>
                                                                Selling Price
                                                            </span>
                                                            <span className="flex items-center justify-center">
                                                                <TbCurrencyTaka />{" "}
                                                                10.00
                                                            </span>
                                                        </li>
                                                        <li className="flex items-center justify-between gap-2">
                                                            <span>
                                                                Variation
                                                            </span>
                                                            <span>Size:XL</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td colSpan={5}></td>
                                            </tr>
                                        )}
                                    </Fragment>
                                ))}
                                <tr className="text-lg sm:text-2xl border-b border-gray-200 hover:bg-gray-50">
                                    <td
                                        colSpan={6}
                                        className="p-3 text-center text-[#EAC841]"
                                    >
                                        There are no items in the cart{" "}
                                        <span className="text-[#6FD686]">
                                            [Sales]
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-[500px] shrink-0">
                <div className="bg-white">
                    <h1 className="bg-primary text-white font-medium px-5 py-3">
                        Supplier
                    </h1>

                    <button className="text-gray-500 cursor-pointer flex gap-1 items-center mx-auto p-2 rounded-lg text-xs mb-2 mt-4 bg-red-100 border border-red-300">
                        <MdCancel /> Cancel Receiveing.
                    </button>

                    <div className="p-5">
                        <div className="flex items-center gap-2 border border-gray-300 rounded-md ">
                            <Link
                                to={"/suppliers/new-supplier"}
                                className="bg-primary text-white p-3"
                            >
                                <FaPlus />
                            </Link>
                            <input
                                className="border-0 outline-0 w-full text-sm"
                                type="text"
                                placeholder="Type Supplier's Name"
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-white mt-5 pb-10 paper-cut relative">
                    <div className="p-3">
                        <h1 className="text-gray-500">Order Information:</h1>
                        <div className="flex items-center justify-between gap-2 text-xs sm:text-sm mt-4">
                            <span className="text-gray-600">
                                Discount all Items by Percent:
                            </span>
                            <button
                                type="button"
                                className="text-red-800 font-light italic cursor-pointer"
                            >
                                <InlineEditor
                                    label="Set Discount"
                                    value={discount2}
                                    onChange={(val) => setDiscount2(val)}
                                    inputType="number"
                                    suffix="%"
                                />
                            </button>
                        </div>
                        <div className="flex items-center justify-between gap-2 text-xs sm:text-sm mt-2">
                            <span className="text-gray-600">
                                Discount Entire Receiving:
                            </span>
                            <button
                                type="button"
                                className="font-light italic border-b border-dashed flex items-center gap-1 cursor-pointer"
                            >
                                <InlineEditor
                                    label="Set Discount"
                                    value={entireDiscount}
                                    onChange={(val) => setEntireDiscount(val)}
                                    inputType="number"
                                />
                                <TbCurrencyTaka />
                            </button>
                        </div>
                    </div>
                    <div className="p-3 bg-[#F1FFEC] flex items-center justify-between gap-2">
                        <h1 className="text-gray-600 text-sm sm:text-base font-medium">
                            Sub Total:
                        </h1>
                        <button
                            type="button"
                            className="text-blue-500 border-b border-blue-500 border-dashed flex items-center text-sm cursor-pointer"
                        >
                            <TbCurrencyTaka />
                            0.00
                        </button>
                    </div>
                    <div className="border-t border-b border-gray-300 border-dashed flex">
                        <div className="w-1/2 text-center p-3 border-r border-gray-300 border-dashed">
                            <h1 className="text-base sm:text-lg font-medium mb-2 text-gray-600">
                                Total
                            </h1>
                            <span className="flex items-center text-green-500 justify-center text-lg sm:text-xl font-medium">
                                <TbCurrencyTaka />
                                0.00
                            </span>
                        </div>
                        <div className="w-1/2 text-center p-3">
                            <h1 className="text-base sm:text-lg font-medium mb-2 text-gray-600">
                                Amount Due
                            </h1>
                            <span className="flex items-center text-secondary justify-center text-lg sm:text-xl font-medium">
                                <TbCurrencyTaka />
                                0.00
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 justify-between p-3 text-sm border-b border-gray-300 border-dashed">
                        <button
                            type="button"
                            className="text-red-500 hover:text-red-600 cursor-pointer"
                        >
                            <IoIosCloseCircle className="text-lg" />
                        </button>
                        <span className="text-gray-600">Cash</span>
                        <span className="flex items-center justify-center ml-auto text-gray-600">
                            <TbCurrencyTaka />
                            0.00
                        </span>
                    </div>
                    <div className="p-3 border-b border-dashed border-gray-300">
                        <h1 className="text-sm font-medium text-gray-600">
                            Add payment
                        </h1>
                        <div className="flex gap-1 flex-wrap mt-2">
                            <button
                                type="button"
                                onClick={() => setSelectedPaymentType("Cash")}
                                className={`border text-xs px-4 py-2 cursor-pointer  font-medium ${
                                    selectedPaymentType === "Cash"
                                        ? "bg-primary text-white border-primary"
                                        : "bg-gray-50 border-gray-400 text-gray-600"
                                }`}
                            >
                                Cash
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedPaymentType("Card")}
                                className={`border text-xs px-4 py-2 cursor-pointer  font-medium ${
                                    selectedPaymentType === "Card"
                                        ? "bg-primary text-white border-primary"
                                        : "bg-gray-50 border-gray-400 text-gray-600"
                                }`}
                            >
                                Card
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedPaymentType("Check")}
                                className={`border text-xs px-4 py-2 cursor-pointer  font-medium ${
                                    selectedPaymentType === "Check"
                                        ? "bg-primary text-white border-primary"
                                        : "bg-gray-50 border-gray-400 text-gray-600"
                                }`}
                            >
                                Check
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedPaymentType("bKash")}
                                className={`border text-xs px-4 py-2 cursor-pointer  font-medium ${
                                    selectedPaymentType === "bKash"
                                        ? "bg-primary text-white border-primary"
                                        : "bg-gray-50 border-gray-400 text-gray-600"
                                }`}
                            >
                                bKash
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedPaymentType("Other")}
                                className={`border text-xs px-4 py-2 cursor-pointer  font-medium ${
                                    selectedPaymentType === "Other"
                                        ? "bg-primary text-white border-primary"
                                        : "bg-gray-50 border-gray-400 text-gray-600"
                                }`}
                            >
                                Other
                            </button>
                        </div>
                        <div className="flex mt-3">
                            <input
                                type="number"
                                placeholder={`Enter ${selectedPaymentType} Amount`}
                                className="border border-gray-200 p-2.5 outline-none text-sm w-full placeholder:text-xs"
                            />
                            <button
                                type="button"
                                className="text-white bg-primary px-4 py-2.5 hover:bg-secondary border border-primary hover:border-secondary cursor-pointer text-xs sm:text-sm shrink-0"
                            >
                                Finish
                            </button>
                        </div>
                    </div>

                    <div className="p-4">
                        <div className="flex items-center gap-2 select-none mt-3">
                            <input
                                type="checkbox"
                                name="showComment"
                                id="showComment"
                                className="scale-130"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            <label
                                htmlFor="showComment"
                                className="text-gray-500 text-xs w-full cursor-pointer"
                            >
                                Change receiving date
                            </label>
                        </div>
                        {isChecked && (
                            <input
                                className="border border-gray-300 mt-4 p-2 rounded-md text-sm text-gray-500"
                                type="date"
                            />
                        )}
                    </div>

                    <div className="p-3">
                        <textarea
                            name="comments"
                            className="border border-gray-200 p-2.5 placeholder:text-xs text-sm outline-none resize-none block w-full"
                            placeholder="Comments"
                        ></textarea>
                        <div className="flex items-center gap-2 select-none mt-3">
                            <input
                                type="checkbox"
                                name="showComment"
                                id="showComment"
                                className="scale-130"
                            />
                            <label
                                htmlFor="showComment"
                                className="text-gray-500 text-xs w-full cursor-pointer"
                            >
                                Show comments on receipt
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecivingsPage;
