import type { FC } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import Breadcrumb from "./Breadcrumb";
import ProfileModal from "./ProfileModal";

type NavbarProps = {
  openSidebar: (value: boolean) => void;
};
const Navbar: FC<NavbarProps> = ({ openSidebar }) => {
  const theme = "light";

  const handleSidebarToggle = () => {
    openSidebar(true);
  };
  return (
    <div className="h-18 flex gap-4 justify-between px-4 bg-white items-center">
      <button
        type="button"
        className="cursor-pointer lg:hidden"
        onClick={handleSidebarToggle}
      >
        <GiHamburgerMenu className="text-2xl" />
      </button>
      <Breadcrumb />
      <div className="flex justify-end p-2">
        <button className="cursor-pointer">
          {theme === "light" ? (
            <MdOutlineLightMode className="size-6 text-[#1a1a1a]" />
          ) : (
            <MdOutlineDarkMode className="size-6 text-white" />
          )}
        </button>
      </div>
      <ProfileModal />
    </div>
  );
};

export default Navbar;
