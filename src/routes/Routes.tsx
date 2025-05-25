import { createBrowserRouter, type RouteObject } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import ResetPasswordOtp from "../pages/resetPassword/ResetPasswordOtp";
import ResetPasswordPage from "../pages/resetPassword/ResetPasswordPage";
import MainLayout from "./Layout";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
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
