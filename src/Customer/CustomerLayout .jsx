// CustomerLayout.js
import { Outlet } from "react-router-dom";
import Menu from "./Component/Menu";
import Top from "./Component/Top";

const CustomerLayout = () => {
    return (
        <div>
            <Menu />
            <Outlet />
            <Top />
        </div>
    );
};

export default CustomerLayout;
