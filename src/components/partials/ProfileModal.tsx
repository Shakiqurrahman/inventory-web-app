import { Link } from "react-router-dom";
import Avatar from "../../assets/images/avatar-default.jpg";

const ProfileModal = () => {
  return (
    <div className="flex gap-3 items-center h-full cursor-pointer relative">
      <img
        src={Avatar}
        alt="Avatar"
        className="size-8 rounded-full object-cover"
      />
      <h1 className="text-sm font-medium text-zinc-700">John Doe</h1>
      <ul className="absolute top-full right-0 mt-2 w-40 bg-gray-100 rounded-md shadow-lg z-10">
        <li className="bg-white shadow-md rounded-md p-2 w-40">
          <button
            type="button"
            className="block text-sm text-gray-700 hover:bg-gray-200 rounded px-2 py-1"
          >
            Edit Profile
          </button>
        </li>
        <li className="bg-white shadow-md rounded-md p-2 w-40">
          <Link
            to="/setting"
            className="block text-sm text-gray-700 hover:bg-gray-200 rounded px-2 py-1"
          >
            Settings
          </Link>
        </li>
        <li className="bg-white shadow-md rounded-md p-2 w-40">
          <Link
            to="/logout"
            className="block text-sm text-gray-700 hover:bg-gray-200 rounded px-2 py-1"
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileModal;
