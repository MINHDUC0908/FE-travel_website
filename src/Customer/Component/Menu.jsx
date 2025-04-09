import { HomeIcon, InfoIcon, MapPinIcon, PhoneIcon, SearchIcon, UserIcon, MenuIcon, XIcon, PlaneIcon, SunIcon, LogOutIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Register from "./Auth/Resgiter";
import { useAuthCus } from "../Context/AuthContext";
import { src } from "../../../Api";

function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const location = useLocation();
    const [show, setShow] = useState(false);
    const { user, logout } = useAuthCus();
    const userMenuRef = useRef(null);
    const navigate = useNavigate();

    const menu = [
        {
            id: 1,
            path: "/",
            name: "Trang chủ",
            icon: <HomeIcon size={18} />
        },
        {
            id: 2,
            path: "/about",
            name: "Giới thiệu",
            icon: <InfoIcon size={18} />
        },
        {
            id: 3,
            path: "/destinations",
            name: "Điểm đến",
            icon: <MapPinIcon size={18} />
        },
        {
            id: 4,
            path: "/contact",
            name: "Liên hệ",
            icon: <PhoneIcon size={18} />
        }
    ];
    
    // Xử lý hiệu ứng khi cuộn trang
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Xử lý đóng user menu khi click bên ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Đóng/mở menu mobile
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    
    // Đóng/mở user menu
    const toggleUserMenu = () => {
        setUserMenuOpen(!userMenuOpen);
    };
    
    // Xử lý đăng xuất
    const handleLogout = () => {
        logout();
        setUserMenuOpen(false);
        navigate("/");
    };
    
    // Kiểm tra route active
    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
            isScrolled ? 'bg-white shadow-lg' : 'bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500'
        }`}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <div className={`flex items-center justify-center h-10 w-10 rounded-full ${
                            isScrolled ? 'bg-blue-100 text-blue-600' : 'bg-white/20 text-white'
                        } transition-all duration-300`}>
                            <PlaneIcon size={20} className="transform rotate-45" />
                        </div>
                        <span className={`ml-2 font-bold text-xl tracking-tight ${
                            isScrolled ? 'text-gray-800' : 'text-white'
                        }`}>
                            Travel VietNam
                        </span>
                    </div>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:flex">
                        <div className="ml-10 flex items-center space-x-2">
                            {menu.map((item) => {
                                const active = isActive(item.path);
                                return (
                                    <Link 
                                        key={item.id}
                                        to={item.path}
                                        className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium
                                            ${active
                                                ? isScrolled
                                                    ? 'bg-blue-100 text-blue-600 shadow-sm' 
                                                    : 'bg-white/20 text-white shadow-sm backdrop-blur-sm'
                                                : isScrolled
                                                    ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                                                    : 'text-white hover:bg-white/20'
                                            }
                                            transition-all duration-300 transform hover:scale-105`}
                                    >
                                        <span className="mr-2">{item.icon}</span>
                                        {item.name}
                                        {active && (
                                            <span className="ml-2 h-1.5 w-1.5 rounded-full bg-current"></span>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                    
                    {/* User & Search icons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="flex items-center space-x-2 relative" ref={userMenuRef}>
                            {user && (
                                <p className={`text-sm font-medium ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                                    {user.name}
                                </p>
                            )}
                            <button
                                className={`p-1 rounded-full flex items-center justify-center transition-colors duration-200
                                    ${isScrolled
                                    ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                    : 'bg-white/20 text-white hover:bg-white/30'
                                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                                onClick={() => user ? toggleUserMenu() : setShow(true)}
                                aria-label="User profile"
                            >
                                {user ? (
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={src + user.image_url}
                                            alt="Avatar"
                                            className="w-7 h-7 rounded-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <p className="text-sm text-white"><UserIcon size={18} /></p>
                                )}
                            </button>
                            
                            {/* User Dropdown Menu */}
                            {user && userMenuOpen && (
                                <div className="absolute right-0 mt-2 top-full w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                    <Link 
                                        to="/profile/info" 
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => setUserMenuOpen(false)}
                                    >
                                        Thông tin cá nhân
                                    </Link>
                                    <Link 
                                        to="/profile/bookings" 
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => setUserMenuOpen(false)}
                                    >
                                        Lịch sử đặt tour
                                    </Link>
                                    <button 
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                        onClick={handleLogout}
                                    >
                                        <div className="flex items-center">
                                            <LogOutIcon size={16} className="mr-2" />
                                            Đăng xuất
                                        </div>
                                    </button>
                                </div>
                            )}
                        </div>

                        <button
                            className={`p-2 rounded-full flex items-center justify-center transition-colors duration-200
                            ${isScrolled
                                ? 'bg-amber-100 text-amber-600 hover:bg-amber-200'
                                : 'bg-white/20 text-white hover:bg-white/30'
                            } focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50`}
                            aria-label="Toggle theme"
                        >
                            <SunIcon size={18} />
                        </button>
                    </div>
                    
                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={toggleMenu}
                            className={`p-2 rounded-md 
                                ${isScrolled 
                                    ? 'text-gray-700 hover:bg-gray-100'
                                    : 'text-white hover:bg-white/20'
                                } 
                                focus:outline-none transition-colors`}
                        >
                            {isOpen ? (
                                <XIcon className="h-6 w-6" />
                            ) : (
                                <MenuIcon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div 
                className={`md:hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                } ${isScrolled ? 'bg-white' : 'bg-gradient-to-b from-blue-600 to-blue-700'}`}
            >
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {menu.map((item) => {
                        const active = isActive(item.path);
                        return (
                            <Link
                                key={item.id}
                                to={item.path}
                                className={`flex items-center px-4 py-3 rounded-lg text-base font-medium 
                                    ${active
                                        ? isScrolled
                                            ? 'bg-blue-100 text-blue-600' 
                                            : 'bg-white/10 text-white'
                                        : isScrolled
                                            ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                            : 'text-white hover:bg-white/10'
                                    } 
                                    transition-colors`}
                                onClick={() => setIsOpen(false)}
                            >
                                <span className="mr-3">{item.icon}</span>
                                {item.name}
                                {active && (
                                    <span className="ml-2 h-1.5 w-1.5 rounded-full bg-current"></span>
                                )}
                            </Link>
                        );
                    })}

                    {/* User Profile for Mobile */}
                    {user && (
                        <>
                            <Link
                                to="/profile"
                                className={`flex items-center px-4 py-3 rounded-lg text-base font-medium ${
                                    isScrolled
                                        ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                        : 'text-white hover:bg-white/10'
                                } transition-colors`}
                                onClick={() => setIsOpen(false)}
                            >
                                <UserIcon className="mr-3" size={18} />
                                Thông tin cá nhân
                            </Link>
                            <button
                                className={`w-full flex items-center px-4 py-3 rounded-lg text-base font-medium ${
                                    isScrolled
                                        ? 'text-red-600 hover:bg-red-50'
                                        : 'text-red-300 hover:bg-white/10'
                                } transition-colors`}
                                onClick={() => {
                                    handleLogout();
                                    setIsOpen(false);
                                }}
                            >
                                <LogOutIcon className="mr-3" size={18} />
                                Đăng xuất
                            </button>
                        </>
                    )}
                </div>
            </div>
            {show && <Register setShow={setShow} />}
        </nav>
    );
}

export default Menu;