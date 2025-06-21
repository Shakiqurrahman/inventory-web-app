import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { ClipLoader } from "react-spinners";
import {
    useForgotPasswordMutation,
    useVerifyOtpMutation,
} from "../../redux/features/auth/authApi";
import { setResetToken } from "../../redux/features/auth/resetPasswordSlice";
import { getErrorMessage } from "../../utils/errorHandler";

const ResetPasswordOtp = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const email = location.state?.email;
    const CODE_LENGTH = 6;
    const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
    const [forgetPassword, { isLoading: isSending }] =
        useForgotPasswordMutation();

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return; // Acept only one digit

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < CODE_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        if (newCode.every((digit) => digit !== "")) {
            handleSubmit();
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
        const cleanData = pastedData.replace(/\s+/g, "");

        if (/^\d+$/.test(cleanData)) {
            const digits = cleanData.slice(0, CODE_LENGTH).split("");
            const newCode = [...code];

            for (let i = 0; i < digits.length; i++) {
                newCode[i] = digits[i];
                inputRefs.current[i]?.focus();
            }

            setCode(newCode);

            // ✅ Call handleSubmit with the latest value
            if (newCode.every((digit) => digit !== "")) {
                const otpCode = newCode.join("");

                handleSubmit(otpCode);
            }
        }
    };

    const handleSubmit = async (otpCodeFromPaste?: string) => {
        const otpCode = otpCodeFromPaste || code.join("");

        try {
            const result = await verifyOtp({ email, otp: otpCode }).unwrap();

            if (result.success) {
                dispatch(setResetToken(result.data));
                navigate("/new-password");
            }
            toast.success("Token verification Successful");
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    const resendOtp = async () => {
        const response = await forgetPassword(email).unwrap();
        toast.success(response.message);
    };

    const isCodeComplete = code.every((char) => char !== "");

    return (
        <div className="flex justify-center items-center min-h-screen px-4">
            <div className="bg-gray-50 p-8 rounded-xl shadow-md w-full  sm:w-[360px] text-center">
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
                            ref={(el) => {
                                inputRefs.current[idx] = el;
                            }}
                            className="w-10 h-12 text-center border border-gray-300 rounded-md text-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    ))}
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-md disabled:opacity-50 cursor-pointer"
                        disabled={!isCodeComplete}
                        onClick={() => handleSubmit()}
                    >
                        {isVerifying ? (
                            <ClipLoader size={20} color="#fff" />
                        ) : (
                            "Confirm Code"
                        )}
                    </button>
                    <button
                        className="text-blue-600 hover:underline text-sm cursor-pointer"
                        onClick={resendOtp}
                    >
                        {isSending ? "Sending..." : "Resend"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordOtp;
