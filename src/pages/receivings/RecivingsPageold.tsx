import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { TfiPlus } from "react-icons/tfi";
import InlineEditor from "./InlineEditor";

const RecivingsPage = () => {
    const [discount, setDiscount] = useState<string>("0");
    const [quantity, setQuantity] = useState<string>("0");
    const [cost, setCost] = useState<string>("0");

    return (
        <div className="">
            <div className="flex flex-wrap lg:flex-nowrap items-start gap-4">
                <div className="w-full">
                    <div className="p-4 bg-white rounded-md">
                        <div className="flex items-center gap-2 border border-gray-300 rounded-md">
                            <div className="bg-primary p-3 rounded-md">
                                <FaEdit className=" text-white" />
                            </div>
                            <input
                                type="text"
                                className=" outline-0 w-full"
                                placeholder="Enter item name or scan barcode"
                            />
                        </div>
                    </div>
                    <div className="mt-3 overflow-x-auto text-nowrap bg-white rounded-md py-5">
                        <table className="w-full border-collapse rounded-md text-gray-700">
                            <thead>
                                <tr className=" text-left *:font-semibold text-sm border-b border-gray-300">
                                    <th className="py-3 px-4">~</th>
                                    <th className="p-3">Item Name</th>
                                    <th className="p-3">Cost</th>
                                    <th className="p-3">Qty</th>
                                    <th className="p-3">Disc %</th>
                                    <th className="p-3">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-300 last:border-none hover:bg-gray-50 text-sm align-top">
                                    <td className="p-3">
                                        <IoIosCloseCircle className="text-red-400 text-lg" />
                                    </td>
                                    <td className="p-3">
                                        Shakil Bhai (item)
                                        <ul className="mt-5 px-4 text-gray-600">
                                            <li className="flex justify-between">
                                                <span>Barcode</span>
                                                <span className="border-b border-dashed">
                                                    Empty
                                                </span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Stock</span>
                                                <span className="border-b border-dashed">
                                                    1
                                                </span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Selling Price</span>
                                                <span className="border-b border-dashed">
                                                    45.00
                                                </span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Vaient</span>
                                                <span className="border-b">
                                                    None
                                                </span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Description</span>
                                                <span className="border-b">
                                                    None
                                                </span>
                                            </li>
                                        </ul>
                                    </td>
                                    <td className="p-3">
                                        <InlineEditor
                                            label="cost"
                                            value={cost}
                                            onChange={(val) => setCost(val)}
                                            inputType="number"
                                        />
                                    </td>
                                    <td className="p-3">
                                        <InlineEditor
                                            label="Quantity"
                                            value={quantity}
                                            onChange={(val) => setQuantity(val)}
                                            inputType="number"
                                        />
                                    </td>
                                    <td className="p-3">
                                        <InlineEditor
                                            label="Discount %"
                                            value={discount}
                                            onChange={(val) => setDiscount(val)}
                                            inputType="number"
                                            suffix="%"
                                        />
                                    </td>
                                    <td className="p-3">200</td>
                                </tr>
                                <tr className="border-b border-gray-300 last:border-none hover:bg-gray-50 text-sm align-top">
                                    <td className="p-3">
                                        <IoIosCloseCircle className="text-red-400 text-lg" />
                                    </td>
                                    <td className="p-3">
                                        Shakil Bhai (item)
                                        <ul className="mt-5 px-4 text-gray-600">
                                            <li className="flex justify-between">
                                                <span>Barcode</span>
                                                <span className="border-b border-dashed">
                                                    Empty
                                                </span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Stock</span>
                                                <span className="border-b border-dashed">
                                                    1
                                                </span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Selling Price</span>
                                                <span className="border-b border-dashed">
                                                    45.00
                                                </span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Vaient</span>
                                                <span className="border-b">
                                                    None
                                                </span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Description</span>
                                                <span className="border-b">
                                                    None
                                                </span>
                                            </li>
                                        </ul>
                                    </td>
                                    <td className="p-3">
                                        <InlineEditor
                                            label="cost"
                                            value={cost}
                                            onChange={(val) => setCost(val)}
                                            inputType="number"
                                        />
                                    </td>
                                    <td className="p-3">
                                        <InlineEditor
                                            label="Quantity"
                                            value={quantity}
                                            onChange={(val) => setQuantity(val)}
                                            inputType="number"
                                        />
                                    </td>
                                    <td className="p-3">
                                        <InlineEditor
                                            label="Discount %"
                                            value={discount}
                                            onChange={(val) => setDiscount(val)}
                                            inputType="number"
                                            suffix="%"
                                        />
                                    </td>
                                    <td className="p-3">200</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="w-full lg:w-2/5 rounded-md">
                    <div className="bg-white p-4 rounded-md">
                        <div>
                            <div className="border border-gray-300 flex rounded-md">
                                <div className="p-3 bg-primary rounded-md">
                                    <TfiPlus className="text-white" />
                                </div>
                                <input
                                    className="px-4 outline-0 w-full"
                                    type="text"
                                    placeholder="Type Supplier Name"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 bg-white rounded-md py-5">
                        <ul className="p-4 space-y-2">
                            <li className="flex justify-between text-sm">
                                <span>Discount all Items by Percent:</span>
                                <span className="border-b border-dashed text-red-400">
                                    Set Discount
                                </span>
                            </li>
                            <li className="flex justify-between text-sm">
                                <span>Discount all Items by Percent:</span>
                                <span className="border-b border-dashed text-red-400">
                                    Set Discount
                                </span>
                            </li>
                        </ul>
                        <div className="flex justify-between bg-red-100 p-4">
                            <p>Sub Total</p>
                            <p>৳ 0.00</p>
                        </div>
                        <div className="flex w-full border-y border-dashed border-gray-400">
                            <div className="w-1/2 p-4 border-r border-gray-400 border-dashed">
                                <p>Total</p>
                                <p>৳ 0.00</p>
                            </div>
                            <div className="w-1/2 p-4 border-dashed border-gray-400">
                                <p>Amount Due</p>
                                <p>৳ 0.00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecivingsPage;
