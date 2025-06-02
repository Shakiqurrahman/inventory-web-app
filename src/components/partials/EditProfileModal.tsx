import React, { useRef } from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router";
import useOutsideClick from "../../hooks/useOutsideClick";

type EditProfileModalProps = {
    close: (value: boolean) => void;
};

const EditProfileModal: React.FC<EditProfileModalProps> = ({ close }) => {
    const formRef = useRef<HTMLDivElement>(null);

    useOutsideClick(formRef, () => {
        close(false);
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        close(false); // Close the modal after submission
    };

    return (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/20 flex justify-center items-start z-[99999] p-4">
            <div
                className="bg-white rounded-lg p-6 w-full max-w-[400px] mt-20"
                ref={formRef}
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">
                        Edit Profile Information
                    </h2>
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
                        <label className="block text-sm text-gray-700 mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            disabled
                            className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Enter Email"
                            disabled
                            className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 text-sm"
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
        </div>
    );
};

export default EditProfileModal;
