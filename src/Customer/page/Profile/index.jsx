import { useAuthCus } from "../../Context/AuthContext";
import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import { FaUser, FaHistory, FaHeart, FaPen, FaBars, FaSignOutAlt } from "react-icons/fa";
import { src } from "../../../../Api";

function Profile() {
    const { user, loading } = useAuthCus();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-blue-50">
            <header className="bg-blue-400 text-white fixed top-0 left-0 right-0 z-20 shadow-lg">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-wide">Travel Profile</h1>
                    <button
                        className="md:hidden p-2 rounded-full hover:bg-blue-500 transition-colors duration-300"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <FaBars className="w-6 h-6" />
                    </button>
                </div>
            </header>

            <div className="mt-16 flex flex-col md:flex-row container mx-auto px-6 py-8 gap-8">
                <aside
                    className={`${
                        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 fixed md:static top-16 left-0 w-72 h-[calc(100vh-4rem)] bg-white rounded-2xl shadow-lg p-8 transition-transform duration-300 z-30 md:w-1/4`}
                >
                    <div className="flex items-center space-x-4 mb-8">
                        <div className="relative group">
                            <img 
                                className="h-10 w-10 rounded-full bg-gray-300" 
                                src={src + user?.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=random`} 
                                alt={user?.name || 'User'} 
                            />
                            <div className="absolute inset-0 rounded-full bg-blue-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">{user?.name || "Khách Du Lịch"}</h2>
                            <p className="text-sm text-gray-600">{user?.email || "email@example.com"}</p>
                        </div>
                    </div>

                    <nav className="space-y-3">
                        {[
                            { to: "/profile/info", icon: <FaUser />, label: "Thông Tin Cá Nhân" },
                            { to: "/profile/bookings", icon: <FaHistory />, label: "Lịch Sử Đặt Tour" },
                            { to: "/profile/wishlist", icon: <FaHeart />, label: "Danh Sách Yêu Thích" },
                            { to: "/profile/reviews", icon: <FaPen />, label: "Đánh Giá Của Tôi" },
                        ].map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    `flex items-center space-x-4 px-5 py-3 rounded-xl transition-all duration-300 ${
                                        isActive
                                            ? "bg-blue-400 text-white shadow-md"
                                            : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                                    }`
                                }
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span className="font-medium">{item.label}</span>
                            </NavLink>
                        ))}
                    </nav>

                    <div className="absolute bottom-8 left-8 right-8">
                        <button className="w-full flex items-center justify-center space-x-3 bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg">
                            <FaSignOutAlt className="text-lg" />
                            <span>Đăng xuất</span>
                        </button>
                    </div>
                </aside>

                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity duration-300"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}

                <main className="flex-1 bg-white rounded-2xl shadow-lg p-8 md:w-3/4 transition-all duration-300 hover:shadow-xl">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Profile;