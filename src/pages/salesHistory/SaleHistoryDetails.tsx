import { useRef } from "react";
import { IoClose } from "react-icons/io5";
import useOutsideClick from "../../hooks/useOutsideClick";
import type { ISaleHistory } from "../../redux/features/salesHistory/saleHistorySlice";

interface SupplierDetailsModalProps {
    saleHistoryDetails: ISaleHistory;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
}

const SaleHistoryDetails: React.FC<SupplierDetailsModalProps> = ({
    saleHistoryDetails,
    setShowModal,
    title,
}) => {
    console.log(saleHistoryDetails);
    const formRef = useRef<HTMLDivElement>(null);

    useOutsideClick(formRef, () => {
        setShowModal(false);
    });
    return (
        <div className="overflow-y-auto fixed top-0 left-0 w-full h-screen bg-black/20 flex justify-center items-start z-[999] p-4">
            <div
                className="bg-white rounded-lg p-6 w-full max-w-[650px] mt-20"
                ref={formRef}
            >
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium">{title}</h2>
                    <button
                        onClick={() => setShowModal(false)} // close modal
                        type="button"
                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                        <IoClose />
                    </button>
                </div>
                <hr className="mt-2 mb-5" />

                <div className="w-full overflow-x-auto">
                    <table className="w-full border border-gray-300">
                        <tbody>
                            {saleHistoryDetails &&
                                Object.entries(saleHistoryDetails)
                                    .filter(
                                        ([key]) =>
                                            key !== "id" &&
                                            key !== "isDeleted" &&
                                            key !== "status"
                                    )
                                    .map(([key, value]) => (
                                        <tr
                                            key={key}
                                            className="border-b border-gray-300"
                                        >
                                            <th className="text-left p-2 border-r border-gray-300 capitalize font-medium bg-gray-100">
                                                {key.replace(/_/g, " ")}
                                            </th>
                                            <td className="p-2 text-gray-700">
                                                {typeof value === "object"
                                                    ? JSON.stringify(value)
                                                    : String(value)}
                                            </td>
                                        </tr>
                                    ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SaleHistoryDetails;
