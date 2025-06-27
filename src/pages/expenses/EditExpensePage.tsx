import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import { z } from "zod";
import { useUpdateExpensesMutation } from "../../redux/features/expenses/expenseApi";
import { getErrorMessage } from "../../utils/errorHandler";

const expensesSchema = z.object({
    date: z
        .string()
        .min(1, "Date must be required")
        .refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date format",
        }),
    amount: z.coerce.number().min(1, "Amount must be required"),
    tax: z.coerce.number().optional(),
    paymentMethod: z.string().min(1, "Payment Type must be required"),
    reason: z.string().optional(),
    recipientName: z.string().min(1, "Recipient Name must be required"),
    approvedBy: z.string().min(1, "Approved By must be required"),
});

type expensesForm = z.infer<typeof expensesSchema>;

const EditExpensePage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<expensesForm>({
        resolver: zodResolver(expensesSchema),
    });
    const { state } = useLocation();

    const [updateExpenses, { isLoading }] = useUpdateExpensesMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (state) {
            // Set the form values based on the state passed from the previous page
            setValue("date", state.date);
            setValue("amount", state.amount);
            setValue("tax", state.tax || "");
            setValue("paymentMethod", state.paymentMethod || "CASH");
            setValue("reason", state.reason || "");
            setValue("recipientName", state.recipientName || "Shakil");
            setValue("approvedBy", state.approvedBy || "Shakiqur");
        }
    }, [state, setValue]);

    const onSubmit = async (data: expensesForm) => {
        try {
            const res = await updateExpenses({
                id: state.id,
                ...data,
            }).unwrap();

            toast.success(res.message);

            navigate("/expenses");
        } catch (error) {
            toast.error(getErrorMessage(error));
            return;
        }
    };
    return (
        <div className="bg-white dark:bg-stone-700 p-4 sm:p-6 rounded-lg dark:text-gray-300">
            <h3 className="text-2xl font-semibold">Expense Information</h3>
            <form
                className="mt-5 space-y-4 *:flex *:flex-col *:gap-2"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <label htmlFor="date">
                        Date <span className="text-red-600">*</span>
                    </label>
                    <DatePicker
                        selected={
                            watch("date") ? new Date(watch("date")) : null
                        }
                        onChange={(date: Date | null) => {
                            if (date) {
                                setValue("date", date.toISOString(), {
                                    shouldValidate: true,
                                });
                            }
                        }}
                        dateFormat="dd-MM-yyyy"
                        className="border border-gray-300 w-full p-2 outline-none rounded-md"
                        placeholderText="Select a date"
                        id="date"
                    />

                    {errors.date && (
                        <span className="text-red-500 text-xs">
                            {errors.date.message}
                        </span>
                    )}
                </div>
                <div>
                    <label htmlFor="amount">
                        Amount <span className="text-red-600">*</span>
                    </label>
                    <input
                        {...register("amount")}
                        type="number"
                        name="amount"
                        id="amount"
                        className="border border-gray-300 w-full p-2 outline-none rounded-md"
                    />
                    {errors.amount && (
                        <span className="text-red-500 text-xs">
                            {errors.amount.message}
                        </span>
                    )}
                </div>
                <div>
                    <label htmlFor="tax">Tax</label>
                    <input
                        {...register("tax")}
                        type="number"
                        name="tax"
                        id="tax"
                        className="border border-gray-300 w-full p-2 outline-none rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="paymentMethod">
                        Payment Type <span className="text-red-600">*</span>
                    </label>
                    <select
                        {...register("paymentMethod")}
                        name="paymentMethod"
                        id="paymentMethod"
                        className="border border-gray-300 dark:bg-stone-500 w-full p-2 outline-none rounded-md"
                    >
                        <option value="CASH">Cash</option>
                        <option value="CARD">Card</option>
                        <option value="CHECK">Check</option>
                        <option value="BKASH">bKash</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="reason">Reason</label>
                    <textarea
                        {...register("reason")}
                        name="reason"
                        id="reason"
                        className="border border-gray-300 w-full p-2 outline-none rounded-md overflow-hidden resize-none min-h-[100px]"
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="recipientName">Recipient Name</label>
                    <select
                        {...register("recipientName")}
                        name="recipientName"
                        id="recipientName"
                        className="border border-gray-300 dark:text-gray-300 dark:bg-stone-500 w-full p-2 outline-none rounded-md"
                    >
                        <option value="Shakil">Shakil</option>
                        <option value="Mahdi">Mahdi</option>
                        <option value="Shakiqur">Shakiqur</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="approvedBy">Approved By</label>
                    <select
                        {...register("approvedBy")}
                        name="approvedBy"
                        id="approvedBy"
                        className="border border-gray-300 dark:bg-stone-500 w-full p-2 outline-none rounded-md"
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
                        {isLoading ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditExpensePage;
