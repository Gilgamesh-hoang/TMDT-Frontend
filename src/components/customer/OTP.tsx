import React, {FC, useRef, useState} from "react";
import {useForgotPasswordMutation} from "@/api/customerApi/user.ts";
import {toastError, toastSuccess} from "@/lib/utils.ts";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "@/types/constant.ts";
import Loader from "@/components/ui/Loader.tsx";

interface OTPProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OTP: FC<OTPProps> = ({setIsModalOpen}) => {
    const [otp, setOtp] = useState(Array(5).fill("")); // Array with 5 empty strings
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [forgotPassword, {isLoading}] = useForgotPasswordMutation();
    const navigate = useNavigate()

    const handleKeyDown = (e) => {
        if (
            !/^[0-9]{1}$/.test(e.key) &&
            e.key !== "Backspace" &&
            e.key !== "Delete" &&
            e.key !== "Tab" &&
            !e.metaKey
        ) {
            e.preventDefault();
        }

        if (e.key === "Delete" || e.key === "Backspace") {
            const index = inputRefs.current.indexOf(e.target);
            // Xóa số tại vị trí hiện tại
            setOtp((prevOtp) => {
                const newOtp = [...prevOtp];
                newOtp[index] = ""; // Xóa số tại vị trí con trỏ
                return newOtp;
            });

            // Chuyển focus về ô trước đó nếu không phải ô đầu tiên
            if (e.key === "Backspace" && index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const handleInput = (e) => {
        const {target} = e;
        const index = inputRefs.current.indexOf(target);
        if (target.value) {
            setOtp((prevOtp) => [
                ...prevOtp.slice(0, index),
                target.value,
                ...prevOtp.slice(index + 1),
            ]);
            if (index < otp.length - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleFocus = (e) => {
        e.target.select();
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text");
        if (!new RegExp(`^[0-9]{${otp.length}}$`).test(text)) {
            return;
        }
        const digits = text.split("");
        setOtp(digits);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle OTP submission
        const otpString = otp.join("");
        if (otpString.length !== 5) {
            toastError('Vui lòng nhập đủ 5 số', 2000)
            return;
        }

        // Call the API to verify OTP
        forgotPassword({otp: otpString}).unwrap()
            .then(() => {
                // Handle success
                // setIsModalOpen(false);
                toastSuccess('Đã khôi phục mật khẩu, vui lòng kiểm tra email', 2000)
                navigate(ROUTES.LOGIN)

            })
            .catch((error) => {
                toastError('Mã OTP không hợp lệ', 2000)
            });

    };

    return (
        <div className="fixed inset-0  z-[1] flex items-center justify-center backdrop-blur">
            <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-dark">
                {/* Nút đóng modal */}
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>

                {/* Nội dung modal */}
                <div className="flex flex-col items-center">
                    {/* Tiêu đề */}
                    <h2 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">
                        Nhập Mã OTP
                    </h2>

                    {/* Mô tả */}
                    <p className="mb-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        Vui lòng kiểm tra email để nhận mã OTP.
                    </p>

                    {/* Form OTP */}
                    <form id="otp-form" onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                        <div className="flex gap-2">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={handleInput}
                                    onKeyDown={handleKeyDown}
                                    onFocus={handleFocus}
                                    onPaste={handlePaste}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    className="h-14 w-14 rounded-lg border border-stroke bg-white p-2 text-center text-2xl font-medium text-gray-800 outline-none focus:border-blue-500 dark:border-dark-3 dark:bg-white/5 dark:text-white"
                                />
                            ))}
                        </div>

                        {/* Nút "Xác nhận" */}
                        <button
                            type="submit"
                            className="w-full rounded-full bg-orange-200 px-6 py-3 text-gray-800 hover:bg-orange-300 dark:bg-orange-300 dark:hover:bg-orange-400"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader/>
                            ) : (
                                "Xác nhận"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default OTP;