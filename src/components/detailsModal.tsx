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
        <div className="fixed top-0 left-0 w-full h-screen bg-black/20 flex justify-center items-start z-[999] p-4">
            <div
                className="bg-white rounded-lg p-6 w-full max-w-[650px] mt-20"
                ref={formRef}
            >
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium">{title}</h2>
                    <button
                        onClick={() => toggleSupplierDetails(false)} // close modal
                        type="button"
                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                        <IoClose />
                    </button>
                </div>
                <hr className="mt-2 mb-5" />

                <ul className="space-y-2">
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
                </ul>
            </div>
        </div>
    );
};

export default SupplierDetailsModal;
