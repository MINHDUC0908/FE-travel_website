import { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./Admin/DefaultLayout";
import { menu } from "./router/Admin/Route";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TourProvider } from "./Admin/Context/TourContext";
import { ImageProvider } from "./Admin/Context/ImageContext";
import { AuthProvider } from "./Admin/Context/AuthContext";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./router/ProtectedRoute";
import RedirectIfAuthenticated from "./router/RedirectIfAuthenticated ";
import { menuCustomer } from "./router/Customer/Route";
import CustomerLayout from "./Customer/page/CustomerLayout ";
import { TourProviderCus } from "./Customer/Context/TourContext";
import { TourCateProviderCus } from "./Customer/Context/TourCategoryContext";

function App() {
    const [currentTitle, setCurrentTitle] = useState("");
    useEffect(() => {
        document.title = currentTitle;
    }, [currentTitle]);

    return (
        <Router>
            <Routes>
                {/* Customer Routes */}
                <Route path="/" element={
                    <TourCateProviderCus>
                        <TourProviderCus>
                            <CustomerLayout />
                        </TourProviderCus>
                    </TourCateProviderCus>
                }>
                    {menuCustomer.map((item, index) => (
                        <Route key={index} path={item.path} element={<item.Component setCurrentTitle={setCurrentTitle} />} />
                    ))}
                </Route>

                {/* Bọc toàn bộ Admin (bao gồm cả Login) với AuthProvider */}
                <Route path="/admin/*" element={
                    <AuthProvider>
                        <Routes>
                            {/* Route đăng nhập */}
                            <Route path="login" element={
                                <RedirectIfAuthenticated>
                                    <LoginPage />
                                </RedirectIfAuthenticated>
                            } />
                            
                            {/* Route chính của Admin (chỉ truy cập được khi đăng nhập) */}
                            <Route path="*" element={<ProtectedRoute />}>
                                <Route path="" element={
                                    <TourProvider>
                                        <ImageProvider>
                                            <DefaultLayout />
                                        </ImageProvider>
                                    </TourProvider>
                                }>
                                    {menu.map((item, index) => (
                                        <Route key={index} path={item.path} element={<item.Component setCurrentTitle={setCurrentTitle} />} />
                                    ))}
                                </Route>
                            </Route>
                        </Routes>
                    </AuthProvider>
                } />
            </Routes>

            {/* Thông báo Toast */}
            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </Router>
    );
}

export default App;
