import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BeatLoader } from "react-spinners";
import { z } from "zod";
import logo from "../../assets/logo/logo.png";
import { useChangePasswordMutation } from "../../redux/features/auth/authApi";
import { toggleTheme } from "../../redux/features/theme/themeSlice";
import type { RootState } from "../../redux/store";

// zod schema

const loginSchema = z
    .object({
        oldPassword: z.string().min(1, "Password is required"),
        newPassword: z.string().min(1, "New Password is required"),
        confirmNewPassword: z
            .string()
            .min(1, "Confirm New Password is required"),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        path: ["confirmNewPassword"], // This tells Zod where to assign the error
        message: "Passwords do not match",
    });

type loginForm = z.infer<typeof loginSchema>;

const ChangePassword = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.theme.value);
    const [changePassword, { isLoading }] = useChangePasswordMutation();
    const navigate = useNavigate();

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
        console.log("Login Data: ", data);

        try {
            const response = await changePassword({
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
            }).unwrap();
            toast.success(response.message);
            console.log(response);
            if (response.success) {
                navigate("/");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message || "An error occurred");
            // You can also log the error to the console if needed
            console.log(error);
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

            <div className="w-full sm:w-[540px] border rounded-md pb-10 bg-white dark:bg-[#242526] border-gray-300 dark:border-gray-800">
                <div className="bg-[#1a1a1a] dark:bg-black flex justify-center rounded-t-md">
                    <img
                        src={logo}
                        alt="logo"
                        className="object-contain size-18 p-2"
                    />
                </div>
                <p className="text-sm pt-10 p-4 text-[#1a1a1a] dark:text-gray-300">
                    Enter your old password
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-4 text-base space-y-4"
                >
                    <div>
                        <input
                            type="text"
                            placeholder="Enter your Old Password"
                            {...register("oldPassword")}
                            className="w-full border border-gray-600 outline-0 px-4 py-2 md:py-3 rounded-sm text-sm md:text-base placeholder:text-gray-500 dark:text-gray-200 dark:placeholder:text-gray-400"
                        />
                        {errors.oldPassword && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.oldPassword.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Enter new Password"
                            {...register("newPassword")}
                            className="w-full border border-gray-600 outline-0 px-4 py-2 md:py-3 rounded-sm text-sm md:text-base placeholder:text-gray-500 dark:text-gray-200 dark:placeholder:text-gray-400"
                        />
                        {errors.newPassword && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.newPassword.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Confirm Password"
                            {...register("confirmNewPassword")}
                            className="w-full border border-gray-600 outline-0 px-4 py-2 md:py-3 rounded-sm text-sm md:text-base placeholder:text-gray-500 dark:text-gray-200 dark:placeholder:text-gray-400"
                        />
                        {errors.confirmNewPassword && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.confirmNewPassword.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full p-2 rounded-sm cursor-pointer text-sm md:text-base bg-[#1a1a1a] hover:bg-gray-600 text-white dark:bg-gray-600 dark:hover:bg-gray-800 duration-300 disabled:opacity-70"
                    >
                        {isLoading ? (
                            <BeatLoader size={6} color="#ffffff" />
                        ) : (
                            "Change Password"
                        )}
                    </button>
                </form>
                <Link
                    to={"/"}
                    className="text-sm text-gray-500 hover:underline p-4"
                >
                    Back to homepage
                </Link>
            </div>
        </div>
    );
};

export default ChangePassword;
