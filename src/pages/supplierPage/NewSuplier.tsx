import { useRef } from "react";

const NewSuplier = () => {
    const commentsRef = useRef<HTMLTextAreaElement>(null);
    const internalNotesRef = useRef<HTMLTextAreaElement>(null);

    const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
        const textarea = event.currentTarget;
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    };
    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg">
            <h3 className="text-2xl font-semibold">Supplier Information</h3>

            <form className="mt-5 space-y-4 *:flex *:flex-col *:gap-2">
                <div>
                    <label htmlFor="companyName">Company Name</label>
                    <input
                        type="text"
                        name="companyName"
                        id="companyName"
                        className="border border-gray-300 w-full p-2 outline-none rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        className="border border-gray-300 w-full p-2 outline-none rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="border border-gray-300 w-full p-2 outline-none rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="address1">Address 1</label>
                    <textarea
                        name="address1"
                        id="address1"
                        className="border border-gray-300 w-full p-2 outline-none rounded-md overflow-hidden resize-none min-h-[100px]"
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="address2">Address 2</label>
                    <textarea
                        name="address2"
                        id="address2"
                        className="border border-gray-300 w-full p-2 outline-none rounded-md overflow-hidden resize-none min-h-[100px]"
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="comments">Comments</label>
                    <textarea
                        ref={commentsRef}
                        onInput={handleInput}
                        name="comments"
                        id="comments"
                        className="border border-gray-300 w-full p-2 outline-none rounded-md overflow-hidden resize-none min-h-[100px]"
                        placeholder="Enter your comment..."
                    />
                </div>
                <div>
                    <label htmlFor="internalNotes">Internal Notes</label>
                    <textarea
                        ref={internalNotesRef}
                        onInput={handleInput}
                        name="internalNotes"
                        id="internalNotes"
                        className="border border-gray-300 w-full p-2 outline-none rounded-md overflow-hidden resize-none min-h-[100px]"
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="account">Account</label>
                    <input
                        type="text"
                        name="account"
                        id="account"
                        className="border border-gray-300 w-full p-2 outline-none rounded-md"
                    />
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
