import { createBrowserRouter, type RouteObject } from "react-router";
import AttributesPage from "../pages/attributes/AttributesPage";
import BankDeposites from "../pages/bankDeposites/BankDeposites";
import AllCategories from "../pages/categories/AllCategories";
import Customerspage from "../pages/customerPage/Customerspage";
import DashboardPage from "../pages/DashboardPage";
import AllEmployeesPage from "../pages/employees/AllEmployeesPage";
import CreateEmployeePage from "../pages/employees/CreateEmployeePage";
import EditEmployeePage from "../pages/employees/EditEmployeePage";
import ErrorPage from "../pages/ErrorPage";
import AllExpensesPage from "../pages/expenses/AllExpensesPage";
import CreateExpensePage from "../pages/expenses/CreateExpensePage";
import EditExpensePage from "../pages/expenses/EditExpensePage";
import AllItemsPage from "../pages/items/AllItemsPage";
import CreateItemPage from "../pages/items/CreateItemPage";
import LoginPage from "../pages/LoginPage";

import RecivingsPage from "../pages/receivings/RecivingsPage";
import ChangePassword from "../pages/resetPassword/ChangePassword";
import NewPassword from "../pages/resetPassword/NewPassword";
import ResetPasswordOtp from "../pages/resetPassword/ResetPasswordOtp";
import ResetPasswordPage from "../pages/resetPassword/ResetPasswordPage";
import SalesPage from "../pages/sales/SalesPage";
import SaleHistoryPage from "../pages/salesHistory/SaleHistoryPage";
import EditSupplier from "../pages/supplierPage/EditSupplier";
import NewSuplier from "../pages/supplierPage/NewSuplier";
import SuppliersPage from "../pages/supplierPage/SuppliersPage";
import MainLayout from "./Layout";
import AdminProtected from "./protected/AdminProtected";
import ProtectedResetRoute from "./protected/ProtectedResetRoute";

const routes: RouteObject[] = [
    {
        path: "/",
        element: (
            <AdminProtected>
                <MainLayout />
            </AdminProtected>
        ),
        children: [
            {
                path: "/",
                element: <DashboardPage />,
            },
            {
                path: "/items",
                element: <AllItemsPage />,
            },
            {
                path: "/items/new-item",
                element: <CreateItemPage />,
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
                path: "/suppliers/edit-supplier/",
                element: <EditSupplier />,
            },
            {
                path: "/customers",
                element: <Customerspage />,
            },
            {
                path: "/employees",
                element: <AllEmployeesPage />,
            },
            {
                path: "/employees/new-employee",
                element: <CreateEmployeePage />,
            },
            {
                path: "/employees/edit-employee",
                element: <EditEmployeePage />,
            },
            {
                path: "/expenses",
                element: <AllExpensesPage />,
            },
            {
                path: "/bank-deposite",
                element: <BankDeposites />,
            },
            {
                path: "/expenses/new-expense",
                element: <CreateExpensePage />,
            },
            {
                path: "/expenses/edit-expense",
                element: <EditExpensePage />,
            },
            {
                path: "/sales-history",
                element: <SaleHistoryPage />,
            },
            {
                path: "/sales",
                element: <SalesPage />,
            },
            {
                path: "/receiving",
                element: <RecivingsPage />,
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
        element: <ProtectedResetRoute />,
        children: [
            {
                path: "new-password",
                element: <NewPassword />,
            },
        ],
    },
    {
        path: "/change-password",
        element: <ChangePassword />,
    },
    {
        path: "*",
        element: <ErrorPage />,
    },
];

export const router = createBrowserRouter(routes);
