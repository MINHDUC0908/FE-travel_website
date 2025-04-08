import React, { useState } from 'react';
import { BiPackage } from "react-icons/bi";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineSettings, MdPeopleOutline, MdOutlineMessage, MdAnalytics, MdLogout } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useUser } from '../Context/AuthContext';
import { FaCalendarCheck } from 'react-icons/fa';
import { Contact } from 'lucide-react';

function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();
    const { user } = useUser();
    const menu = [
        { id: 1, path: '/admin/dashboard', icon: <LuLayoutDashboard size={22} />, name: "Dashboard" },
        { id: 2, path: "/admin/tour", icon: <BiPackage size={22} />, name: "Tour" },
        { id: 7, path: "/admin/booking", icon: <FaCalendarCheck size={22} />, name: "Booking" },
        { id: 3, path: "/admin/users", icon: <MdPeopleOutline size={22} />, name: "Users" },
        { id: 8, path: "/admin/contact", icon: <Contact size={22} />, name: "Contact" },
        { id: 5, path: "/admin/messages", icon: <MdOutlineMessage size={22} />, name: "Messages" },
        { id: 4, path: "/admin/analytics", icon: <MdAnalytics size={22} />, name: "Analytics" },
        { id: 6, path: "/admin/settings", icon: <MdOutlineSettings size={22} />, name: "Settings" }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className={`bg-white rounded-xl shadow-sm h-[calc(100vh-2rem)] sticky top-4 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'} overflow-hidden`}>
            {/* Logo Section */}
            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white">
                <div className="flex items-center justify-between">
                    {!isCollapsed && (
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center shadow-sm">
                                <span className="font-bold text-lg text-indigo-600">A</span>
                            </div>
                            <h1 className="text-xl font-semibold tracking-wide">AdminPro</h1>
                        </div>
                    )}
                    <button 
                        onClick={() => setIsCollapsed(!isCollapsed)} 
                        className="p-1.5 rounded-lg hover:bg-indigo-600 transition-all duration-200"
                    >
                        <svg className={`w-4 h-4 transform ${isCollapsed ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Profile Section */}
            <div className="p-4 border-b border-gray-100">
                <div className={`flex ${isCollapsed ? 'justify-center' : 'items-center gap-3'}`}>
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-semibold shadow-md ring-2 ring-indigo-50">
                        {user?.name ? user.name.slice(0, 1) : "?"}
                    </div>
                    {!isCollapsed && (
                        <div>
                            <p className="font-medium text-gray-800 text-base">{user?.name}</p>
                            <p className="text-gray-500 text-xs">Administrator</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Menu Section */}
            <div className="py-2 px-2">
                <ul className="space-y-1">
                    {menu.map((item) => (
                        <li key={item.id}>
                            <Link 
                                to={item.path} 
                                className={`flex items-center py-2 px-3 rounded-lg transition-all duration-200 group
                                ${isActive(item.path) 
                                    ? 'bg-indigo-50 text-indigo-600 font-semibold' 
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'}`}
                            >
                                <span className={`${isActive(item.path) ? 'text-indigo-600' : 'text-gray-500 group-hover:text-indigo-600'} transition-colors ${isCollapsed ? 'mx-auto' : ''}`}>
                                    {item.icon}
                                </span>
                                {!isCollapsed && (
                                    <span className={`ml-3 text-sm ${isActive(item.path) ? 'text-indigo-600' : 'text-gray-600'}`}>
                                        {item.name}
                                    </span>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Logout Section */}
            <div className="absolute bottom-0 w-full border-t border-gray-100 p-2">
                <Link 
                    to="/logout" 
                    className={`flex items-center py-2 px-3 rounded-lg hover:bg-red-50 transition-colors group`}
                >
                    <span className={`text-gray-500 group-hover:text-red-500 transition-colors ${isCollapsed ? 'mx-auto' : ''}`}>
                        <MdLogout size={22} />
                    </span>
                    {!isCollapsed && <span className="ml-3 text-sm text-gray-600 group-hover:text-red-500">Logout</span>}
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;