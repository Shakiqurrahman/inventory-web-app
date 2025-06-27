import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";
import {
    useGetStoreConfigDataQuery,
    useSaveStoreConfigDataMutation,
} from "../../redux/features/storeConfig/storeConfigApi";
import { getErrorMessage } from "../../utils/errorHandler";

const StoreConfigPage = () => {
    const { data, isLoading } = useGetStoreConfigDataQuery(null);

    const [saveConfig, { isLoading: isSaving }] =
        useSaveStoreConfigDataMutation();

    const [form, setForm] = useState({
        companyName: "",
        companyAddress: "",
        mobileNo: "",
        companyWebsite: "",
    });

    useEffect(() => {
        if (!isLoading && data) {
            setForm((prev) => ({ ...prev, ...data }));
        }
    }, [data, isLoading]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const { companyAddress, companyName, mobileNo } = form;
        if (companyAddress && companyName && mobileNo) {
            try {
                await saveConfig(form).unwrap();
                toast.success("Save shanges successfull,");
            } catch (error) {
                toast.error(getErrorMessage(error));
            }
        } else {
            toast.error("Please fillup all required field.");
        }
    };

    return isLoading ? (
        <div className="p-4 bg-white dark:bg-stone-700 dark:text-gray-300">Loading...</div>
    ) : (
        <div className="bg-white dark:bg-stone-700">
            <h1 className="px-4 py-2 bg-[#F9F9F9] dark:bg-stone-500 border-t border-b border-gray-300 dark:border-gray-500 dark:text-gray-200 font-medium text-base sm:text-lg">
                Company Information
            </h1>
            <div className="p-4">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                        <label
                            htmlFor="companyName"
                            className={`shrink-0 w-full sm:w-[200px] sm:text-right ${
                                form.companyName
                                    ? "text-green-700 dark:text-gray-300"
                                    : "text-red-400"
                            }`}
                        >
                            Company Name:
                        </label>
                        <input
                            name="companyName"
                            id="companyName"
                            type="text"
                            value={form.companyName}
                            onChange={handleChange}
                            className="border border-gray-200 w-full outline-none p-2"
                        />
                    </div>
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                        <label
                            htmlFor="companyAddress"
                            className={`shrink-0 w-full sm:w-[200px] sm:text-right ${
                                form.companyAddress
                                    ? "text-green-700 dark:text-gray-300"
                                    : "text-red-400"
                            }`}
                        >
                            Company Address:
                        </label>
                        <input
                            name="companyAddress"
                            id="companyAddress"
                            type="text"
                            value={form.companyAddress}
                            onChange={handleChange}
                            className="border border-gray-200 w-full outline-none p-2"
                        />
                    </div>
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                        <label
                            htmlFor="mobileNo"
                            className={`shrink-0 w-full sm:w-[200px] sm:text-right ${
                                form.mobileNo
                                    ? "text-green-700 dark:text-gray-300"
                                    : "text-red-400"
                            }`}
                        >
                            Mobile No:
                        </label>
                        <input
                            name="mobileNo"
                            id="mobileNo"
                            type="text"
                            value={form.mobileNo}
                            onChange={handleChange}
                            className="border border-gray-200 w-full outline-none p-2"
                        />
                    </div>
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                        <label
                            htmlFor="companyWebsite"
                            className="shrink-0 w-full sm:w-[200px] sm:text-right dark:text-gray-300"
                        >
                            Website:
                        </label>
                        <input
                            name="companyWebsite"
                            id="companyWebsite"
                            type="text"
                            value={form?.companyWebsite || ""}
                            onChange={handleChange}
                            className="border border-gray-200 w-full outline-none p-2"
                        />
                    </div>
                    <div className="flex gap-2 justify-between mt-10">
                        <button
                            type="button"
                            disabled={isSaving}
                            className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm cursor-pointer disabled:bg-primary/50"
                        >
                            Backup Database
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="px-5 py-2 bg-primary hover:bg-secondary text-white text-sm cursor-pointer disabled:bg-primary/50"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StoreConfigPage;
