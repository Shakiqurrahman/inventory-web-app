import { createBrowserRouter, type RouteObject } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
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
        path: "*",
        element: <ErrorPage />,
    },
];

export const router = createBrowserRouter(routes);
