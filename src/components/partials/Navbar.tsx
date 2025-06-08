import { useEffect, type FC } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useCurrentToken, type TUserData } from "../../redux/features/auth/authSlice";
import { toggleTheme } from "../../redux/features/theme/themeSlice";
import { useAppSelector } from "../../redux/hook";
import type { RootState } from "../../redux/store";
import { verifyToken } from "../../utils/verifyToken";
import Breadcrumb from "./Breadcrumb";
import ProfileModal from "./ProfileModal";

type NavbarProps = {
  openSidebar: (value: boolean) => void;
};
const Navbar: FC<NavbarProps> = ({ openSidebar }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.value);
  const token = useAppSelector(useCurrentToken);

  let user : TUserData | null = null;
  if (token) {
    user = verifyToken(token) as TUserData;
  }

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const handleSidebarToggle = () => {
    openSidebar(true);
  };
  return (
    <div className="h-18 flex gap-2 sm:gap-4 justify-between px-4 bg-white dark:bg-[#18191A] items-center">
      <button
        type="button"
        className="cursor-pointer lg:hidden"
        onClick={handleSidebarToggle}
      >
        <GiHamburgerMenu className="text-2xl" />
      </button>
      <Breadcrumb />
      <div className="flex justify-end p-2 ml-auto">
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? (
            <MdOutlineLightMode className="size-5 sm:size-6 text-[#1a1a1a]" />
          ) : (
            <MdOutlineDarkMode className="size-5 sm:size-6 text-white" />
          )}
        </button>
      </div>
      <ProfileModal user={user}/>
    </div>
  );
};

export default Navbar;
