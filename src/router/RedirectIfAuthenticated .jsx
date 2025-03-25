import { Navigate } from "react-router-dom";

const RedirectIfAuthenticated = ({ children }) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return children;
};

export default RedirectIfAuthenticated;
