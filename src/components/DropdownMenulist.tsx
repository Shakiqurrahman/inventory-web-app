import { createPortal } from "react-dom";

const DropdownMenuList = ({
    anchorEl,
    open,
    children,
}: {
    anchorEl: HTMLDivElement | null;
    open: boolean;
    children: React.ReactNode;
}) => {
    if (!open || !anchorEl) return null;
    const rect = anchorEl.getBoundingClientRect();

    return createPortal(
        <div
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
