import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { z } from "zod";
import useOutsideClick from "../../hooks/useOutsideClick";
import {
    createBankDeposite,
    toggleCreateDepositeModal,
    toggleWithdrawModal,
} from "../../redux/features/bankDeposite/bankDepositeSlice";

const bankDepositeSchema = z.object({
    date: z
        .string()
        .min(1, "Date must be required")
        .refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date format",
        }),
    amount: z.coerce.number().min(1, "Amount must be required"),
    transectionId: z.string().min(1, "Transection ID must be required"),
    accountNumber: z.string().optional(),
    bankName: z.string().min(1, "Bank name must be required"),
    reason: z.string().optional(),
});

type bankDepositeForm = z.infer<typeof bankDepositeSchema>;

const WithdrawModal = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<bankDepositeForm>({
        resolver: zodResolver(bankDepositeSchema),
    });

    const dispatch = useDispatch();
    const formRef = useRef<HTMLDivElement>(null);

    useOutsideClick(formRef, () => {
        dispatch(toggleWithdrawModal());
    });

    const onSubmit = (data: bankDepositeForm) => {
        // console.log(data);

        dispatch(createBankDeposite(data));
        dispatch(toggleCreateDepositeModal());
    };

    return (
        <div className="fixed top-0 left-0 w-full h-screen overflow-y-scroll bg-black/20 flex justify-center items-start z-[999] p-4">
            <div
                className="bg-white rounded-lg p-4 w-full max-w-[400px] mt-20 border border-gray-500"
                ref={formRef}
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">Withdraw Balance</h2>
                    <button
                        onClick={() => dispatch(toggleWithdrawModal())}
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
                            Transection ID
                        </label>
                        <input
                            {...register("transectionId")}
                            name="transectionId"
                            type="text"
                            placeholder="Enter transection ID"
                            className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 text-sm"
                        />
                        {errors.transectionId && (
                            <span className="text-red-500 text-xs">
                                {errors.transectionId.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2" htmlFor="">
                            Bank Name
                        </label>
                        <input
                            {...register("bankName")}
                            name="bankName"
                            type="text"
                            placeholder="Enter Bank Name"
                            className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 text-sm"
                        />
                        {errors.bankName && (
                            <span className="text-red-500 text-xs">
                                {errors.bankName.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2" htmlFor="">
                            Account Number
                        </label>
                        <input
                            {...register("accountNumber")}
                            name="accountNumber"
                            type="text"
                            placeholder="Enter Account Number"
                            className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 text-sm"
                        />
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
                            Reason
                        </label>
                        <input
                            {...register("reason")}
                            name="reason"
                            type="text"
                            placeholder="Reason for the deposit"
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

export default WithdrawModal;
