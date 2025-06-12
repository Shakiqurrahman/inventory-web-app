import { useRef, useState, type FC } from "react";
import toast from "react-hot-toast";
import { BsToggles } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { MdCallReceived, MdOutlinePowerSettingsNew } from "react-icons/md";
import { RiBankFill } from "react-icons/ri";
import { TbHistory } from "react-icons/tb";
import {
    TfiBarChart,
    TfiCloudDown,
    TfiDashboard,
    TfiDownload,
    TfiFolder,
    TfiHarddrive,
    TfiIdBadge,
    TfiMoney,
    TfiReceipt,
    TfiShoppingCart,
    TfiUser,
} from "react-icons/tfi";
import { NavLink, useLocation, useNavigate } from "react-router";
import Logo from "../../assets/logo/logo.png";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useLogoutMutation } from "../../redux/features/auth/authApi";
import { logoutUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hook";

type SidebarProps = {
    open: boolean;
    close: (value: boolean) => void;
};

const Sidebar: FC<SidebarProps> = ({ open, close }) => {
    const location = useLocation();
    const isActiveInventory =
        location.pathname.startsWith("/items") ||
        location.pathname.startsWith("/categories") ||
        location.pathname.startsWith("/attributes");

    const isActiveInvoices =
        location.pathname.startsWith("/orders") ||
        location.pathname.startsWith("/invoices");

    const sidebarRef = useRef<HTMLDivElement | null>(null);
    const inventoryRef = useRef<HTMLUListElement | null>(null);
    const invoicesRef = useRef<HTMLUListElement | null>(null);

    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [logoutApi] = useLogoutMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleMenuClick = (menu: string) => {
        setOpenMenu((prev) => (prev === menu ? null : menu));
    };

    const handleClose = () => {
        close(false);
    };

    const handleLogout = async () => {
        await logoutApi(null).unwrap();
        dispatch(logoutUser());
        toast.success("Logout successfully");
        navigate("/login");
    };

    useOutsideClick(sidebarRef, handleClose);
    return (
        <div
            className={`shrink-0 w-full lg:w-[220px] h-full fixed lg:relative top-0 left-0 z-[999] bg-black/30 ${
                open
                    ? "visible opacity-100"
                    : "invisible opacity-0 lg:visible lg:opacity-100"
            }`}
        >
            <div
                ref={sidebarRef}
                className={`h-full w-[220px] bg-white duration-300 lg:duration-[0ms] ease-in-out ${
                    open ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 transition-transform`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-center h-18 bg-gray-800 text-white shrink-0">
                        <img src={Logo} alt="Brand Logo" className="w-10" />
                    </div>
                    <nav className="flex-1 py-4 overflow-y-auto select-none">
                        <ul>
                            <li>
                                <NavLink
                                    to={`/`}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 text-gray-700 hover:bg-gray-200 border-l-4 ${
                                            isActive
                                                ? "border-primary"
                                                : "hover:border-primary border-transparent"
                                        } text-sm`
                                    }
                                >
                                    <TfiDashboard className="text-lg" />
                                    Dashboard
                                </NavLink>
                            </li>
                            <li
                                onClick={() => handleMenuClick("inventory")}
                                className={`border-l-4 overflow-hidden ${
                                    isActiveInventory ||
                                    openMenu === "inventory"
                                        ? "border-primary"
                                        : "hover:border-primary border-transparent"
                                } text-sm cursor-pointer`}
                            >
                                <div
                                    className={`flex items-center gap-2 p-3 text-gray-700 hover:bg-gray-200 ${
                                        isActiveInventory ||
                                        openMenu === "inventory"
                                            ? "bg-gray-200"
                                            : ""
                                    }`}
                                >
                                    <TfiHarddrive className="text-lg" />
                                    Inventory{" "}
                                    <IoIosArrowDown
                                        className={`ml-auto text-lg duration-300 ${
                                            openMenu === "inventory"
                                                ? "rotate-180"
                                                : "rotate-0"
                                        }`}
                                    />
                                </div>
                                <ul
                                    className="pl-4 bg-gray-200 duration-300"
                                    ref={inventoryRef}
                                    style={{
                                        height:
                                            openMenu === "inventory"
                                                ? inventoryRef.current
                                                      ?.scrollHeight + "px"
                                                : 0,
                                    }}
                                >
                                    <li>
                                        <NavLink
                                            to={`/items`}
                                            className={({ isActive }) =>
                                                `flex items-center gap-2 p-3 ${
                                                    isActive
                                                        ? "text-secondary"
                                                        : "text-gray-700 hover:text-secondary"
                                                } text-sm`
                                            }
                                        >
                                            <TfiHarddrive className="text-lg" />
                                            Items
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to={`/categories`}
                                            className={({ isActive }) =>
                                                `flex items-center gap-2 p-3 ${
                                                    isActive
                                                        ? "text-secondary"
                                                        : "text-gray-700 hover:text-secondary"
                                                } text-sm`
                                            }
                                        >
                                            <TfiFolder className="text-lg" />
                                            Categories
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to={`/attributes`}
                                            className={({ isActive }) =>
                                                `flex items-center gap-2 p-3 ${
                                                    isActive
                                                        ? "text-secondary"
                                                        : "text-gray-700 hover:text-secondary"
                                                } text-sm`
                                            }
                                        >
                                            <BsToggles className="text-lg" />
                                            Attributes
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <NavLink
                                    to={`/customers`}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 text-gray-700 hover:bg-gray-200 border-l-4 ${
                                            isActive
                                                ? "border-primary"
                                                : "hover:border-primary border-transparent"
                                        } text-sm`
                                    }
                                >
                                    <TfiUser className="text-lg" />
                                    Customers
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={`/suppliers`}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 text-gray-700 hover:bg-gray-200 border-l-4 ${
                                            isActive
                                                ? "border-primary"
                                                : "hover:border-primary border-transparent"
                                        } text-sm`
                                    }
                                >
                                    <TfiDownload className="text-lg" />
                                    Suppliers
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={`/reports`}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 text-gray-700 hover:bg-gray-200 border-l-4 ${
                                            isActive
                                                ? "border-primary"
                                                : "hover:border-primary border-transparent"
                                        } text-sm`
                                    }
                                >
                                    <TfiBarChart className="text-lg" />
                                    Reports
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={`/receiving`}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 text-gray-700 hover:bg-gray-200 border-l-4 ${
                                            isActive
                                                ? "border-primary"
                                                : "hover:border-primary border-transparent"
                                        } text-sm`
                                    }
                                >
                                    <TfiCloudDown className="text-lg" />
                                    Receiving
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={`/sales`}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 text-gray-700 hover:bg-gray-200 border-l-4 ${
                                            isActive
                                                ? "border-primary"
                                                : "hover:border-primary border-transparent"
                                        } text-sm`
                                    }
                                >
                                    <TfiShoppingCart className="text-lg" />
                                    Sales
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={`/sales-history`}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 text-gray-700 hover:bg-gray-200 border-l-4 ${
                                            isActive
                                                ? "border-primary"
                                                : "hover:border-primary border-transparent"
                                        } text-sm`
                                    }
                                >
                                    <TbHistory className="text-lg" />
                                    Sales History
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={`/receiving-history`}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 text-gray-700 hover:bg-gray-200 border-l-4 ${
                                            isActive
                                                ? "border-primary"
                                                : "hover:border-primary border-transparent"
                                        } text-sm`
                                    }
                                >
                                    <MdCallReceived className="text-lg" />
                                    Receiving History
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={`/expenses`}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 text-gray-700 hover:bg-gray-200 border-l-4 ${
                                            isActive
                                                ? "border-primary"
                                                : "hover:border-primary border-transparent"
                                        } text-sm`
                                    }
                                >
                                    <TfiMoney className="text-lg" />
                                    Expenses
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={`/bank-deposit`}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 text-gray-700 hover:bg-gray-200 border-l-4 ${
                                            isActive
                                                ? "border-primary"
                                                : "hover:border-primary border-transparent"
                                        } text-sm`
                                    }
                                >
                                    <RiBankFill className="text-lg" />
                                    Bank Deposit
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={`/employees`}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 text-gray-700 hover:bg-gray-200 border-l-4 ${
                                            isActive
                                                ? "border-primary"
                                                : "hover:border-primary border-transparent"
                                        } text-sm`
                                    }
                                >
                                    <TfiIdBadge className="text-lg" />
                                    Employees
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={`/store-config`}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 text-gray-700 hover:bg-gray-200 border-l-4 ${
                                            isActive
                                                ? "border-primary"
                                                : "hover:border-primary border-transparent"
                                        } text-sm`
                                    }
                                >
                                    <IoSettingsOutline className="text-lg" />
                                    Store Config
                                </NavLink>
                            </li>
                            <li
                                onClick={() => handleMenuClick("invoices")}
                                className={`border-l-4 overflow-hidden ${
                                    isActiveInvoices || openMenu === "invoices"
                                        ? "border-primary"
                                        : "hover:border-primary border-transparent"
                                } text-sm cursor-pointer`}
                            >
                                <div
                                    className={`flex items-center gap-2 p-3 text-gray-700 hover:bg-gray-200 ${
                                        isActiveInvoices ||
                                        openMenu === "invoices"
                                            ? "bg-gray-200"
                                            : ""
                                    }`}
                                >
                                    <TfiReceipt className="text-lg" />
                                    Invoices{" "}
                                    <IoIosArrowDown
                                        className={`ml-auto text-lg duration-300 ${
                                            openMenu === "invoices"
                                                ? "rotate-180"
                                                : "rotate-0"
                                        }`}
                                    />
                                </div>
                                <ul
                                    className="pl-4 bg-gray-200 duration-300"
                                    ref={invoicesRef}
                                    style={{
                                        height:
                                            openMenu === "invoices"
                                                ? invoicesRef.current
                                                      ?.scrollHeight + "px"
                                                : 0,
                                    }}
                                >
                                    <li>
                                        <NavLink
                                            to={`/items`}
                                            className={({ isActive }) =>
                                                `flex items-center gap-2 p-3 ${
                                                    isActive
                                                        ? "text-secondary"
                                                        : "text-gray-700 hover:text-secondary"
                                                } text-sm`
                                            }
                                        >
                                            <TfiUser className="text-lg" />
                                            Customers
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to={`/categories`}
                                            className={({ isActive }) =>
                                                `flex items-center gap-2 p-3 ${
                                                    isActive
                                                        ? "text-secondary"
                                                        : "text-gray-700 hover:text-secondary"
                                                } text-sm`
                                            }
                                        >
                                            <TfiDownload className="text-lg" />
                                            Suppliers
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 p-3 text-gray-700 hover:bg-gray-200 border-l-4 border-transparent hover:border-red-700 text-sm w-full"
                                >
                                    <MdOutlinePowerSettingsNew className="text-lg" />
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
