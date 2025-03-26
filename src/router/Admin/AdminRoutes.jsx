// src/router/Admin/AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";
import { adminRoutes } from "./Route";
import ProtectedRoute from "./ProtectedRoute";
import RedirectIfAuthenticated from "./RedirectIfAuthenticated";
import LoginPage from "../../Admin/Component/Auth/LoginPage";
import DefaultLayout from "../../Admin/DefaultLayout";
import { TourCategoryProviderAdmin } from "../../Admin/Context/TourCategory";
import { TourProvider } from "../../Admin/Context/TourContext";
import { ImageProvider } from "../../Admin/Context/ImageContext";
function AdminRoutes({ setCurrentTitle }) {
    return (
        <Routes>
        {/* Route đăng nhập */}
            <Route
                path="login"
                element={
                    <RedirectIfAuthenticated>
                        <LoginPage />
                    </RedirectIfAuthenticated>
                }
            />

            {/* Route chính của Admin (chỉ truy cập được khi đăng nhập) */}
            <Route path="*" element={<ProtectedRoute />}>
                <Route
                    path=""
                    element={
                        <TourCategoryProviderAdmin>
                            <TourProvider>
                                <ImageProvider>
                                    <DefaultLayout />
                                </ImageProvider>
                            </TourProvider>
                        </TourCategoryProviderAdmin>
                    }
                >
                    {adminRoutes.map((item, index) => (
                        <Route
                            key={index}
                            path={item.path}
                            element={<item.Component setCurrentTitle={setCurrentTitle} />}
                        />
                    ))}
                </Route>
            </Route>
        </Routes>
    );
}

export default AdminRoutes;