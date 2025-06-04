import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiPlus, FiSearch, FiTrash } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
    useDeleteCategoryMutation,
    useGetCategoriesQuery,
} from "../../redux/features/categories/categoriesApiSlice";
import {
    toggleCreateModal,
    toggleEditModal,
    type ICategory,
} from "../../redux/features/categories/categoriesSlice";
import { useAppSelector } from "../../redux/hook";
import CreateCategoryModal from "./CreateCategoryModal";
import EditCategories from "./EditCategories";

const AllCategories = () => {
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const dispatch = useDispatch();
    const { openCreateModal, openEditModal } = useAppSelector(
        (state) => state.categories
    );
    const { data: categoriesData, isLoading } = useGetCategoriesQuery(null);
    // delete category import
    const [deleteCategory, { isLoading: deleteLoading }] =
        useDeleteCategoryMutation();

    const [searchValue, setSearchValue] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const filteredCategories = categoriesData?.filter((category: ICategory) =>
        category.name.toLowerCase().includes(searchValue.trim().toLowerCase())
    );
    console.log(filteredCategories);

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            await deleteCategory(id).unwrap();
            toast.success("Category deleted successfully");
            setDeletingId(null);
        } catch (error) {
            console.error("Failed to delete category:", error);
            toast.error("Failed to delete category");
            setDeletingId(null);
        }
    };

    return (
        <>
            <div className="bg-white p-4 rounded-lg">
                <h1 className="font-medium text-lg mb-4">Categories</h1>
                <div className="flex justify-between flex-wrap sm:flex-nowrap gap-2">
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
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center text-xs gap-1 cursor-pointer hover:bg-blue-600 duration-200"
                    >
                        <FiPlus className="text-lg" />
                        New Category
                    </button>
                </div>
                <div className="mt-10 overflow-x-auto">
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
                            {isLoading ? (
                                <tr className="text-sm">
                                    <td
                                        colSpan={4}
                                        className="p-3 text-center text-gray-500"
                                    >
                                        Loading...
                                    </td>
                                </tr>
                            ) : filteredCategories?.length > 0 ? (
                                filteredCategories?.map(
                                    (category: ICategory, index: number) => (
                                        <tr
                                            className="border-b border-gray-300 hover:bg-gray-50 text-sm"
                                            key={index}
                                        >
                                            <td className="p-3">{index + 1}</td>
                                            <td className="p-3">
                                                {category.name}
                                            </td>
                                            <td className="p-3">3 products</td>
                                            <td className="flex items-center gap-1 p-3">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        dispatch(
                                                            toggleEditModal({
                                                                id: category.id,
                                                                name: category.name,
                                                            })
                                                        )
                                                    }
                                                    className="flex gap-0.5 items-center py-1.5 px-3 bg-blue-500 text-white rounded-sm text-xs cursor-pointer shrink-0"
                                                >
                                                    <MdOutlineModeEdit className="" />{" "}
                                                    <span>Edit</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(
                                                            category.id
                                                        )
                                                    }
                                                    className="bg-red-400 text-white p-1.5 rounded-sm cursor-pointer shrink-0 overfow-hidden hover:bg-red-500 duration-200"
                                                >
                                                    {deleteLoading &&
                                                    category.id ===
                                                        deletingId ? (
                                                        <AiOutlineLoading3Quarters className="animate-spin duration-300" />
                                                    ) : (
                                                        <FiTrash className="text-base" />
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                )
                            ) : (
                                <tr className="text-sm">
                                    <td
                                        colSpan={4}
                                        className="p-3 text-center text-gray-500"
                                    >
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
