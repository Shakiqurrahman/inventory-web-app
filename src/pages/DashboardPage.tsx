import { IoCartOutline } from "react-icons/io5";
import { LiaIdCard } from "react-icons/lia";
import { PiClock } from "react-icons/pi";
import { SlPeople } from "react-icons/sl";
import { TfiCloudDown, TfiHarddrive, TfiShoppingCart } from "react-icons/tfi";
import { Link } from "react-router";

const DashboardPage = () => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <Link
          to={"/sales"}
          className="flex justify-between items-center p-1 bg-white shadow-md"
        >
          <div className="ml-4">
            <h1 className="text-3xl font-medium text-blue-500 mb-2">32</h1>
            <p>Total Sales</p>
          </div>
          <div className="flex justify-center items-center size-26 bg-blue-500 text-white">
            <IoCartOutline className="text-4xl" />
          </div>
        </Link>
        <Link
          to={"/customers"}
          className="flex justify-between items-center p-1 bg-white shadow-md"
        >
          <div className="ml-4">
            <h1 className="text-3xl font-medium text-[#6FD64B] mb-2">12</h1>
            <p>Total Customers</p>
          </div>
          <div className="flex justify-center items-center size-26 bg-[#6FD64B] text-white">
            <SlPeople className="text-4xl" />
          </div>
        </Link>
        <Link
          to={"/items"}
          className="flex justify-between items-center p-1 bg-white shadow-md"
        >
          <div className="ml-4">
            <h1 className="text-3xl font-medium text-[#FB5D5D] mb-2">20</h1>
            <p>Total Items</p>
          </div>
          <div className="flex justify-center items-center size-26 bg-[#FB5D5D] text-white">
            <TfiHarddrive className="text-4xl" />
          </div>
        </Link>
        <Link
          to={"/employees"}
          className="flex justify-between items-center p-1 bg-white shadow-md"
        >
          <div className="ml-4">
            <h1 className="text-3xl font-medium text-[#F7941D] mb-2">32</h1>
            <p>Total Employees</p>
          </div>
          <div className="flex justify-center items-center size-26 bg-[#F7941D] text-white">
            <LiaIdCard className="text-4xl" />
          </div>
        </Link>
      </div>
      <h1 className="text-center my-4 text-sm">
        Welcome to Fit & Found Point of Sell, choose a common task below to get
        started!
      </h1>
      <div className="grid gap-5 sm:grid-cols-2">
        <Link
          to={"/"}
          className="p-3 flex gap-5 items-center bg-white hover:bg-primary hover:text-white duration-200 rounded-sm"
        >
          <TfiShoppingCart className="text-2xl" />
          <span className="h-5 w-px bg-gray-300"></span>
          <h1 className="text-xs font-light">Start a New Sale</h1>
        </Link>
        <Link
          to={"/"}
          className="p-3 flex gap-5 items-center bg-white hover:bg-primary hover:text-white duration-200 rounded-sm"
        >
          <TfiCloudDown className="text-2xl" />
          <span className="h-5 w-px bg-gray-300"></span>
          <h1 className="text-xs font-light">Start a New Receiving</h1>
        </Link>
        <Link
          to={"/"}
          className="p-3 flex gap-5 items-center bg-white hover:bg-primary hover:text-white duration-200 rounded-sm"
        >
          <PiClock className="text-2xl" />
          <span className="h-5 w-px bg-gray-300"></span>
          <h1 className="text-xs font-light">Today's closeout report</h1>
        </Link>
        <Link
          to={"/"}
          className="p-3 flex gap-5 items-center bg-white hover:bg-primary hover:text-white duration-200 rounded-sm"
        >
          <PiClock className="text-2xl" />
          <span className="h-5 w-px bg-gray-300"></span>
          <h1 className="text-xs font-light">Today's detailed sales report</h1>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
