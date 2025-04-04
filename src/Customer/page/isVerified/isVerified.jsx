import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa"; // Import icons từ react-icons

function IsVerified() {
    const { verificationToken } = useParams(); // Lấy token từ URL
    const [message, setMessage] = useState("Đang xác thực email của bạn..."); // Trạng thái thông báo
    const [status, setStatus] = useState("loading"); // Trạng thái: loading, success, error

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/auth/verify-email/${verificationToken}`);
                if (response.data.success) {
                    setMessage("✅ Xác thực email thành công! Bạn có thể đăng nhập ngay bây giờ.");
                    setStatus("success");
                } else {
                    setMessage("❌ Xác thực thất bại! Token không hợp lệ hoặc đã hết hạn.");
                    setStatus("error");
                }
            } catch (error) {
                setMessage("❌ Lỗi trong quá trình xác thực. Vui lòng thử lại sau.");
                setStatus("error");
            }
        };

        verifyEmail();
    }, [verificationToken]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center transform transition-all duration-300">
                {/* Header */}
                <h1 className="text-3xl font-bold text-blue-800 mb-6">Xác Thực Email</h1>

                {/* Loading Spinner */}
                {status === "loading" && (
                    <div className="flex justify-center mb-6">
                        <FaSpinner className="w-12 h-12 text-blue-500 animate-spin" />
                    </div>
                )}

                {/* Success Icon */}
                {status === "success" && (
                    <div className="flex justify-center mb-6">
                        <FaCheckCircle className="w-16 h-16 text-green-500 animate-bounce" />
                    </div>
                )}

                {/* Error Icon */}
                {status === "error" && (
                    <div className="flex justify-center mb-6">
                        <FaTimesCircle className="w-16 h-16 text-red-500 animate-pulse" />
                    </div>
                )}

                {/* Message */}
                <p
                    className={`text-lg ${
                        status === "success"
                            ? "text-green-600"
                            : status === "error"
                            ? "text-red-600"
                            : "text-gray-600"
                    } mb-6`}
                >
                    {message}
                </p>

                {/* Button */}
                {status !== "loading" && (
                    <a
                        href="/login"
                        className={`inline-block px-6 py-3 rounded-lg font-medium text-white transition-all duration-300 transform hover:-translate-y-1 ${
                            status === "success"
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {status === "success" ? "Đăng Nhập Ngay" : "Quay Lại Trang Chủ"}
                    </a>
                )}

                {/* Additional Info */}
                {status === "error" && (
                    <p className="mt-4 text-sm text-gray-500">
                        Nếu bạn gặp vấn đề, vui lòng liên hệ{" "}
                        <a href="mailto:support@viettravel.com" className="text-blue-600 hover:underline">
                            support@viettravel.com
                        </a>
                    </p>
                )}
            </div>
        </div>
    );
}

export default IsVerified;