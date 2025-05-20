import { useState } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "../assets/logo/logo.png";

const LoginPage = () => {
    const [theme, setTheme] = useState("light");

    const handleToggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <div
            className={`${theme === "dark" ? "bg-[#18191A]" : ""} h-screen p-4`}
        >
            <div className="flex justify-end p-2 md:p-8 gap-4">
                <button onClick={handleToggleTheme} className="cursor-pointer">
                    {theme === "light" ? (
                        <MdOutlineLightMode className="size-6" />
                    ) : (
                        <MdOutlineDarkMode className="size-6 text-white" />
                    )}
                </button>
            </div>
            <div className="flex items-center justify-center mt-10">
                <div
                    className={`max-w-[520px] border rounded-md pb-10 ${
                        theme === "dark "
                            ? "bg-[#242526] border-gray-900"
                            : "border-gray-300"
                    }`}
                >
                    <div
                        className={`${
                            theme === "light" ? "bg-[#1a1a1a]" : "bg-[#ddd]"
                        }  flex justify-center rounded-t-md`}
                    >
                        <img
                            src={logo}
                            alt=""
                            className="object-contain size-18 p-2"
                        />
                    </div>
                    <p
                        className={`text-xs pt-10 p-4 ${
                            theme === "light"
                                ? "text-[#1a1a1a]"
                                : "text-gray-300"
                        }`}
                    >
                        Welcome to the Fit and Found Point Of Sale System. To
                        continue, please login using your username and password
                        below.
                    </p>
                    <h3
                        className={`text-xl md:text-3xl font-medium text-center py-2 ${
                            theme === "dark"
                                ? "text-[#838aa0]"
                                : "text-gray-500 "
                        } `}
                    >
                        Press login to continue
                    </h3>

                    <form className="p-4 space-y-3 text-base">
                        <input
                            type="text"
                            placeholder="Username or Email"
                            className={`w-full border border-gray-400 outline-0 p-2 rounded-sm text-sm md:text-base ${
                                theme === "dark"
                                    ? "text-gray-200"
                                    : "placeholder:text-gray-500"
                            }`}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className={`w-full border border-gray-400 outline-0 p-2 rounded-sm text-sm md:text-base ${
                                theme === "dark"
                                    ? "text-gray-200"
                                    : "placeholder:text-gray-500"
                            }`}
                        />
                        <Link
                            to={"#"}
                            className="block text-right text-gray-400 hover:underline text-sm"
                        >
                            Reset Password?
                        </Link>
                        <button
                            type="submit"
                            className={`${
                                theme === "light"
                                    ? "bg-[#1a1a1a] text-white"
                                    : "bg-gray-300 text-[#1a1a1a]"
                            }  w-full p-2 rounded-sm cursor-pointer text-sm md:text-base`}
                        >
                            LOGIN
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
