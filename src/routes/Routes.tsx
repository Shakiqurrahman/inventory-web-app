import { createBrowserRouter, type RouteObject } from "react-router";
import AttributesPage from "../pages/attributes/AttributesPage";
import AllCategories from "../pages/categories/AllCategories";
import Customerspage from "../pages/customerPage/Customerspage";
import DashboardPage from "../pages/DashboardPage";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import NewPassword from "../pages/resetPassword/NewPassword";
import ResetPasswordOtp from "../pages/resetPassword/ResetPasswordOtp";
import ResetPasswordPage from "../pages/resetPassword/ResetPasswordPage";
import EditSupplier from "../pages/supplierPage/EditSupplier";
import NewSuplier from "../pages/supplierPage/NewSuplier";
import SuppliersPage from "../pages/supplierPage/SuppliersPage";
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
            {
                path: "/categories",
                element: <AllCategories />,
            },
            {
                path: "/attributes",
                element: <AttributesPage />,
            },
            {
                path: "/suppliers",
                element: <SuppliersPage />,
            },
            {
                path: "/suppliers/new-supplier",
                element: <NewSuplier />,
            },
            {
                path: "/suppliers/edit-supplier/:phone",
                element: <EditSupplier />,
            },
            {
                path: "/customers",
                element: <Customerspage />,
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
        path: "new-password",
        element: <NewPassword />,
    },
    {
        path: "*",
        element: <ErrorPage />,
    },
];

export const router = createBrowserRouter(routes);
