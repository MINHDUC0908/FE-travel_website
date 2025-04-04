import { FaCalendarAlt, FaMapMarkerAlt, FaSearch } from "react-icons/fa";

function Header()
{
    return (
        <div>
            <div className="relative inline-block">
                <span className="inline-flex items-center px-4 py-1.5 mb-4 bg-gradient-to-r from-blue-500 to-teal-400 text-white text-xs font-semibold rounded-full shadow-md uppercase tracking-wider animate-pulse">
                    <span className="material-icons text-sm mr-1">explore</span> Khám Phá Ngay
                </span>
                <span className="absolute -right-2 -top-2 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-5 relative">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-teal-500 to-blue-400">
                    Hành Trình Đỉnh Cao
                </span>
                <span className="absolute inset-0 blur-md bg-gradient-to-r from-blue-500 to-teal-400 opacity-30 -z-10"></span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Biến giấc mơ du lịch của bạn thành hiện thực với những chuyến đi độc đáo
            </p>
        </div>
    )
}

export default Header