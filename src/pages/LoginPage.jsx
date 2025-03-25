import { useState, useContext } from "react";
import { AuthContext } from "../Admin/Context/AuthContext";


const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            window.location.href = "/admin/dashboard";
        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
            alert("Sai tài khoản hoặc mật khẩu!");
        }
    };

    return (
        <div>
            <h2>Đăng nhập</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Đăng nhập</button>
            </form>
        </div>
    );
};

export default LoginPage;
