// CustomerLayout.js
import { Outlet } from "react-router-dom";
import Menu from "./Component/Menu";

const CustomerLayout = () => {
    return (
        <div>
            <Menu />
            <Outlet />
        </div>
    );
};

export default CustomerLayout;
