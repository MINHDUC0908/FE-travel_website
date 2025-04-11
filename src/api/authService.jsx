import axiosClient from "./axiosClient";

const authService = {
    // Thêm vào authService.js
    getUserFromToken: async () => {
        try {
            const response = await axiosClient.get("/api/user");
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    login: async (email, password) => {
        const response = await axiosClient.post("/auth/login", { email, password });

        // Lưu accessToken vào localStorage để sử dụng trong FE
        localStorage.setItem("accessToken", response.data.accessToken);

        // Trả về dữ liệu
        return response.data;
    },

    register: async (name, email, password, confirmPassword) => {
        return await axiosClient.post("/auth/register", { name, email, password, confirmPassword });
    },

    logout: async () => {
        try {
            await axiosClient.post("/auth/logout"); // Xóa refreshToken trong cookie từ server
        } catch (error) {
            console.error("Lỗi khi đăng xuất:", error);
        } finally {
            localStorage.removeItem("accessToken"); // Luôn xóa accessToken ở FE
        }
    }
};

export default authService;