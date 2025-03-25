// import { createContext, useState, useEffect, useContext, useMemo } from "react";
// import axiosClient from "../../api/axiosClient";
// import authService from "../../api/authService";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";


// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();
//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const response = await axiosClient.get("/api/user");
//                 setUser(response.data);
//             } catch (error) {
//                 console.error("Lỗi lấy user:", error);
//                 setUser(null);
//             }
//             setLoading(false);
//         };

//         const token = localStorage.getItem("accessToken");
//         if (token) fetchUser();
//         else setLoading(false);
//     }, []);

//     const login = async (email, password) => {
//         const data = await authService.login(email, password);
//         setUser(data);
//     };

//     const logout = async () => {
//         await authService.logout();
//         setUser(null);
//         toast.success("Đăng xuất thành công")
//         navigate("/admin/login")
//     };
//     const authValue = useMemo(() => ({ user, login, logout, loading }), [user, loading]);
//     return (
//         <AuthContext.Provider value={authValue}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useUser = () => useContext(AuthContext)




import { createContext, useState, useEffect, useContext, useMemo } from "react";
import axiosClient, { scheduleTokenRefresh } from "../../api/axiosClient";
import authService from "../../api/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosClient.get("/api/user");
                setUser(response.data);
            } catch (error) {
                console.error("Lỗi lấy user:", error);
                setUser(null);
                localStorage.removeItem("accessToken"); // Xóa token nếu lỗi
            } finally {
                setLoading(false);
            }
        };

        const token = localStorage.getItem("accessToken");
        if (token) {
            fetchUser();
            scheduleTokenRefresh(token); // Gọi refresh ngay khi app load
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const data = await authService.login(email, password);
            setUser(data.data); // Đảm bảo lấy đúng dữ liệu user
            scheduleTokenRefresh(data.accessToken); // Gọi schedule ngay sau khi login
            return { success: true };
        } catch (error) {
            console.error("Lỗi đăng nhập:", error?.response?.data?.message || "Đăng nhập thất bại");
            toast.error(error?.response?.data?.message || "Đăng nhập thất bại");
            return { success: false, message: error?.response?.data?.message };
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
            toast.success("Đăng xuất thành công");
        } catch (error) {
            console.error("Lỗi đăng xuất:", error);
        } finally {
            navigate("/admin/login");
        }
    };

    const authValue = useMemo(() => ({ 
        user, 
        login, 
        logout, 
        loading,
        isAuthenticated: !!user 
    }), [user, loading]);

    return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

export const useUser = () => useContext(AuthContext);
