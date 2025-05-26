import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/partials/Navbar";
import Sidebar from "../components/partials/Sidebar";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen w-full bg-gray-200">
      <Sidebar open={isSidebarOpen} close={setIsSidebarOpen} />
      <div className="w-full h-full overflow-y-auto">
        <Navbar openSidebar={setIsSidebarOpen} />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
