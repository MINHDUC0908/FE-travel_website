import { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./Admin/Context/AuthContext";
import AdminRoutes from "./router/Admin/AdminRoutes";
import CustomerRoutes from "./router/Customer/CustomerRoutes";
import NotFound from "./Customer/Component/NotFound";

function App() {
    const [currentTitle, setCurrentTitle] = useState("");
    useEffect(() => {
        document.title = currentTitle;
    }, [currentTitle]);

    return (
        <Router>
            <Routes>
                {/* Customer Routes */}
                <Route
                    path="/*"
                    element={
                        <CustomerRoutes setCurrentTitle={setCurrentTitle} />
                    }
                />
                {/* Bọc toàn bộ Admin (bao gồm cả Login) với AuthProvider */}
                <Route
                    path="/admin/*"
                    element={
                        <AuthProvider>
                            <AdminRoutes setCurrentTitle={setCurrentTitle} />
                        </AuthProvider>
                    }
                />
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
