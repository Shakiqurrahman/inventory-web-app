import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { z } from "zod";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useGetEmployeeListQuery } from "../../redux/features/employees/employeeApi";
import type { IEmployee } from "../../redux/features/employees/employeeSlice";
import { useUpdateEmployeeSalaryMutation } from "../../redux/features/employeeSalary/employeeSalaryApi";
import {
    toggleEditEmployeeSalaryModal,
    type IEmployeeSalary,
} from "../../redux/features/employeeSalary/employeeSalarySlice";
import { getErrorMessage } from "../../utils/errorHandler";

const employeeSalarySchema = z.object({
    date: z
        .string()
        .min(1, "Date must be required")
        .refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date format",
        }),
    amount: z.coerce.number().min(1, "Amount must be required"),
    bonusAmount: z.coerce.number().optional(),
    approvedBy: z.string().min(1, "Approved By must be required"),
    reason: z.string().optional(),
    employee: z.string().min(1, "Employee must be required"),
});

type employeeSalaryForm = z.infer<typeof employeeSalarySchema>;

export type EditSalaryModalProps = {
    seletedData: {
        index: number;
        employee: IEmployeeSalary;
    };
};

const EditSalarymodal = ({
    seletedData: { employee },
}: EditSalaryModalProps) => {
   
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<employeeSalaryForm>({
        resolver: zodResolver(employeeSalarySchema),
        defaultValues: {
            date: employee?.date || "",
            amount: typeof employee.amount === "number" ? employee?.amount : 0,
            bonusAmount:
                typeof employee.bonusAmount === "number"
                    ? employee?.bonusAmount
                    : 0,
            reason: employee?.reason || "",
            approvedBy: employee?.approvedBy || "",
        },
    });

    const dispatch = useDispatch();
    const [updateEmployeeSalary, { isLoading }] =
        useUpdateEmployeeSalaryMutation();
    const formRef = useRef<HTMLDivElement>(null);
    const { data: getEmployeeList } = useGetEmployeeListQuery(null);

    useOutsideClick(formRef, () => {
        dispatch(toggleEditEmployeeSalaryModal());
    });

    const onSubmit = async (data: employeeSalaryForm) => {
        try {
            await updateEmployeeSalary({ id: employee.id, ...data });
            toast.success("Update Successful");
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
        dispatch(toggleEditEmployeeSalaryModal());
    };

    return (
        <div className="fixed top-0 left-0 w-full h-screen overflow-y-scroll bg-black/20 flex justify-center items-start z-[999] p-4">
            <div
                className="bg-white rounded-lg p-4 w-full max-w-[400px] mt-20 border border-gray-500"
                ref={formRef}
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">
                        Edit Employee Salary
                    </h2>
                    <button
                        onClick={() =>
                            dispatch(toggleEditEmployeeSalaryModal())
                        }
                        type="button"
                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                        <IoClose />
                    </button>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col">
                        <label className="block mb-2" htmlFor="date">
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
                                    }); // 🔥 use full ISO string
                                }
                            }}
                            dateFormat="dd-MM-yyyy"
                            className="border border-gray-300 w-full p-2 outline-none rounded-md"
                            placeholderText="Select a date"
                            id="date"
                            popperPlacement="top-start"
                        />
                        {errors.date && (
                            <span className="text-red-500 text-xs">
                                {errors.date.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <label className="block mb-2" htmlFor="">
                            Amount
                        </label>
                        <input
                            {...register("amount")}
                            name="amount"
                            type="number"
                            placeholder="Enter Amount"
                            className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 text-sm"
                        />
                        {errors.amount && (
                            <span className="text-red-500 text-xs">
                                {errors.amount.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2" htmlFor="">
                            Bonus Amount
                        </label>
                        <input
                            {...register("bonusAmount")}
                            name="bonusAmount"
                            type="number"
                            placeholder="Enter Bonus Amount"
                            className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="employee">Employee</label>
                        <select
                            {...register("employee")}
                            name="employee"
                            id="employee"
                            className="border border-gray-300 w-full p-2 outline-none rounded-md mt-2"
                        >
                            {getEmployeeList?.map(
                                (options: IEmployee, index: number) => (
                                    <option key={index} value={options.name}>
                                        {options.name}
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2" htmlFor="">
                            Reason
                        </label>
                        <input
                            {...register("reason")}
                            name="reason"
                            type="text"
                            placeholder="Reason for the salary"
                            className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block mb-2" htmlFor="">
                            Approved By
                        </label>
                        <input
                            {...register("approvedBy")}
                            name="approvedBy"
                            type="text"
                            placeholder="Approved By"
                            className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 text-sm"
                        />
                        {errors.approvedBy && (
                            <span className="text-red-500 text-xs">
                                {errors.approvedBy.message}
                            </span>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 cursor-pointer text-sm"
                        >
                            {isLoading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditSalarymodal;
