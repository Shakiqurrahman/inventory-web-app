import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ImSpinner8 } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router";
import useOutsideClick from "../../hooks/useOutsideClick";
import {
  useChangeProfileMutation,
  useGetProfileInfoQuery,
} from "../../redux/features/auth/authApi";
import { setToken } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hook";

type EditProfileModalProps = {
  close: (value: boolean) => void;
};

const EditProfileModal: React.FC<EditProfileModalProps> = ({ close }) => {
  const dispatch = useAppDispatch();
  const { data: profileData, isLoading } = useGetProfileInfoQuery(null);
  const [updateProfile, { isLoading: isUpdating }] = useChangeProfileMutation();

  const [profileForm, setProfileForm] = useState({
    name: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    if (profileData) {
      setProfileForm({
        name: profileData.name ?? "",
        username: profileData.username ?? "",
        email: profileData.email ?? "",
      });
    }
  }, [profileData]);

  const formRef = useRef<HTMLDivElement>(null);

  useOutsideClick(formRef, () => {
    close(false);
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await updateProfile({ name: profileForm.name });
      toast.success("User updated successfully!");
      close(false);
      dispatch(setToken(res?.data?.data?.accessToken));
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
    close(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/20 flex justify-center items-start z-[99999] p-4">
      <div className="w-full relative mt-20 max-w-[400px] bg-white rounded-lg">
        <div
          className={`${isLoading && "bg-black/15"}  rounded-lg p-6 w-full`}
          ref={formRef}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Edit Profile Information</h2>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => close(false)}
            >
              <IoClose />
            </button>
          </div>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={profileForm.name}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    name: e.target.value,
                  })
                }
                placeholder="Enter name"
                className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-2">
                Username
              </label>
              <input
                value={profileForm.username}
                type="text"
                name="username"
                placeholder="Enter username"
                disabled
                className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 text-sm cursor-not-allowed opacity-60"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-2">Email</label>
              <input
                value={profileForm.email}
                type="text"
                name="email"
                placeholder="Enter Email"
                disabled
                className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 text-sm cursor-not-allowed opacity-60"
              />
            </div>
            <div className="flex justify-between">
              <Link
                to={"/change-password"}
                type="submit"
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200 cursor-pointer text-sm"
              >
                Change Password
              </Link>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 cursor-pointer text-sm"
              >
                Save
              </button>
            </div>
          </form>
        </div>
        {isLoading || isUpdating ? (
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
            <ImSpinner8 className="animate-spin duration-300 size-8" />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default EditProfileModal;
