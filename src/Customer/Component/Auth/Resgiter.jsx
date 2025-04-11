import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";
import authService from "../../../api/authService";
import { toast } from "react-toastify";
import { useAuthCus } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:3000"; // Adjust to your backend URL

export default function Register({ setShow }) {
    const [isRegistering, setIsRegistering] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const navigate = useNavigate();

    const { login } = useAuthCus();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegistering) {
                const res = await authService.register(name, email, password, confirmPassword);
                if (res?.data?.success) {
                    toast.success(res.data.message);
                } else {
                    toast.error(res?.data?.message || "Đăng ký thất bại");
                }
            } else {
                const loginResult = await login(email, password);
                if (loginResult.success) {
                    toast.success("Đăng nhập thành công!");
                    setShow(false);
                } else {
                    toast.error(loginResult?.message || "Đăng nhập thất bại");
                }
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại!");
        }
    };

    const handleGoogleLogin = () => {
        setIsGoogleLoading(true);
        window.location.href = `${API_BASE_URL}/auth/google`;
    };


    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            toast.success("Đăng nhập bằng Google thành công!");
            navigate("/");
            localStorage.setItem("accessToken", token);
            setShow(false);
        }
        setIsGoogleLoading(false);
    }, [navigate, setShow]);
    const handleFacebookLogin = () => {
        toast.info("Tính năng đăng nhập bằng Facebook đang phát triển!");
    };

    const handleGithubLogin = () => {
        toast.info("Tính năng đăng nhập bằng GitHub đang phát triển!");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-6">
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 transform transition-all duration-300 scale-100">
                {/* Gradient Border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-1 -z-10">
                    <div className="bg-white rounded-3xl h-full w-full"></div>
                </div>

                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-transform duration-200 hover:rotate-90"
                    onClick={() => setShow(false)}
                >
                    <X size={28} />
                </button>

                {/* Title */}
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
                    {isRegistering ? "Đăng Ký" : "Đăng Nhập"}
                </h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                    {isRegistering ? "Tạo tài khoản để bắt đầu hành trình" : "Đăng nhập để tiếp tục trải nghiệm"}
                </p>

                {/* Form */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {isRegistering && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition duration-200"
                                placeholder="Nhập họ và tên"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition duration-200"
                            placeholder="Nhập email của bạn"
                            required
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition duration-200"
                            placeholder="Nhập mật khẩu"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-10 text-gray-500 hover:text-gray-700 transition"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
                        </button>
                    </div>

                    {isRegistering && (
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nhập lại mật khẩu</label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition duration-200"
                                placeholder="Xác nhận mật khẩu"
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-10 text-gray-500 hover:text-gray-700 transition"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
                            </button>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-semibold shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        {isRegistering ? "Đăng Ký" : "Đăng Nhập"}
                    </button>
                </form>

                {/* Social Login Section */}
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Hoặc đăng nhập với</span>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-3">
                        <button
                            onClick={handleGoogleLogin}
                            disabled={isGoogleLoading}
                            className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-xl bg-white hover:bg-gray-50 transition duration-200 shadow-sm disabled:opacity-50"
                        >
                            <FcGoogle size={24} />
                            {isGoogleLoading && <span className="ml-2">Đang tải...</span>}
                        </button>
                        <button
                            onClick={handleFacebookLogin}
                            className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-xl bg-white hover:bg-gray-50 transition duration-200 shadow-sm"
                        >
                            <FaFacebook size={24} className="text-blue-600" />
                        </button>
                        <button
                            onClick={handleGithubLogin}
                            className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-xl bg-white hover:bg-gray-50 transition duration-200 shadow-sm"
                        >
                            <FaGithub size={24} className="text-gray-800" />
                        </button>
                    </div>
                </div>

                <p className="text-center text-sm text-gray-600 mt-6">
                    {isRegistering ? (
                        <>
                            Đã có tài khoản?{" "}
                            <button
                                className="text-blue-600 font-medium hover:underline hover:text-blue-800 transition"
                                onClick={() => setIsRegistering(false)}
                            >
                                Đăng nhập ngay
                            </button>
                        </>
                    ) : (
                        <>
                            Chưa có tài khoản?{" "}
                            <button
                                className="text-blue-600 font-medium hover:underline hover:text-blue-800 transition"
                                onClick={() => setIsRegistering(true)}
                            >
                                Đăng ký ngay
                            </button>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}