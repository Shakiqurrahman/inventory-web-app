import { createBrowserRouter, type RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <div>Hello World</div>,
    },
];

export const router = createBrowserRouter(routes);
