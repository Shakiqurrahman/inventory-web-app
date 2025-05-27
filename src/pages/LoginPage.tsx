import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import logo from "../assets/logo/logo.png";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { toggleTheme } from "../redux/features/theme/themeSlice";
import type { RootState } from "../redux/store";

// zod schema
const loginSchema = z.object({
  identifier: z.string().min(1, "Username or Email is required"),
  password: z.string().min(1, "Password is required"),
});

type loginForm = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state: RootState) => state.theme.value);
  const [loginMutation, { isLoading }] = useLoginMutation();

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
    try {
      const userData = await loginMutation(data).unwrap();
      console.log("🚀 ~ onSubmit ~ userData:", userData);
      toast.success("Login successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to login");
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

      <div className="max-w-[520px] border rounded-md pb-10 bg-white dark:bg-[#242526] border-gray-300 dark:border-gray-800">
        <div className="bg-[#1a1a1a] dark:bg-black flex justify-center rounded-t-md">
          <img src={logo} alt="logo" className="object-contain size-18 p-2" />
        </div>
        <p className="text-xs pt-10 p-4 text-[#1a1a1a] dark:text-gray-300">
          Welcome to the Fit and Found Point Of Sale System. To continue, please
          login using your username and password below.
        </p>
        <h3 className="text-xl md:text-3xl font-medium text-center py-2 text-gray-500 dark:text-[#838aa0]">
          Press login to continue
        </h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 space-y-3 text-base"
        >
          <input
            type="text"
            placeholder="Username or Email"
            {...register("identifier")}
            className="w-full border border-gray-600 outline-0 p-2 rounded-sm text-sm md:text-base placeholder:text-gray-500 dark:text-gray-200 dark:placeholder:text-gray-400"
          />
          {errors.identifier && (
            <p className="text-red-500 text-xs mt-1">
              {errors.identifier.message}
            </p>
          )}
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full border border-gray-600 outline-0 p-2 rounded-sm text-sm md:text-base placeholder:text-gray-500 dark:text-gray-200 dark:placeholder:text-gray-400"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
          <Link
            to={"/reset-password"}
            className="block text-right text-gray-400 hover:underline text-sm"
          >
            Reset Password?
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-2 rounded-sm cursor-pointer text-sm md:text-base bg-[#1a1a1a] hover:bg-gray-600 text-white dark:bg-gray-600 dark:hover:bg-gray-800 duration-300 disabled:opacity-65"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
