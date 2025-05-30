import { useState } from "react";
import { FiPlus, FiSearch, FiTrash } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  toggleCreateModal,
  toggleEditModal,
} from "../../redux/features/categories/categoriesSlice";
import type { RootState } from "../../redux/store";
import CreateCategoryModal from "./CreateCategoryModal";
import EditCategories from "./EditCategories";

const AllCategories = () => {
  const dispatch = useDispatch();
  const { categories, openCreateModal, openEditModal } = useSelector(
    (state: RootState) => state.categories
  );

  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const filteredCategories = categories.filter((category) =>
    category.categoryName
      .toLowerCase()
      .includes(searchValue.trim().toLowerCase())
  );

  return (
    <>
      <div className="bg-white p-4 rounded-lg">
        <h1 className="font-medium text-lg mb-4">Categories</h1>
        <div className="flex justify-between">
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-[300px] gap-2">
            <FiSearch className="text-lg shrink-0" />
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Search"
              className="placeholder:text-sm size-full outline-none"
            />
          </div>
          <button
            type="button"
            onClick={() => dispatch(toggleCreateModal())}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2 flex items-center text-xs gap-1 cursor-pointer hover:bg-blue-600 duration-200"
          >
            <FiPlus className="text-lg" />
            New Category
          </button>
        </div>
        <div className="mt-10">
          <table className="w-full border-collapse rounded-md text-gray-700">
            <thead>
              <tr className="bg-gray-200 text-left *:font-semibold text-sm">
                <th className="p-3 w-[60px]">ID</th>
                <th className="p-3">Category Name</th>
                <th className="p-3 w-[200px]">Products</th>
                <th className="p-3 w-[200px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category, index) => (
                  <tr
                    className="border-b border-gray-300 hover:bg-gray-50 text-sm"
                    key={index}
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{category.categoryName}</td>
                    <td className="p-3">3 products</td>
                    <td className="flex items-center gap-1 p-3">
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(toggleEditModal({ id: index, ...category }))
                        }
                        className="flex gap-0.5 items-center py-1.5 px-3 bg-blue-500 text-white rounded-sm text-xs cursor-pointer shrink-0"
                      >
                        <MdOutlineModeEdit className="" /> <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => dispatch(deleteCategory(index))}
                        className="bg-red-400 text-white p-1.5 rounded-sm cursor-pointer shrink-0"
                      >
                        <FiTrash className="text-md" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="border-b border-gray-300 text-sm">
                  <td colSpan={4} className="p-3 text-center text-gray-500">
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {openCreateModal && <CreateCategoryModal />}
      {openEditModal && <EditCategories />}
    </>
  );
};

export default AllCategories;
