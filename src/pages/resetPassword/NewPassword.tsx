/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import logo from "../../assets/logo/logo.png";

import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useResetPasswordMutation } from "../../redux/features/auth/authApi";
import { toggleTheme } from "../../redux/features/theme/themeSlice";
import type { RootState } from "../../redux/store";

// zod schema
const loginSchema = z
    .object({
        password: z.string().min(1, "Password is required"),
        confirmPassword: z.string().min(1, "Confirm password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

type loginForm = z.infer<typeof loginSchema>;

const NewPassword = () => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const resetToken = useSelector(
        (state: RootState) => state.resetPassword.resetToken
    );

    const theme = useSelector((state: RootState) => state.theme.value);

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [theme]);

    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<loginForm>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: loginForm) => {
        if (!resetToken) {
            console.error("Reset token not available");
            return;
        }

        try {
            const res = await resetPassword({
                token: resetToken,
                newPassword: data.password,
            }).unwrap();

            console.log("password reset successfully", res);
            navigate("/");
        } catch (err: any) {
            console.error("Password reset failed, ", err);
        }
    };
    return (
        <div className="h-screen p-4 bg-white dark:bg-[#18191A] transition-colors duration-300 relative flex items-center justify-center">
            <div className="p-6 md:p-8 gap-4 absolute top-0 right-0">
                <button onClick={handleToggleTheme} className="cursor-pointer">
                    {theme === "light" ? (
                        <MdOutlineLightMode className="size-6 text-[#1a1a1a]" />
                    ) : (
                        <MdOutlineDarkMode className="size-6 text-white" />
                    )}
                </button>
            </div>

            <div className="w-full sm:max-w-[520px] border rounded-md pb-10 bg-white dark:bg-[#242526] border-gray-300 dark:border-gray-800">
                <div className="bg-[#1a1a1a] dark:bg-black flex justify-center rounded-t-md">
                    <img
                        src={logo}
                        alt="logo"
                        className="object-contain size-18 p-2"
                    />
                </div>

                <h3 className="text-lg md:text-xl font-medium text-center py-3 text-gray-500 dark:text-[#838aa0]">
                    Enter New Password
                </h3>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-4 space-y-3 text-base"
                >
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter New Password"
                            {...register("password")}
                            className="w-full border border-gray-600 outline-0 p-2 rounded-sm text-sm md:text-base placeholder:text-gray-500 dark:text-gray-200 dark:placeholder:text-gray-400"
                        />
                        {showPassword ? (
                            <FaRegEye
                                className="absolute top-[25%] right-[10px] cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        ) : (
                            <FaEyeSlash
                                className="absolute top-[25%] right-[10px] cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        )}

                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm New Password"
                            {...register("confirmPassword")}
                            className="w-full border border-gray-600 outline-0 p-2 rounded-sm text-sm md:text-base placeholder:text-gray-500 dark:text-gray-200 dark:placeholder:text-gray-400"
                        />
                        {showPassword ? (
                            <FaRegEye
                                className="absolute top-[25%] right-[10px] cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        ) : (
                            <FaEyeSlash
                                className="absolute top-[25%] right-[10px] cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        )}
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="mt-5 w-full p-2 rounded-sm cursor-pointer text-sm md:text-base bg-[#1a1a1a] hover:bg-gray-600 text-white dark:bg-gray-600 dark:hover:bg-gray-800 duration-300 disabled:opacity-65"
                    >
                        {isLoading ? "Updating..." : "Update Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewPassword;
