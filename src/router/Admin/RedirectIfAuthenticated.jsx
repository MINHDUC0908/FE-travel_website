// src/router/Admin/RedirectIfAuthenticated.jsx
import { Navigate } from "react-router-dom";
import { useUser } from "../../Admin/Context/AuthContext";


function RedirectIfAuthenticated({ children }) {
    const { user } = useUser()

    if (user) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return children;
}

export default RedirectIfAuthenticated;