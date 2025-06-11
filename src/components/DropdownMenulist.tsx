import { useRef } from "react";
import { createPortal } from "react-dom";
import useOutsideClick from "../hooks/useOutsideClick";

const DropdownMenuList = ({
    anchorEl,
    open,
    children,
    onclose,
}: {
    anchorEl: HTMLDivElement | null;
    open: boolean;
    children: React.ReactNode;
    onclose: () => void;
}) => {
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useOutsideClick(dropdownRef, () => onclose());

    if (!open || !anchorEl) return null;
    const rect = anchorEl.getBoundingClientRect();

    return createPortal(
        <div
            ref={dropdownRef}
            className="fixed bg-white shadow-lg w-[200px] border border-gray-200 flex flex-col *:border-b *:border-gray-200 *:text-left *:last:border-transparent *:hover:bg-gray-50 *:cursor-pointer *:text-sm *:text-gray-700 -translate-x-full"
            style={{
                top: rect.bottom + 8,
                left: rect.right,
                zIndex: 9999,
            }}
        >
            {children}
        </div>,
        document.body
    );
};

export default DropdownMenuList;
