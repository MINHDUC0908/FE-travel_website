import { useState } from "react";
import { X } from "lucide-react"; 
import authService from "../../../api/authService";
import { toast } from "react-toastify";
import { useAuthCus } from "../../Context/AuthContext";

export default function AuthModal({ setShow }) {
    const [isRegistering, setIsRegistering] = useState(true); 
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
                } else {
                    toast.error(loginResult.message);
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
                {/* Nút đóng */}
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
                    onClick={() => setShow(false)}
                >
                    <X size={24} />
                </button>

                {/* Tiêu đề */}
                <h2 className="text-2xl font-bold text-center text-gray-700">{isRegistering ? "Đăng ký" : "Đăng nhập"}</h2>
                <p className="text-sm text-gray-500 text-center">
                    {isRegistering ? "Tạo tài khoản mới để tiếp tục" : "Đăng nhập để tiếp tục"}
                </p>

                {/* Form */}
                <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                    {isRegistering && (
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Họ và tên</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none"
                                placeholder="Nhập họ và tên"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none"
                            placeholder="Nhập email"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Mật khẩu</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none"
                            placeholder="Nhập mật khẩu"
                            required
                        />
                    </div>

                    {isRegistering && (
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Nhập lại mật khẩu</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none"
                                placeholder="Nhập lại mật khẩu"
                                required
                            />
                        </div>
                    )}

                    {/* Nút Submit */}
                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg hover:opacity-90 transition"
                    >
                        {isRegistering ? "Đăng ký" : "Đăng nhập"}
                    </button>
                </form>

                {/* Chuyển đổi tab */}
                <p className="text-center text-sm text-gray-500 mt-4">
                    {isRegistering ? (
                        <>
                            Đã có tài khoản?{" "}
                            <button className="text-blue-600 hover:underline" onClick={() => setIsRegistering(false)}>
                                Đăng nhập
                            </button>
                        </>
                    ) : (
                        <>
                            Chưa có tài khoản?{" "}
                            <button className="text-blue-600 hover:underline" onClick={() => setIsRegistering(true)}>
                                Đăng ký
                            </button>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}
