import React, { useState } from 'react';
import { BiPackage } from "react-icons/bi";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineSettings, MdPeopleOutline, MdOutlineMessage, MdAnalytics, MdLogout } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useUser } from '../Context/AuthContext';

function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();
    const { user } = useUser()
    const menu = [
        { id: 1, path: '/admin/dashboard', icon: <LuLayoutDashboard size={24} />, name: "Dashboard" },
        { id: 2, path: "/admin/tour", icon: <BiPackage size={24} />, name: "Tour" },
        { id: 3, path: "/admin/users", icon: <MdPeopleOutline size={24} />, name: "Users" },
        { id: 4, path: "/admin/analytics", icon: <MdAnalytics size={24} />, name: "Analytics" },
        { id: 5, path: "/admin/messages", icon: <MdOutlineMessage size={24} />, name: "Messages" },
        { id: 6, path: "/admin/settings", icon: <MdOutlineSettings size={24} />, name: "Settings" }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className={`bg-white rounded-2xl shadow-lg h-[calc(100vh-6rem)] sticky top-24 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-72'}`}>
            {/* Logo Section */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
                <div className="flex items-center justify-between">
                    {!isCollapsed && (
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center mr-3 shadow-md">
                                <span className="font-bold text-xl text-indigo-600">A</span>
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight">AdminPro</h1>
                        </div>
                    )}
                    <button 
                        onClick={() => setIsCollapsed(!isCollapsed)} 
                        className="p-2 rounded-full hover:bg-white/20 transition-all duration-200"
                    >
                        <svg className={`w-5 h-5 transform ${isCollapsed ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Profile Section */}
            <div className="p-6 border-b border-gray-200">
                <div className={`flex ${isCollapsed ? 'justify-center' : 'items-center'}`}>
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg ring-4 ring-indigo-100">
                        { user?.name ? user.name.slice(0, 1) : "?" }
                    </div>
                    {!isCollapsed && (
                        <div className="ml-4">
                            <p className="font-semibold text-gray-800 text-lg">{user?.name}</p>
                            <p className="text-gray-500 text-sm">Administrator</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Menu Section */}
            <div className="py-4 px-3">
                <ul className="space-y-2">
                    {menu.map((item) => (
                        <li key={item.id}>
                            <Link 
                                to={item.path} 
                                className={`flex items-center py-3 px-4 rounded-xl transition-all duration-200 group
                                ${isActive(item.path) 
                                    ? 'bg-indigo-600 text-white shadow-md' 
                                    : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <span className={`${isActive(item.path) ? 'text-white' : 'text-gray-500 group-hover:text-indigo-600'} transition-colors ${isCollapsed ? 'mx-auto' : ''}`}>
                                    {item.icon}
                                </span>
                                {!isCollapsed && (
                                    <span className={`ml-4 text-sm font-medium ${isActive(item.path) ? 'text-white' : ''}`}>
                                        {item.name}
                                    </span>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Logout Section */}
            <div className="absolute bottom-0 w-full border-t border-gray-200 p-3">
                <Link 
                    to="/logout" 
                    className={`flex items-center py-3 px-4 rounded-xl hover:bg-red-50 transition-colors group`}
                >
                    <span className={`text-gray-500 group-hover:text-red-600 transition-colors ${isCollapsed ? 'mx-auto' : ''}`}>
                        <MdLogout size={24} />
                    </span>
                    {!isCollapsed && <span className="ml-4 text-sm font-medium text-gray-600 group-hover:text-red-600">Logout</span>}
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;