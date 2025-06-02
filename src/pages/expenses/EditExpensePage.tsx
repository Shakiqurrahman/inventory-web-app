import { useState } from "react";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { updateExpense } from "../../redux/features/expenses/expenseSlice";

const EditExpensePage = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: state?.date || "", // Use state from location if available
    amount: state?.amount || "",
    tax: state?.tax || "",
    paymentMethod: state?.paymentMethod || "Cash", // Default payment method
    reason: state?.reason || "",
    recipientName: state?.recipientName || "Shakil", // Default recipient name
    approvedBy: state?.approvedBy || "Shakil", // Default approved by
  });

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const isoDate = date.toISOString().split("T")[0];
      setFormData((prev) => ({ ...prev, date: isoDate }));
    }
  };

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
    if (!formData.date || !formData.amount || !formData.paymentMethod) {
      toast.error("Please fill required fields.");
      return;
    }

    // Dispatch the createExpense action with formData
    dispatch(updateExpense({ id: state?.id, updatedExpense: formData }));

    // Reset form after submission
    setFormData({
      date: "",
      amount: "",
      tax: "",
      paymentMethod: "Cash", // Reset to default payment method
      reason: "",
      recipientName: "Shakil", // Reset to default recipient name
      approvedBy: "Shakil", // Reset to default approved by
    });
    // Navigate to the expenses page after successful submission
    navigate("/expenses");
  };
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg">
      <h3 className="text-2xl font-semibold">Expense Information</h3>
      <form
        className="mt-5 space-y-4 *:flex *:flex-col *:gap-2"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="date">
            Date <span className="text-red-600">*</span>
          </label>
          <DatePicker
            selected={formData.date ? new Date(formData.date) : null}
            onChange={handleDateChange}
            dateFormat="dd-MM-yyyy"
            className="border border-gray-300 w-full p-2 outline-none rounded-md"
            placeholderText="Select a date"
            id="date"
            popperPlacement="top-start"
          />
        </div>
        <div>
          <label htmlFor="amount">
            Amount <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={formData.amount}
            onChange={handleChange}
            className="border border-gray-300 w-full p-2 outline-none rounded-md"
          />
        </div>
        <div>
          <label htmlFor="tax">Tax</label>
          <input
            type="number"
            name="tax"
            id="tax"
            value={formData.tax}
            onChange={handleChange}
            className="border border-gray-300 w-full p-2 outline-none rounded-md"
          />
        </div>
        <div>
          <label htmlFor="paymentMethod">
            Payment Type <span className="text-red-600">*</span>
          </label>
          <select
            name="paymentMethod"
            id="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="border border-gray-300 w-full p-2 outline-none rounded-md"
          >
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="Check">Check</option>
            <option value="bKash">bKash</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="reason">Reason</label>
          <textarea
            name="reason"
            id="reason"
            value={formData.reason}
            onChange={handleChange}
            className="border border-gray-300 w-full p-2 outline-none rounded-md overflow-hidden resize-none min-h-[100px]"
          ></textarea>
        </div>
        <div>
          <label htmlFor="recipientName">Recipient Name</label>
          <select
            name="recipientName"
            id="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            className="border border-gray-300 w-full p-2 outline-none rounded-md"
          >
            <option value="Shakil">Shakil</option>
            <option value="Mahdi">Mahdi</option>
            <option value="Shakiqur">Shakiqur</option>
          </select>
        </div>
        <div>
          <label htmlFor="approvedBy">Approved By</label>
          <select
            name="approvedBy"
            id="approvedBy"
            value={formData.approvedBy}
            onChange={handleChange}
            className="border border-gray-300 w-full p-2 outline-none rounded-md"
          >
            <option value="Shakil">Shakil</option>
            <option value="Mahdi">Mahdi</option>
            <option value="Shakiqur">Shakiqur</option>
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

export default EditExpensePage;
