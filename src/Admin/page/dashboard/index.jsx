import { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";

function Dashboard({ setCurrentTitle })
{
    const { user, logout } = useContext(AuthContext);
    console.log(user)
    useEffect(() => {
        window.scroll(0, 0)
        setCurrentTitle("Trang chủ")
    }, [setCurrentTitle])
    return (
        <div>
            <h2>Chào mừng bạn! {user?.name}</h2>
            <button onClick={logout}>Đăng xuất</button>
        </div>
    );
}
export default Dashboard