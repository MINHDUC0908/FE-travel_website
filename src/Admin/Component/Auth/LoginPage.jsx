import React, { useState } from "react";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { useUser } from "../../Context/AuthContext";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useUser();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        const result = await login(email, password);
        if (result.success) {
            window.location.href = "/admin/dashboard";
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-100 px-4 py-16">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center text-white">
                    <h2 className="text-4xl font-extrabold tracking-tight">Đăng Nhập</h2>
                    <p className="mt-2 text-blue-100 opacity-80">Truy cập tài khoản của bạn</p>
                </div>

                <form onSubmit={handleLogin} className="p-8 space-y-6">
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg shadow-md">
                            <p className="font-medium">{error}</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400 transition-colors" />
                            </div>
                            <input 
                                type="email" 
                                placeholder="Email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                    transition-all duration-300 ease-in-out 
                                    hover:shadow-md hover:border-blue-300"
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400 transition-colors" />
                            </div>
                            <input 
                                type="password" 
                                placeholder="Mật khẩu" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                    transition-all duration-300 ease-in-out 
                                    hover:shadow-md hover:border-blue-300"
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                            py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 
                            transition-all duration-300 ease-in-out transform 
                            hover:-translate-y-1 hover:shadow-xl 
                            flex items-center justify-center space-x-2 
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <span>Đăng Nhập</span>
                        <ArrowRight className="h-5 w-5" />
                    </button>

                    <div className="text-center">
                        <a 
                            href="/forgot-password" 
                            className="text-sm text-blue-600 hover:text-blue-800 
                                transition-colors duration-300 hover:underline"
                        >
                            Quên mật khẩu?
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;