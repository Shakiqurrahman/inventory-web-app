import { useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import useOutsideClick from "../../hooks/useOutsideClick";
import {
    toggleReturnModal,
    type ISaleHistory,
} from "../../redux/features/salesHistory/saleHistorySlice";

interface ReturnSaleModalProps {
    selectedSale: ISaleHistory;
}

const ReturnSaleModal: React.FC<ReturnSaleModalProps> = ({ selectedSale }) => {
    const salevarient = selectedSale?.saleVariant;
    console.log(salevarient);
    const formRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    useOutsideClick(formRef, () => {
        dispatch(toggleReturnModal());
    });

    return (
        <div className="overflow-y-auto fixed top-0 left-0 w-full h-screen bg-black/20 flex justify-center items-start z-[999] p-4">
            <div
                ref={formRef}
                className="bg-white rounded-lg p-6 w-full max-w-[650px] mt-20 relative"
            >
                <h3 className="mb-5 text-lg font-medium">Return item</h3>
                <button
                    type="button"
                    className="absolute top-0 right-0 p-4"
                    onClick={() => dispatch(toggleReturnModal())}
                >
                    <RxCross2 />
                </button>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse rounded-md text-gray-700">
                        <thead>
                            <tr className="bg-gray-100 border-t border-b border-gray-200 border *:font-semibold text-sm">
                                <th className="p-3">~</th>
                                <th className="p-3">Item Name</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Quantity</th>
                                <th className="p-3">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salevarient.map((value, index) => (
                                <tr
                                    key={index}
                                    className="text-center border-t border-b border-gray-200 border"
                                >
                                    <td className="p-3 cursor-pointer">
                                        <RxCross2 className="text-lg text-red-500 bg:text-red-600  rounded-full size-4 mx-auto" />
                                    </td>
                                    <td className="p-3">
                                        {value?.variant.name}
                                    </td>
                                    <td className="p-3">{value.price}</td>
                                    <td className="p-3 flex items-center gap-3 justify-center">
                                        <button className="p-1 px-2 text-sm border border-gray-200 cursor-pointer">
                                            -
                                        </button>
                                        {value.quantity}
                                        <button className="p-1 px-2 text-sm border border-gray-200 cursor-pointer">
                                            +
                                        </button>
                                    </td>
                                    <td className="p-3">{value.subTotal}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-5 w-full">
                    <div className="text-sm flex gap-1 items-center">
                        <label
                            className="shrink-0 w-[120px] text-right"
                            htmlFor=""
                        >
                            Return Amount:
                        </label>
                        <input
                            type="text"
                            className="outline-none rounded-md border border-gray-300 p-2 w-full"
                        />
                    </div>
                    <div className="text-sm flex gap-1 items-center mt-4">
                        <label
                            className="shrink-0 w-[120px] text-right"
                            htmlFor=""
                        >
                            Reason:
                        </label>
                        <textarea className="outline-none rounded-md border border-gray-300 p-2 w-full resize-none"></textarea>
                    </div>
                    <div className="flex justify-end">
                        <button className="mt-4 text-sm bg-blue-500 hover:bg-blue-600 duration-300 p-2 px-4 rounded-md text-white">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReturnSaleModal;
