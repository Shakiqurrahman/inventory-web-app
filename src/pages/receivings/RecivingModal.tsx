import { useEffect, useRef, useState } from "react";

const RecivingModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [discount, setDiscount] = useState<string>("0");
    const [position, setPosition] = useState<"left" | "right">("right");
    const inputRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLSpanElement>(null);

    // Handle outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(e.target as Node) &&
                !triggerRef.current?.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle edge overflow
    useEffect(() => {
        if (isOpen && triggerRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const spaceRight = window.innerWidth - triggerRect.right;
            if (spaceRight < 200) {
                setPosition("left");
            } else {
                setPosition("right");
            }
        }
    }, [isOpen]);

    return (
        <div className="relative inline-block text-left">
            <span
                ref={triggerRef}
                className="text-blue-600 underline cursor-pointer"
                onClick={() => setIsOpen(true)}
            >
                {discount}%
            </span>

            {isOpen && (
                <div
                    ref={inputRef}
                    className={`absolute top-full mt-2 w-48 bg-white border shadow-lg rounded-md p-3 z-50 ${
                        position === "left" ? "right-0" : "left-0"
                    }`}
                >
                    <label className="text-sm text-gray-700 mb-1 block">
                        Disc %
                    </label>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                            className="w-full border px-2 py-1 rounded focus:outline-none focus:ring-1 ring-blue-400"
                        />
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-green-600 hover:text-green-800"
                        >
                            ✔
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-red-600 hover:text-red-800"
                        >
                            ✖
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecivingModal;
