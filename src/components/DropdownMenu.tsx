import React from "react";
import { createPortal } from "react-dom";

const DropdownMenu = ({
    anchorRef,
    open,
    children,
}: {
    anchorRef: React.RefObject<HTMLDivElement | null>;
    open: boolean;
    children: React.ReactNode;
}) => {
    if (!open || !anchorRef.current) return null;
    const rect = anchorRef.current.getBoundingClientRect();

    return createPortal(
        <div
            className="fixed bg-white shadow-lg w-[200px] border border-gray-200 flex flex-col *:border-b *:border-gray-200 *:text-left *:last:border-transparent *:hover:bg-gray-50 *:cursor-pointer *:text-sm *:text-gray-700"
            style={{
                top: rect.bottom + 8,
                left: rect.left,
                zIndex: 9999,
            }}
        >
            {children}
        </div>,
        document.body
    );
};

export default DropdownMenu;
