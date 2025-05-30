import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import useOutsideClick from "../../hooks/useOutsideClick";
import {
  toggleEditModal,
  updateCategory,
} from "../../redux/features/categories/categoriesSlice";
import type { RootState } from "../../redux/store";

const EditCategories = () => {
  const dispatch = useDispatch();
  const formRef = useRef<HTMLDivElement>(null);
  const { editCategory } = useSelector((state: RootState) => state.categories);
  const [form, setForm] = useState({
    categoryName: editCategory ? editCategory.categoryName : "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.categoryName) {
      toast.error("Category name is required");
      return;
    } else {
      // Dispatch the update action here
      dispatch(updateCategory({ id: editCategory?.id, updatedCategory: form }));
      dispatch(toggleEditModal(null));
      // Reset form
      setForm({ categoryName: "" });
      toast.success("Category updated successfully");
    }
  };

  useOutsideClick(formRef, () => {
    dispatch(toggleEditModal(null));
  });
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/20 flex justify-center items-start z-[99999] p-4">
      <div
        className="bg-white rounded-lg p-6 w-full max-w-[400px] mt-20"
        ref={formRef}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Edit Category</h2>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={() => dispatch(toggleEditModal(null))}
          >
            <IoClose />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              name="categoryName"
              value={form.categoryName}
              onChange={handleChange}
              placeholder="Enter category name"
              className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 cursor-pointer text-sm"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategories;
