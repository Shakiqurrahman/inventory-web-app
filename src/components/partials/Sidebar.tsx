import { useRef, type FC } from "react";
import Logo from "../../assets/logo/logo.png";
import useOutsideClick from "../../hooks/useOutsideClick";

type SidebarProps = {
  open: boolean;
  close: (value: boolean) => void;
};

const Sidebar: FC<SidebarProps> = ({ open, close }) => {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const handleClose = () => {
    close(false);
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
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul>
              <li className="mb-2">
                <a
                  href="#"
                  className="block p-2 text-gray-700 hover:bg-gray-200 rounded"
                >
                  Dashboard
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="block p-2 text-gray-700 hover:bg-gray-200 rounded"
                >
                  Settings
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="block p-2 text-gray-700 hover:bg-gray-200 rounded"
                >
                  Profile
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
