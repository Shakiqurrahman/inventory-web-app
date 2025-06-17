import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import { z } from "zod";
import { useUpdateEmployeeMutation } from "../../redux/features/employees/employeeApi";
import { getErrorMessage } from "../../utils/errorHandler";

const employeeSchema = z.object({
    name: z.string().min(1, "Company Name must be required"),
    phone: z
        .string()
        .min(1, "Phone Number must be required")
        .regex(/^\d+$/, "Phone number must contain only digits"),
    email: z
        .string()
        .min(1, "Email must be Required")
        .email("Give a valid email."),
    address: z.string().min(1, "Address 1 must be required"),
    role: z.enum(["STAFF", "MANAGER"], {
        errorMap: () => ({ message: "Role must be either Staff or Manager" }),
    }),
    salary: z.string().optional(),
});

type employeeForm = z.infer<typeof employeeSchema>;

const EditEmployeePage = () => {
    const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();
    const { state } = useLocation();
    const navigate = useNavigate();

    // Assuming employees is an object with employee details
    const employees = {
        name: state?.name || "",
        phone: state?.phone || "",
        email: state?.email || "",
        address: state?.address || "",
        role: state?.role || "STAFF",
        salary: state?.salary || "",
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<employeeForm>({
        resolver: zodResolver(employeeSchema),
        defaultValues: employees,
    });

    const onSubmit = async (data: employeeForm) => {
        const { salary, ...restData } = data;

        try {
            await updateEmployee({
                id: state?.id,
                salary: salary ? parseFloat(salary) : undefined,
                ...restData,
            }).unwrap();
            toast.success("Employee updated successfully");
            navigate("/employees");
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg">
            <h3 className="text-2xl font-semibold">Employee Information</h3>
            <form
                className="mt-5 space-y-4 *:flex *:flex-col *:gap-2"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <label htmlFor="name">
                        Employee Name <span className="text-red-600">*</span>
                    </label>
                    <input
                        {...register("name")}
                        type="text"
                        name="name"
                        id="name"
                        className="border border-gray-300 w-full p-2 outline-none rounded-md"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-xs">
                            {errors.name.message}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        {...register("email")}
                        type="text"
                        name="email"
                        id="email"
                        className="border border-gray-300 w-full p-2 outline-none rounded-md"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="phone">
                        Phone Number <span className="text-red-600">*</span>
                    </label>
                    <input
                        {...register("phone")}
                        type="text"
                        name="phone"
                        id="phone"
                        className="border border-gray-300 w-full p-2 outline-none rounded-md"
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-xs">
                            {errors.phone.message}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="salary">Salary</label>
                    <input
                        {...register("salary")}
                        type="number"
                        name="salary"
                        id="salary"
                        className="border border-gray-300 w-full p-2 outline-none rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <textarea
                        {...register("address")}
                        name="address"
                        id="address"
                        className="border border-gray-300 w-full p-2 outline-none rounded-md overflow-hidden resize-none min-h-[100px]"
                    ></textarea>
                    {errors.address && (
                        <p className="text-red-500 text-xs">
                            {errors.address.message}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="role">
                        Employee Role <span className="text-red-600">*</span>
                    </label>
                    <select
                        {...register("role")}
                        name="role"
                        id="role"
                        defaultValue="Staff"
                        className="border border-gray-300 w-full p-2 outline-none rounded-md"
                    >
                        <option value="STAFF">Staff</option>
                        <option value="MANAGER">Manager</option>
                    </select>
                    {errors.role && (
                        <p className="text-red-500 text-xs">
                            {errors.role.message}
                        </p>
                    )}
                </div>
                <div className="!flex-row gap-2 mt-4 !justify-end">
                    <button
                        type="submit"
                        className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md"
                    >
                        {isLoading ? "Updating..." : "Update"}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/employees")}
                        className="cursor-pointer bg-gray-300 text-white py-2 px-4 rounded-md"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditEmployeePage;
