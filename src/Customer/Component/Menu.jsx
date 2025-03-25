import { HomeIcon, InfoIcon, MapPinIcon, PhoneIcon, SearchIcon, UserIcon, MenuIcon, XIcon, PlaneIcon, SunIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    
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

    // Đóng/mở menu mobile
    const toggleMenu = () => {
        setIsOpen(!isOpen);
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
                            Travel Vietnam
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
                    <div className="hidden md:flex items-center space-x-3">
                        <button className={`p-2 rounded-full flex items-center justify-center
                            ${isScrolled 
                                ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' 
                                : 'bg-white/20 text-white hover:bg-white/30'
                            } 
                            focus:outline-none transition-colors`}>
                            <UserIcon size={18} />
                        </button>
                        <button className={`p-2 rounded-full flex items-center justify-center
                            ${isScrolled 
                                ? 'bg-amber-100 text-amber-600 hover:bg-amber-200' 
                                : 'bg-white/20 text-white hover:bg-white/30'
                            } 
                            focus:outline-none transition-colors`}>
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
                </div>
            </div>
        </nav>
    );
}

export default Menu;