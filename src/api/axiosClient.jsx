import axios from "axios";

// Tạo một instance của Axios
const axiosClient = axios.create({
    baseURL: "http://localhost:3000",
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // Quan trọng: Giúp axios gửi cookie tự động
});

let refreshTimer = null; // Biến lưu setTimeout
let isRefreshing = false; // Flag để đánh dấu đang refresh
let refreshQueue = []; // Hàng đợi các request đang chờ refresh token

// Hàm lấy thời gian hết hạn từ JWT
const getTokenExpiration = (token) => {
    try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Giải mã JWT
        return payload.exp * 1000; // Trả về thời gian hết hạn (ms)
    } catch (error) {
        console.error("Lỗi đọc thời gian hết hạn token:", error);
        return null;
    }
};

// Hàm refresh token
const refreshToken = async () => {
    if (isRefreshing) return;
    
    isRefreshing = true;
    
    try {
        const response = await axios.post(
            `${"http://localhost:3000"}/auth/refresh-token`, 
            {}, 
            { withCredentials: true }
        );
        
        const newAccessToken = response.data.accessToken;

        // Lưu token mới vào localStorage
        localStorage.setItem("accessToken", newAccessToken);

        // Lên lịch refresh tiếp theo
        scheduleTokenRefresh(newAccessToken);
        
        // Thực hiện tất cả request trong hàng đợi
        refreshQueue.forEach(callback => callback(newAccessToken));
        refreshQueue = [];
        
        return newAccessToken;
    } catch (error) {
        console.error("Lỗi refresh token:", error);
        localStorage.removeItem("accessToken");
        window.location.href = "/admin/login"; // Chuyển về trang login nếu refresh thất bại
        return null;
    } finally {
        isRefreshing = false;
    }
};

// Đặt lịch tự động refresh token trước khi hết hạn
const scheduleTokenRefresh = (token) => {
    if (!token) return;

    const expirationTime = getTokenExpiration(token);
    if (!expirationTime) return;

    const refreshTime = expirationTime - 2 * 60 * 1000; // Refresh trước khi hết hạn 2 phút

    if (refreshTimer) clearTimeout(refreshTimer); // Xóa lịch cũ nếu có

    const currentTime = Date.now();
    if (refreshTime > currentTime) {
        console.log(`Sẽ refresh token sau ${Math.round((refreshTime - currentTime)/1000)} giây`);
        refreshTimer = setTimeout(() => {
            console.log("🔄 Đang làm mới token trước khi hết hạn...");
            refreshToken();
        }, refreshTime - currentTime); // Đếm ngược đến thời điểm refresh
    } else {
        console.log("🔄 Token đã hết hạn, làm mới ngay lập tức...");
        refreshToken(); // Nếu token đã hết hạn, làm mới ngay lập tức
    }
};

// Interceptor request: Thêm token vào header
axiosClient.interceptors.request.use(
    (config) => {
        // Bỏ qua kiểm tra token cho các routes đăng nhập/đăng ký
        if (
            config.url === "/auth/login" || 
            config.url === "/auth/register" || 
            config.url === "/auth/refresh-token"
        ) {
            return config;
        }
        
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor response: Xử lý khi token hết hạn
axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        // Nếu lỗi 401 (Unauthorized) và chưa thử refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            if (isRefreshing) {
                // Nếu đang refresh, đẩy request vào hàng đợi
                return new Promise((resolve) => {
                    refreshQueue.push((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(axiosClient(originalRequest));
                    });
                });
            }
            
            // Thực hiện refresh token
            const newToken = await refreshToken();
            if (newToken) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axiosClient(originalRequest);
            }
        }
        
        return Promise.reject(error);
    }
);

// Khởi tạo refresh token timer nếu có token
const token = localStorage.getItem("accessToken");
if (token) {
    scheduleTokenRefresh(token);
}

export { scheduleTokenRefresh };
export default axiosClient;


// import axios from "axios";

// // Tạo một instance của Axios
// const axiosClient = axios.create({
//     baseURL: "http://localhost:3000",
//     headers: { "Content-Type": "application/json" },
//     withCredentials: true, // ⚡ Quan trọng: Để axios tự động gửi cookie
// });

// // Biến kiểm soát trạng thái refresh token
// let isRefreshing = false;
// let refreshSubscribers = [];

// // Hàm gọi lại tất cả request đang chờ khi token được refresh
// const onRefreshed = (newToken) => {
//     refreshSubscribers.forEach((callback) => callback(newToken));
//     refreshSubscribers = [];
// };

// // Hàm thực hiện refresh token
// const refreshToken = async () => {
//     try {
//         const response = await axios.post("http://localhost:3000/auth/refresh-token", {}, { withCredentials: true });
//         const newAccessToken = response.data.accessToken;

//         // Lưu token mới vào bộ nhớ tạm (nếu cần)
//         localStorage.setItem("accessToken", newAccessToken);

//         return newAccessToken;
//     } catch (error) {
//         console.error("Lỗi refresh token:", error);
//         return null;
//     }
// };

// // Interceptor cho request: Thêm token vào header
// axiosClient.interceptors.request.use((config) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//         config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
// });

// // Interceptor cho response: Xử lý lỗi 401
// axiosClient.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response && error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             if (!isRefreshing) {
//                 isRefreshing = true;

//                 try {
//                     const newToken = await refreshToken();
//                     isRefreshing = false;

//                     if (newToken) {
//                         onRefreshed(newToken);
//                         originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
//                         return axiosClient(originalRequest);
//                     } else {
//                         throw new Error("Refresh token không hợp lệ");
//                     }
//                 } catch (refreshError) {
//                     console.error("Lỗi khi làm mới token:", refreshError);
//                     localStorage.removeItem("accessToken");
//                     window.location.href = "/login";
//                     return Promise.reject(refreshError);
//                 }
//             }

//             return new Promise((resolve) => {
//                 refreshSubscribers.push((token) => {
//                     originalRequest.headers["Authorization"] = `Bearer ${token}`;
//                     resolve(axiosClient(originalRequest));
//                 });
//             });
//         }

//         return Promise.reject(error);
//     }
// );

// export default axiosClient;

// import axios from "axios";

// // Tạo một instance của Axios
// const axiosClient = axios.create({
//     baseURL: "http://localhost:3000",
//     headers: { "Content-Type": "application/json" },
// });

// // Kiểm soát việc refresh token
// let isRefreshing = false;
// let refreshSubscribers = [];

// // Hàm gọi lại tất cả request đang chờ khi token được refresh
// const onRefreshed = (token) => {
//     refreshSubscribers.forEach((callback) => callback(token));
//     refreshSubscribers = [];
// };

// // Hàm refresh token
// const refreshToken = async () => {
//     try {
//         const refreshToken = localStorage.getItem("refreshToken");
//         if (!refreshToken) throw new Error("Không có refresh token");

//         const response = await axios.post("http://localhost:3000/auth/refresh-token", { refreshToken });
//         const newAccessToken = response.data.accessToken;

//         localStorage.setItem("accessToken", newAccessToken);
//         return newAccessToken;
//     } catch (error) {
//         console.error("Lỗi refresh token:", error);
//         return null;
//     }
// };

// // Interceptor để xử lý lỗi 401
// axiosClient.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response && error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             if (!isRefreshing) {
//                 isRefreshing = true;

//                 const newToken = await refreshToken();

//                 if (newToken) {
//                     isRefreshing = false;
//                     onRefreshed(newToken);

//                     originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
//                     return axiosClient(originalRequest);
//                 } else {
//                     isRefreshing = false;
//                     alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
//                     setTimeout(() => {
//                         localStorage.removeItem("accessToken");
//                         localStorage.removeItem("refreshToken");
//                         window.location.href = "/login";
//                     }, 3000);
//                     return Promise.reject(error);
//                 }
//             }

//             return new Promise((resolve) => {
//                 refreshSubscribers.push((token) => {
//                     originalRequest.headers["Authorization"] = `Bearer ${token}`;
//                     resolve(axiosClient(originalRequest));
//                 });
//             });
//         }

//         return Promise.reject(error);
//     }
// );
// axiosClient.interceptors.request.use((config) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//         config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
// });
// export default axiosClient;
