import { useRef, useState } from "react";

const ResetPasswordOtp = () => {
    const CODE_LENGTH = 6;
    const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
    const inputRefs = useRef<HTMLInputElement[]>([]);

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return; // Acept only one digit

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < CODE_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();

        const pastedData = e.clipboardData.getData("text").trim();

        // check if all charecter are digits
        if (/^\d+$/.test(pastedData)) {
            const digits = pastedData?.slice(0, CODE_LENGTH).split(""); // only first six

            const newCode = [...code];
            for (let i = 0; i < digits.length; i++) {
                newCode[i] = digits[i];
                inputRefs.current[i]?.focus();
            }

            setCode(newCode);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-green-100 px-4">
            <div className="bg-white p-8 rounded-xl shadow-md w-full  sm:w-[360px] text-center">
                <div className="mb-4 flex justify-center">
                    <img src="/icon.png" alt="verification" className="h-10" />
                </div>

                <h2 className="text-2xl font-semibold mb-2">
                    Verification Code
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                    Enter the 6 digit code sent to your email
                </p>

                <div className="flex justify-center gap-2 mb-6">
                    {code.map((digit, idx) => (
                        <input
                            key={idx}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, idx)}
                            onKeyDown={(e) => handleKeyDown(e, idx)}
                            onPaste={(e) => handlePaste(e)}
                            ref={(el) => (inputRefs.current[idx] = el)}
                            className="w-10 h-12 text-center border border-gray-300 rounded-md text-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordOtp;
