import { FiPlus, FiSearch } from "react-icons/fi";

const AllCategories = () => {
  return (
    <>
      <div className="bg-white p-4 rounded-lg">
        <h1 className="font-medium text-lg mb-4">Categories</h1>
        <div className="flex justify-between">
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-[300px] gap-2">
            <FiSearch className="text-lg shrink-0" />
            <input
              type="text"
              placeholder="Search"
              className="placeholder:text-sm size-full outline-none"
            />
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-lg ml-2 flex items-center text-sm gap-2 cursor-pointer hover:bg-secondary duration-200">
            <FiPlus className="text-lg" />
            New Category
          </button>
        </div>
      </div>
    </>
  );
};

export default AllCategories;
