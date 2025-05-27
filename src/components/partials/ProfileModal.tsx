import { useRef, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { Link } from "react-router";
import Avatar from "../../assets/images/avatar-default.jpg";
import useOutsideClick from "../../hooks/useOutsideClick";

const ProfileModal = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prev) => (prev === false ? true : false));
  };
  useOutsideClick(menuRef, () => {
    setOpen(false);
  });

  return (
    <div
      ref={menuRef}
      className="flex gap-3 items-center h-full cursor-pointer relative select-none"
      onClick={handleToggle}
    >
      <img
        src={Avatar}
        alt="Avatar"
        className="size-8 rounded-full object-cover"
      />
      <h1 className="text-sm font-medium text-zinc-700">John Doe</h1>
      <ul
        className={`absolute top-full right-0 mt-2 w-40 bg-gray-100 rounded-md shadow-lg z-10 origin-top transition-transform duration-300 ease-in-out ${
          open ? "scale-y-100" : "scale-y-0"
        }`}
      >
        <li className="bg-white w-40">
          <button
            type="button"
            className="flex gap-2 items-center w-full text-left text-sm text-gray-700 hover:bg-gray-200 p-3 cursor-pointer"
          >
            <FaRegEdit className="text-lg" /> Edit Profile
          </button>
        </li>
        <li className="bg-white shadow-md w-40">
          <Link
            to="/setting"
            className="flex gap-2 items-center text-sm text-gray-700 hover:bg-gray-200 p-3"
          >
            <IoMdSettings className="text-lg" />
            Settings
          </Link>
        </li>
        <li className="bg-white shadow-md w-40">
          <Link
            to="/logout"
            className="flex gap-2 items-center text-sm text-red-700 hover:bg-gray-200 p-3"
          >
            <MdOutlinePowerSettingsNew className="text-lg" />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileModal;
