import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { createEmployee } from "../../redux/features/employees/employeeSlice";

const CreateEmployeePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "Staff", // Default role
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.role) {
      toast.error("Please fill required fields.");
      return;
    }
    dispatch(createEmployee(formData));
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      role: "Staff", // Reset to default role
    });
    // Navigate to the employees list page or show success message
    navigate("/employees");
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg">
      <h3 className="text-2xl font-semibold">Employee Information</h3>
      <form
        className="mt-5 space-y-4 *:flex *:flex-col *:gap-2"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="name">
            Employee Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 w-full p-2 outline-none rounded-md"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 w-full p-2 outline-none rounded-md"
          />
        </div>
        <div>
          <label htmlFor="phone">
            Phone Number <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-300 w-full p-2 outline-none rounded-md"
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <textarea
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            className="border border-gray-300 w-full p-2 outline-none rounded-md overflow-hidden resize-none min-h-[100px]"
          ></textarea>
        </div>
        <div>
          <label htmlFor="role">
            Employee Role <span className="text-red-600">*</span>
          </label>
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
            className="border border-gray-300 w-full p-2 outline-none rounded-md"
          >
            <option value="Staff">Staff</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="cursor-pointer ml-auto bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEmployeePage;
