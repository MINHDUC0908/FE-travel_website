// CustomerLayout.js
import { Outlet } from "react-router-dom";
import Menu from "./Component/Menu";
import Top from "./Component/Top";
import ChatBot from "./Component/Chatbot";

const CustomerLayout = () => {
    return (
        <div>
            <Menu />
            <Outlet />
            <Top />
            <ChatBot/>
        </div>
    );
};

export default CustomerLayout;
