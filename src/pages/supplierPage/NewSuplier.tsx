import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { z } from "zod";
import { setSupplierData } from "../../redux/features/suppliers/supplierSlice";

const supplierSchema = z.object({
    companyName: z.string().min(1, "Company Name must be required"),
    fullName: z.string().min(1, "Name must be required"),
    phone: z
        .string()
        .min(1, "Phone Number must be required")
        .regex(/^\d+$/, "Phone number must contain only digits"),
    email: z
        .string()
        .min(1, "Email must be Required")
        .email("Give a valid email."),
    address1: z.string().min(1, "Address 1 must be required"),
    address2: z.string().optional(),
    comments: z.string().optional(),
    internalNotes: z.string().optional(),
    account: z.string().min(1, "Account must be required"),
});

type supplierForm = z.infer<typeof supplierSchema>;

const NewSuplier = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<supplierForm>({
        resolver: zodResolver(supplierSchema),
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data: supplierForm) => {
        console.log(data);
        dispatch(setSupplierData(data));
        navigate("/suppliers");
    };

    const commentsRef = useRef<HTMLTextAreaElement>(null);
    const internalNotesRef = useRef<HTMLTextAreaElement>(null);

    const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
        const textarea = event.currentTarget;
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    };
    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg">
            <h3 className="font-medium text-lg mb-4">Supplier Information</h3>

            <form
                className="mt-5 space-y-4 *:flex *:flex-col *:gap-2"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <label htmlFor="companyName" className="text-sm">
                        Company Name
                    </label>
                    <input
                        {...register("companyName")}
                        type="text"
                        name="companyName"
                        id="companyName"
                        className="border border-gray-300 w-full p-2 outline-none rounded-md text-sm"
                    />
                    {errors.companyName && (
                        <p className="text-red-500 text-xs">
                            {errors.companyName.message}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="fullName" className="text-sm">
                        Full Name
                    </label>
                    <input
                        {...register("fullName")}
                        type="text"
                        name="fullName"
                        id="fullName"
                        className="border border-gray-300 w-full p-2 outline-none rounded-md text-sm"
                    />
                    {errors.fullName && (
                        <p className="text-red-500 text-xs">
                            {errors.fullName.message}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="email" className="text-sm">
                        Email
                    </label>
                    <input
                        {...register("email")}
                        type="text"
                        name="email"
                        id="email"
                        className="border border-gray-300 w-full p-2 outline-none rounded-md text-sm"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="phone" className="text-sm">
                        Phone
                    </label>
                    <input
                        {...register("phone")}
                        type="text"
                        name="phone"
                        id="phone"
                        className="border border-gray-300 w-full p-2 outline-none rounded-md text-sm"
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-xs">
                            {errors.phone.message}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="address1" className="text-sm">
                        Address 1
                    </label>
                    <textarea
                        {...register("address1")}
                        name="address1"
                        id="address1"
                        className="border border-gray-300 w-full p-2 outline-none rounded-md overflow-hidden resize-none min-h-[100px] text-sm"
                    ></textarea>
                    {errors.address1 && (
                        <p className="text-red-500 text-xs">
                            {errors.address1.message}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="address2" className="text-sm">
                        Address 2 (optional)
                    </label>
                    <textarea
                        {...register("address2")}
                        name="address2"
                        id="address2"
                        className="border border-gray-300 w-full p-2 outline-none rounded-md overflow-hidden resize-none min-h-[100px] text-sm"
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="comments" className="text-sm">
                        Comments
                    </label>
                    <textarea
                        {...register("comments")}
                        ref={commentsRef}
                        onInput={handleInput}
                        name="comments"
                        id="comments"
                        className="border border-gray-300 w-full p-2 outline-none rounded-md overflow-hidden resize-none min-h-[100px] text-sm"
                        placeholder="Enter your comment..."
                    />
                </div>
                <div>
                    <label htmlFor="internalNotes" className="text-sm">
                        Internal Notes
                    </label>
                    <textarea
                        {...register("internalNotes")}
                        ref={internalNotesRef}
                        onInput={handleInput}
                        name="internalNotes"
                        id="internalNotes"
                        className="border border-gray-300 w-full p-2 outline-none rounded-md overflow-hidden resize-none min-h-[100px] text-sm"
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="account" className="text-sm">
                        Account
                    </label>
                    <input
                        {...register("account")}
                        type="text"
                        name="account"
                        id="account"
                        className="border border-gray-300 w-full p-2 outline-none rounded-md text-sm"
                    />
                    {errors.account && (
                        <p className="text-red-500 text-xs">
                            {errors.account.message}
                        </p>
                    )}
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

export default NewSuplier;
