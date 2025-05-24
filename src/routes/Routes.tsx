import { createBrowserRouter, type RouteObject } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import ResetPasswordOtp from "../pages/resetPassword/resetPasswordOtp";
import ResetPasswordPage from "../pages/resetPassword/ResetPasswordPage";
import MainLayout from "./Layout";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <div>Hello World</div>,
            },
        ],
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/reset-password",
        element: <ResetPasswordPage />,
    },
    {
        path: "reset-password/otp",
        element: <ResetPasswordOtp />,
    },
    {
        path: "*",
        element: <ErrorPage />,
    },
];

export const router = createBrowserRouter(routes);
