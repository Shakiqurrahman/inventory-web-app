import type { FC } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Breadcrumb from "./Breadcrumb";
import ProfileModal from "./ProfileModal";

type NavbarProps = {
  openSidebar: (value: boolean) => void;
};
const Navbar: FC<NavbarProps> = ({ openSidebar }) => {
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
      <ProfileModal />
    </div>
  );
};

export default Navbar;
