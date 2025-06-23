import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import Avatar from "../../assets/images/avatar-default.jpg";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useLogoutMutation } from "../../redux/features/auth/authApi";
import {
    logoutUser,
    type TUserData,
} from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hook";
import EditProfileModal from "./EditProfileModal";

interface IProps {
    user: TUserData | null;
}

const ProfileModal = ({ user }: IProps) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [openEditProfile, setOpenEditProfile] = useState(false);
    const [logoutApi] = useLogoutMutation();

    const handleToggle = () => {
        setOpen((prev) => (prev === false ? true : false));
    };
    useOutsideClick(menuRef, () => {
        setOpen(false);
    });

    const handleLogout = async () => {
        await logoutApi(null).unwrap();
        dispatch(logoutUser());
        toast.success("Logout successfully");
        navigate("/login");
    };

    return (
        <>
            <div
                ref={menuRef}
                className="flex gap-3 items-center h-full cursor-pointer relative select-none shrink-0"
                onClick={handleToggle}
            >
                <img
                    src={user?.avatar || Avatar}
                    alt={user?.name || "Avatar"}
                    className="size-8 rounded-full object-cover shrink-0"
                />
                <h1 className="hidden sm:block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {user?.name}
                </h1>

                <ul
                    className={`absolute top-full right-0 mt-2 w-40 bg-gray-100 rounded-md shadow-lg z-10 origin-top transition-transform duration-300 ease-in-out ${
                        open ? "scale-y-100" : "scale-y-0"
                    }`}
                >
                    <li className="bg-white w-40">
                        <button
                            type="button"
                            onClick={() => setOpenEditProfile(true)}
                            className="flex gap-2 items-center w-full text-left text-sm text-gray-700 hover:bg-gray-200 p-3 cursor-pointer"
                        >
                            <FaRegEdit className="text-lg" /> Edit Profile
                        </button>
                    </li>
                    <li className="bg-white shadow-md w-40">
                        <Link
                            to="/store-config"
                            className="flex gap-2 items-center text-sm text-gray-700 hover:bg-gray-200 p-3"
                        >
                            <IoMdSettings className="text-lg" />
                            Settings
                        </Link>
                    </li>
                    <li className="bg-white shadow-md w-40">
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex gap-2 items-center text-sm text-red-700 hover:bg-gray-200 p-3 w-full cursor-pointer"
                        >
                            <MdOutlinePowerSettingsNew className="text-lg" />
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
            {openEditProfile && <EditProfileModal close={setOpenEditProfile} />}
        </>
    );
};

export default ProfileModal;
