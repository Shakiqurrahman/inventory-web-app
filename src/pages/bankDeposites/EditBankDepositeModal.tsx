import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { z } from "zod";
import useOutsideClick from "../../hooks/useOutsideClick";
import {
    useGetSingleBankDepositQuery,
    useUpdateBankDepositeMutation,
} from "../../redux/features/bankDeposite/bankDepositeApi";
import { toggleEditDepositeModal } from "../../redux/features/bankDeposite/bankDepositeSlice";
import { getErrorMessage } from "../../utils/errorHandler";
import { formatDateToLongDate } from "../../utils/timeFormatHandler";

const bankDepositeSchema = z.object({
    date: z
        .string()
        .min(1, "Date must be required")
        .refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date format",
        }),
    amount: z.coerce.number().min(1, "Amount must be required"),
    transactionId: z.string().min(1, "Transection ID must be required"),
    accountNumber: z.string().optional(),
    bankName: z.string().min(1, "Bank name must be required"),
    reason: z.string().optional(),
    transactionType: z.enum(["WITHDRAW", "DEPOSIT"]),
});

type bankDepositeForm = z.infer<typeof bankDepositeSchema>;

const EditBankDepositeModal = ({ dataId }: { dataId: string }) => {
    const { data, isLoading: isDataLoading } = useGetSingleBankDepositQuery(
        dataId,
        {
            skip: !dataId,
        }
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset,
    } = useForm<bankDepositeForm>({
        resolver: zodResolver(bankDepositeSchema),
        defaultValues: {
            date: "",
            amount: 0,
            transactionId: "",
            accountNumber: "",
            bankName: "",
            reason: "",
            transactionType: "DEPOSIT",
        },
    });

    const [updateBankDeposite, { isLoading }] = useUpdateBankDepositeMutation();

    const dispatch = useDispatch();
    const formRef = useRef<HTMLDivElement>(null);

    useOutsideClick(formRef, () => {
        dispatch(toggleEditDepositeModal());
    });

    useEffect(() => {
        if (data && !isDataLoading) {
            const date = data?.date && formatDateToLongDate(data?.date);
            const defaultValues = {
                date: date || "",
                amount: data?.amount || 0,
                transactionId: data?.transactionId || "",
                accountNumber: data?.accountNumber || "",
                bankName: data?.bankName || "",
                reason: data?.reason || "",
                transactionType: data?.transactionType || "DEPOSIT",
            };
            reset(defaultValues);
        }
    }, [data, isDataLoading, reset]);

    const onSubmit = async (data: bankDepositeForm) => {
        try {
            const res = await updateBankDeposite({
                id: dataId,
                ...data,
            }).unwrap();
            toast.success(res.message);
            dispatch(toggleEditDepositeModal());
        } catch (error) {
            dispatch(toggleEditDepositeModal());
            toast.error(getErrorMessage(error));
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-screen overflow-y-scroll bg-black/20 flex justify-center items-start z-[999] p-4">
            <div
                className="bg-white rounded-lg p-4 w-full max-w-[400px] mt-20 border border-gray-500"
                ref={formRef}
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">
                        Edit Bank Transaction
                    </h2>
                    <button
                        onClick={() => dispatch(toggleEditDepositeModal())}
                        type="button"
                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                        <IoClose />
                    </button>
                </div>

                {isDataLoading ? (
                    <div>Loading...</div>
                ) : (
                    <form
                        className="space-y-4"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="flex flex-col">
                            <label className="block mb-2" htmlFor="date">
                                Date <span className="text-red-600">*</span>
                            </label>

                            <DatePicker
                                selected={
                                    watch("date")
                                        ? new Date(watch("date"))
                                        : null
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
                                Transection Type
                            </label>
                            <select
                                id="transactionType"
                                {...register("transactionType")}
                                className="border border-gray-300 w-full p-2 outline-none rounded-md"
                            >
                                <option value="DEPOSIT">Deposite</option>
                                <option value="WITHDRAW">Withdraw</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2" htmlFor="">
                                Transection ID
                            </label>
                            <input
                                {...register("transactionId")}
                                name="transactionId"
                                type="text"
                                placeholder="Enter transection ID"
                                className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 text-sm"
                            />
                            {errors.transactionId && (
                                <span className="text-red-500 text-xs">
                                    {errors.transactionId.message}
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
                                step="any"
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
                                placeholder={`Reason for the ${
                                    watch("transactionType") === "DEPOSIT"
                                        ? "deposit"
                                        : "withdraw"
                                }`}
                                className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 text-sm"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-blue-500 disabled:bg-blue-500/50 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 cursor-pointer text-sm"
                                disabled={isLoading}
                            >
                                {isLoading ? "Updating..." : "Update"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EditBankDepositeModal;
