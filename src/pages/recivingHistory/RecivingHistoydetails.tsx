import { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import useOutsideClick from "../../hooks/useOutsideClick";
import type { ISaleHistory } from "../../redux/features/salesHistory/saleHistorySlice";

interface SupplierDetailsModalProps {
    saleHistoryDetails: ISaleHistory;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
}

const RecivingHistoydetails: React.FC<SupplierDetailsModalProps> = ({
    saleHistoryDetails,
    setShowModal,
    title,
}) => {
    const formRef = useRef<HTMLDivElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editableData, setEditableData] = useState({ ...saleHistoryDetails });

    useOutsideClick(formRef, () => {
        setShowModal(false);
    });

    const handleChange = (key: string, value: string) => {
        setEditableData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSave = () => {
        console.log("Updated data:", editableData);
        setIsEditing(false);
        // Optional: send updated data to backend
    };

    return (
        <div className="overflow-y-auto fixed top-0 left-0 w-full h-screen bg-black/20 flex justify-center items-start z-[999] p-4">
            <div
                className="bg-white rounded-lg p-6 w-full max-w-[650px] mt-20 relative"
                ref={formRef}
            >
                <button
                    onClick={() => setShowModal(false)}
                    type="button"
                    className="text-gray-500 hover:text-gray-700 text-lg absolute top-0 right-0 p-4"
                >
                    <IoClose />
                </button>
                <div className="flex items-center justify-between my-5">
                    <h2 className="text-lg font-medium">{title}</h2>
                    <div className="flex items-center gap-2">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="text-white py-1 px-4 rounded-md text-sm bg-blue-500 hover:bg-blue-600 duration-300 cursor-pointer"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="text-white py-1 px-4 rounded-md text-sm bg-red-500 hover:bg-red-600 duration-300 cursor-pointer"
                                >
                                    cancel
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="text-white py-1 px-4 rounded-md text-sm bg-blue-500 hover:bg-blue-600 duration-300 cursor-pointer"
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </div>
                <hr className="mb-5" />

                <div className="w-full overflow-x-auto">
                    <table className="w-full border border-gray-300 text-sm">
                        <tbody>
                            {Object.entries(editableData)
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
                                        <th className="text-left p-2 border-r border-gray-300 capitalize font-medium bg-gray-100 whitespace-nowrap">
                                            {key.replace(/_/g, " ")}
                                        </th>
                                        <td className="p-2 text-gray-700">
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={String(value)}
                                                    onChange={(e) =>
                                                        handleChange(
                                                            key,
                                                            e.target.value
                                                        )
                                                    }
                                                    className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
                                                />
                                            ) : (
                                                <span>{String(value)}</span>
                                            )}
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

export default RecivingHistoydetails;
