import {
    useEffect,
    useRef,
    useState,
    type CSSProperties,
    type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import useOutsideClick from "../hooks/useOutsideClick";

const DROPDOWN_HEIGHT = 70; // estimated; can be improved with dynamic size

const DropdownMenuList = ({
    anchorEl,
    open,
    children,
    onclose,
}: {
    anchorEl: HTMLDivElement | null;
    open: boolean;
    children: ReactNode;
    onclose: () => void;
}) => {
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [position, setPosition] = useState<CSSProperties>({
        top: 0,
        left: 0,
    });

    useOutsideClick(dropdownRef, onclose);

    const updatePosition = () => {
        if (!anchorEl) return;
        const rect = anchorEl.getBoundingClientRect();

        const margin = 8;
        const left = rect.right;
        let top = rect.bottom + margin;

        // Adjust if dropdown overflows right edge
        // if (left + DROPDOWN_WIDTH > window.innerWidth) {
        //     left = window.innerWidth - DROPDOWN_WIDTH - margin;
        // }

        // Adjust if dropdown overflows bottom edge (drop upward)
        if (top + DROPDOWN_HEIGHT > window.innerHeight) {
            top = rect.top - DROPDOWN_HEIGHT - margin;
        }

        setPosition({ top, left });
    };

    useEffect(() => {
        if (!open || !anchorEl) return;

        updatePosition();

        const handleScroll = () => updatePosition();
        const handleResize = () => updatePosition();

        window.addEventListener("scroll", handleScroll, true);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", handleScroll, true);
            window.removeEventListener("resize", handleResize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, anchorEl]);

    if (!open || !anchorEl) return null;

    return createPortal(
        <div
            ref={dropdownRef}
            className="fixed bg-white shadow-lg w-[200px] border border-gray-200 z-50 flex flex-col *:border-b *:border-gray-200 *:text-left *:last:border-transparent *:hover:bg-gray-50 *:cursor-pointer *:text-sm *:text-gray-700 -translate-x-full"
            style={{
                top: position.top,
                left: position.left,
            }}
        >
            {children}
        </div>,
        document.body
    );
};

export default DropdownMenuList;
