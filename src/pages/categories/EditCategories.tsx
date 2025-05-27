const EditCategories = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/20 flex justify-center items-start">
      <div className="bg-white rounded-lg p-6 w-[400px] mt-20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Edit Category</h2>
          <button
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={() => console.log("Close modal")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
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
