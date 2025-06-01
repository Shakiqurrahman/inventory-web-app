import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import useOutsideClick from "../../hooks/useOutsideClick";
import {
    createCustomer,
    toggleCustomerModal,
} from "../../redux/features/customers/customersSlice";

const CreateCustomerModal = () => {
    const dispatch = useDispatch();
    const formRef = useRef<HTMLDivElement>(null);

    const [form, setForm] = useState({
        name: "",
        phone: "",
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
        if (!form.name) {
            toast.error("Customer Name is required");
            return;
        } else if (!form.phone) {
            toast.error("Customer Phone is required");
        } else {
            dispatch(createCustomer(form));
            dispatch(toggleCustomerModal());
            // Reset form
            setForm({ name: "", phone: "" });
            toast.success("Category created successfully");
        }
    };

    useOutsideClick(formRef, () => {
        dispatch(toggleCustomerModal());
    });

    return (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/20 flex justify-center items-start z-[99999] p-4">
            <div
                className="bg-white rounded-lg p-6 w-full max-w-[400px] mt-20"
                ref={formRef}
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">Create New Customer</h2>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                        onClick={() => dispatch(toggleCustomerModal())}
                    >
                        <IoClose />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-2">
                            Customer Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter Customer name"
                            className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-2">
                            Customer Phone
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Enter category Phone Number"
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

export default CreateCustomerModal;
