import { useRef } from "react";
import { IoClose } from "react-icons/io5";
import useOutsideClick from "../hooks/useOutsideClick";
import type { ISupplier } from "../redux/features/suppliers/supplierSlice";

interface SupplierDetailsModalProps {
    Supplier: ISupplier;
    toggleSupplierDetails: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
}

const SupplierDetailsModal: React.FC<SupplierDetailsModalProps> = ({
    Supplier,
    toggleSupplierDetails,
    title,
}) => {
    const formRef = useRef<HTMLDivElement>(null);

    useOutsideClick(formRef, () => {
        toggleSupplierDetails(false);
    });
    return (
        <div className="overflow-y-auto fixed top-0 left-0 w-full h-screen bg-black/20 flex justify-center items-start z-[999] p-4">
            <div
                className="bg-white dark:bg-stone-600 rounded-lg p-6 w-full max-w-[650px] mt-20"
                ref={formRef}
            >
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium dark:text-gray-200">
                        {title}
                    </h2>
                    <button
                        onClick={() => toggleSupplierDetails(false)} // close modal
                        type="button"
                        className="text-gray-500 dark:text-gray-300 dark:hover:text-gray-400 hover:text-gray-700 cursor-pointer"
                    >
                        <IoClose />
                    </button>
                </div>
                <hr className="mt-2 mb-5 dark:text-gray-400" />

                {/* <ul className="space-y-2 border">
                    {Supplier &&
                        Object.entries(Supplier)
                            .filter(([key]) => key !== "id")
                            .map(([key, value]) => (
                                <li
                                    key={key}
                                    className="flex justify-between text-sm"
                                >
                                    <span className="font-medium capitalize">
                                        {key.replace(/_/g, " ")}:
                                    </span>
                                    <span className="text-gray-700">
                                        {typeof value === "object"
                                            ? JSON.stringify(value)
                                            : String(value)}
                                    </span>
                                </li>
                            ))}
                </ul> */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full border border-gray-300">
                        <tbody>
                            {Supplier &&
                                Object.entries(Supplier)
                                    .filter(
                                        ([key]) =>
                                            key !== "id" && key !== "isDeleted"
                                    )
                                    .map(([key, value]) => (
                                        <tr
                                            key={key}
                                            className="border-b border-gray-300"
                                        >
                                            <th className="text-left p-2 border-r border-gray-300 capitalize font-medium bg-gray-100 dark:bg-stone-500 dark:text-gray-300">
                                                {key.replace(/_/g, " ")}
                                            </th>
                                            <td className="p-2 text-gray-700 dark:text-gray-300 dark:bg-stone-700">
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

export default SupplierDetailsModal;
