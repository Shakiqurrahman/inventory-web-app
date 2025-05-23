import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./routes/Routes.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Toaster position="top-center" reverseOrder={false} />
        <RouterProvider router={router} />
    </StrictMode>
);
