import React from 'react';
import { Outlet } from "react-router-dom";
import Sidebar from './SiderBar/SideBar';

function DefaultLayout() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-8 py-5 shadow-sm sticky top-0 z-20">
                <div className="flex justify-between items-center mx-auto">
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Admin Dashboard</h1>
                    <div className="flex items-center space-x-6">
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                className="py-2.5 pl-10 pr-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-72 bg-gray-50 transition-all duration-200"
                            />
                        </div>
                        <div className="flex space-x-4">
                            <button className="relative p-2 text-gray-500 hover:text-indigo-600 transition-colors">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
                            </button>
                            <button className="relative p-2 text-gray-500 hover:text-indigo-600 transition-colors">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-indigo-500 ring-2 ring-white"></span>
                            </button>
                            <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium cursor-pointer shadow-md hover:shadow-lg transition-shadow">
                                A
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="mx-auto px-8 py-6 flex gap-6">
                {/* Sidebar */}
                <div className="flex-shrink-0">
                    <Sidebar />
                </div>
                
                {/* Main Content Area */}
                <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 min-h-[calc(100vh-10rem)] transition-all duration-300">
                    <Outlet />
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-6 px-8 mt-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} AdminPro. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-indigo-600 transition-colors font-medium">Privacy Policy</a>
                        <a href="#" className="hover:text-indigo-600 transition-colors font-medium">Terms of Service</a>
                        <a href="#" className="hover:text-indigo-600 transition-colors font-medium">Contact Us</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default DefaultLayout;