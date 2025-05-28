import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import useOutsideClick from "../../hooks/useOutsideClick";
import {
  createCategory,
  toggleCreateModal,
} from "../../redux/features/categories/categoriesSlice";

const CreateCategoryModal = () => {
  const dispatch = useDispatch();
  const formRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    categoryName: "",
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
      dispatch(createCategory(form));
      dispatch(toggleCreateModal());
      // Reset form
      setForm({ categoryName: "" });
      toast.success("Category created successfully");
    }
  };

  useOutsideClick(formRef, () => {
    dispatch(toggleCreateModal());
  });

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/20 flex justify-center items-start">
      <div className="bg-white rounded-lg p-6 w-[400px] mt-20" ref={formRef}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Create New Category</h2>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={() => dispatch(toggleCreateModal())}
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
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryModal;
