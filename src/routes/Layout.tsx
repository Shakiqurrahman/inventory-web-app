import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/partials/Navbar";
import Sidebar from "../components/partials/Sidebar";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex h-screen w-full bg-gray-300">
      <Sidebar open={isOpen} close={setIsOpen} />
      <div className="w-full h-full overflow-y-auto">
        <Navbar openSidebar={setIsOpen} />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
