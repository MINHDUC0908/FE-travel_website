import { createContext, useContext, useEffect, useState, useMemo } from "react";
import authService from "../../api/authService";
import axiosClient, { scheduleTokenRefresh } from "../../api/axiosClient";
import { toast } from "react-toastify";

const AuthContextCus = createContext();

export const AuthProviderCus = ({ children }) => {
    const [user, setUser] = useState(null); // Để `null` thay vì `""`
    const [loading, setLoading] = useState(true); // Để `true` thay vì `false`

    useEffect(() => {
        const fetchUser = async () => {
            const controller = new AbortController(); // ✅ Tạo bộ điều khiển hủy request
            setLoading(true);
            try {
                const response = await axiosClient.get("/api/user", { signal: controller.signal });
                setUser(response.data);
            } catch (error) {
                if (error.name !== "AbortError") {  // ✅ Chỉ log lỗi nếu không phải do hủy request
                    console.error("Lỗi lấy user:", error);
                    setUser(null);
                    localStorage.removeItem("accessToken");
                }
            } finally {
                setLoading(false);
            }
            return () => controller.abort(); // ✅ Hủy request nếu component unmount
        };
    
        const token = localStorage.getItem("accessToken");
        if (token && !user) {
            fetchUser();
            scheduleTokenRefresh(token);
        } else {
            setLoading(false);
        }
    }, [user]);
    

    const login = async (email, password) => {
        try {
            const data = await authService.login(email, password);
            setUser(data.data);
            scheduleTokenRefresh(data.accessToken); // Gọi schedule ngay sau khi login
            return { success: true };
        } catch (error) {
            console.error("Lỗi đăng nhập:", error.message || "Đăng nhập thất bại");
            toast.error(error.response?.data?.message || "Lỗi khi thêm ảnh.");
            return { success: false, message: error.message || "Đăng nhập thất bại" };
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error("Lỗi đăng xuất:", error);
        } finally {
            setUser(null);
            localStorage.removeItem("accessToken"); // ✅ Đảm bảo luôn xóa token dù có lỗi
            toast.success("Đăng xuất thành công");
        }
    };    

    const authValue = useMemo(() => ({
        user,
        login,
        logout,
        loading,
        setUser,
        isAuthenticated: !!user
    }), [user, loading]);

    return (
        <AuthContextCus.Provider value={authValue}>
            {children}
        </AuthContextCus.Provider>
    );
};

export const useAuthCus = () => useContext(AuthContextCus);
